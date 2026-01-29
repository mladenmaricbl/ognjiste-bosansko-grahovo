import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Get allowed origins from environment or use defaults
const getAllowedOrigins = (): string[] => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const origins = [
    supabaseUrl,
    "https://ognjiste-ljepote-grahovo.lovable.app",
    "https://id-preview--9dd23456-762a-4c2a-9073-cd553b46fa71.lovable.app"
  ].filter(Boolean) as string[];
  return origins;
};

const getCorsHeaders = (origin: string | null): Record<string, string> => {
  const allowedOrigins = getAllowedOrigins();
  const allowedOrigin = origin && allowedOrigins.some(allowed => origin.startsWith(allowed.replace(/\/$/, ''))) 
    ? origin 
    : allowedOrigins[0] || "*";
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
};

Deno.serve(async (req) => {
  const origin = req.headers.get("Origin");
  const corsHeaders = getCorsHeaders(origin);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, password } = await req.json();

    // Step 1: Verify Authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid Authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create client with user's token to verify authentication
    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Invalid or expired token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const requestingUserId = claimsData.claims.sub;

    // Step 2: Verify Authorization (RBAC) - Check if user is admin
    const { data: roleData, error: roleError } = await supabaseAuth
      .from("user_roles")
      .select("role")
      .eq("user_id", requestingUserId)
      .eq("role", "admin")
      .single();

    if (roleError || !roleData) {
      return new Response(
        JSON.stringify({ error: "Forbidden: Only admins can create new admin users" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 3: Safe Execution - Only now use service role key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Create user
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (userError) {
      throw userError;
    }

    // Add admin role
    const { error: roleInsertError } = await supabaseAdmin
      .from("user_roles")
      .insert({
        user_id: userData.user.id,
        role: "admin",
      });

    if (roleInsertError) {
      throw roleInsertError;
    }

    return new Response(
      JSON.stringify({ success: true, user_id: userData.user.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
