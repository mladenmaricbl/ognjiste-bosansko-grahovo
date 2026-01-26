import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, 
  Upload, 
  Trash2, 
  Plus, 
  Image as ImageIcon,
  Calendar,
  Shield
} from "lucide-react";

interface Activity {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
}

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activities, setActivities] = useState<Activity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!adminLoading && !isAdmin && user) {
      toast({
        title: "Pristup odbijen",
        description: "Nemate administratorska prava.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [isAdmin, adminLoading, user, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchActivities();
    }
  }, [isAdmin]);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error("Error fetching activities:", error);
      toast({
        title: "Greška",
        description: "Nije moguće učitati aktivnosti.",
        variant: "destructive",
      });
    } finally {
      setLoadingActivities(false);
    }
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Greška",
        description: "Molimo odaberite sliku.",
        variant: "destructive",
      });
      return;
    }
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set dragging to false if we're leaving the drop zone entirely
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const generateUniqueFileName = (originalName: string): string => {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const extension = originalName.split('.').pop();
    return `${timestamp}-${randomStr}.${extension}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({
        title: "Greška",
        description: "Naslov je obavezan.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedFile) {
      toast({
        title: "Greška",
        description: "Molimo odaberite sliku.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload image
      const fileName = generateUniqueFileName(selectedFile.name);
      const filePath = `activities/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("activities")
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("activities")
        .getPublicUrl(filePath);

      // Insert activity record
      const { error: insertError } = await supabase
        .from("activities")
        .insert({
          title: title.trim(),
          description: description.trim() || null,
          image_url: publicUrl,
          uploaded_by: user?.id,
        });

      if (insertError) throw insertError;

      toast({
        title: "Uspješno",
        description: "Aktivnost je dodana.",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Refresh list
      fetchActivities();
    } catch (error: any) {
      console.error("Error creating activity:", error);
      toast({
        title: "Greška",
        description: error.message || "Nije moguće dodati aktivnost.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (activity: Activity) => {
    if (!confirm(`Jeste li sigurni da želite obrisati "${activity.title}"?`)) {
      return;
    }

    setDeleting(activity.id);

    try {
      // Extract file path from URL
      const url = new URL(activity.image_url);
      const pathParts = url.pathname.split('/');
      const bucketIndex = pathParts.findIndex(p => p === 'activities');
      if (bucketIndex !== -1) {
        const filePath = pathParts.slice(bucketIndex + 1).join('/');
        
        // Delete from storage
        await supabase.storage
          .from("activities")
          .remove([filePath]);
      }

      // Delete record
      const { error } = await supabase
        .from("activities")
        .delete()
        .eq("id", activity.id);

      if (error) throw error;

      toast({
        title: "Uspješno",
        description: "Aktivnost je obrisana.",
      });

      setActivities(prev => prev.filter(a => a.id !== activity.id));
    } catch (error: any) {
      console.error("Error deleting activity:", error);
      toast({
        title: "Greška",
        description: error.message || "Nije moguće obrisati aktivnost.",
        variant: "destructive",
      });
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("hr-HR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (authLoading || adminLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Admin Dashboard
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground"
          >
            Upravljanje aktivnostima
          </motion.p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Add Activity Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Dodaj novu aktivnost
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Slika *
                      </label>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
                          isDragging 
                            ? "border-primary bg-primary/10 scale-[1.02]" 
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {previewUrl ? (
                          <div className="relative">
                            <img
                              src={previewUrl}
                              alt="Preview"
                              className="max-h-48 mx-auto rounded-lg object-cover"
                            />
                            <p className="text-sm text-muted-foreground mt-2">
                              Kliknite ili prevucite novu sliku za promjenu
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className={`transition-transform duration-200 ${isDragging ? "scale-110" : ""}`}>
                              <Upload className={`h-10 w-10 mx-auto ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
                            </div>
                            <p className={`text-sm ${isDragging ? "text-primary font-medium" : "text-muted-foreground"}`}>
                              {isDragging ? "Ispustite sliku ovdje" : "Prevucite sliku ovdje ili kliknite za odabir"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG, GIF do 10MB
                            </p>
                          </div>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Naslov *
                      </label>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Unesite naslov aktivnosti"
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Opis
                      </label>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Unesite opis aktivnosti..."
                        rows={5}
                      />
                    </div>

                    <Button type="submit" disabled={uploading} className="w-full">
                      {uploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Dodavanje...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Dodaj aktivnost
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Activities List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Postojeće aktivnosti</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {activities.length} ukupno
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingActivities ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : activities.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Nema aktivnosti.
                    </p>
                  ) : (
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                      {activities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex gap-4 p-4 bg-muted/50 rounded-lg border border-border/50"
                        >
                          <img
                            src={activity.image_url}
                            alt={activity.title}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate">
                              {activity.title}
                            </h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(activity.created_at)}
                            </div>
                            {activity.description && (
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {activity.description}
                              </p>
                            )}
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(activity)}
                            disabled={deleting === activity.id}
                            className="flex-shrink-0"
                          >
                            {deleting === activity.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
