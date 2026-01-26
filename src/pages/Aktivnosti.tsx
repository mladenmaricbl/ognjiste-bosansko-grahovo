import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Loader2 } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
}

export default function Aktivnosti() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

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
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("hr-HR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6"
          >
            Aktivnosti
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Pratite naše aktivnosti i događaje u zajednici
          </motion.p>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : activities.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">
                Trenutno nema objavljenih aktivnosti.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-16">
              {activities.map((activity, index) => (
                <motion.article
                  key={activity.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image Section */}
                  <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                    <img
                      src={activity.image_url}
                      alt={activity.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Stylish Divider */}
                  <div className="relative px-6 md:px-8">
                    <div className="flex items-center gap-4 -mt-px">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-primary" />
                      <div className="w-3 h-3 rotate-45 bg-primary/20 border border-primary/50" />
                      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary/50 to-primary" />
                    </div>
                  </div>

                  {/* Text Content Section */}
                  <div className="p-6 md:p-8 pt-6">
                    {/* Date Badge */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={activity.created_at}>
                        {formatDate(activity.created_at)}
                      </time>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                      {activity.title}
                    </h2>

                    {/* Description */}
                    {activity.description && (
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {activity.description}
                      </p>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
