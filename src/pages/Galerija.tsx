import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, ZoomIn, Trash2, Upload, ImagePlus } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import heroImage from "@/assets/hero-mountains.jpg";
import dinaraImage from "@/assets/dinara-mountain.jpg";
import satorImage from "@/assets/sator-mountain.jpg";
import village1 from "@/assets/village-1.jpg";
import village2 from "@/assets/village-2.jpg";
import townCenter from "@/assets/town-center.jpg";

interface GalleryImage {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  created_at: string;
}

// Static images as fallback
const staticImages = [
  { src: heroImage, alt: "Pogled na planine", category: "Priroda" },
  { src: dinaraImage, alt: "Dinara", category: "Planine" },
  { src: satorImage, alt: "Šator", category: "Planine" },
  { src: village1, alt: "Tradicionalno selo", category: "Sela" },
  { src: village2, alt: "Ruralni pejzaž", category: "Sela" },
  { src: townCenter, alt: "Centar grada", category: "Grad" },
];

const MAX_TOTAL_SIZE = 100 * 1024 * 1024; // 100MB

export default function Galerija() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dbImages, setDbImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  const { toast } = useToast();

  // Fetch gallery images from database
  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching images:", error);
    } else {
      setDbImages(data || []);
    }
  }

  async function handleUpload() {
    if (selectedFiles.length === 0) {
      toast({
        title: "Greška",
        description: "Molimo odaberite barem jednu sliku",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const uploadedImages: GalleryImage[] = [];
    let successCount = 0;
    let errorCount = 0;

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        
        try {
          // Generate unique filename with random string to avoid collisions
          const fileExt = file.name.split(".").pop()?.toLowerCase() || 'jpg';
          const randomId = Math.random().toString(36).substring(2, 10);
          const fileName = `${Date.now()}-${randomId}-${i}.${fileExt}`;
          const filePath = `images/${fileName}`;

          console.log(`Uploading file ${i + 1}/${selectedFiles.length}: ${file.name} -> ${filePath}`);

          const { error: uploadError, data: uploadData } = await supabase.storage
            .from("gallery")
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) {
            console.error(`Storage upload error for ${file.name}:`, uploadError);
            throw uploadError;
          }

          console.log(`Storage upload successful for ${file.name}:`, uploadData);

          // Get public URL
          const { data: urlData } = supabase.storage
            .from("gallery")
            .getPublicUrl(filePath);

          const publicUrl = urlData.publicUrl;
          console.log(`Public URL for ${file.name}:`, publicUrl);

          // Insert into database
          const insertPayload = {
            title: file.name.split(".")[0] || null,
            image_url: publicUrl,
            uploaded_by: user?.id || null,
          };
          
          console.log(`Inserting to gallery_images:`, insertPayload);

          const { data: insertedData, error: dbError } = await supabase
            .from("gallery_images")
            .insert(insertPayload)
            .select()
            .single();

          if (dbError) {
            console.error(`Database insert error for ${file.name}:`, dbError);
            throw dbError;
          }

          console.log(`Database insert successful:`, insertedData);

          if (insertedData) {
            uploadedImages.push(insertedData);
          }
          
          successCount++;
        } catch (fileError: any) {
          console.error(`Error uploading ${file.name}:`, fileError);
          console.error(`Error details:`, JSON.stringify(fileError, null, 2));
          errorCount++;
          
          // Show toast for each failed file
          toast({
            title: "Greška pri učitavanju",
            description: `Neuspješno: ${file.name} - ${fileError?.message || 'Nepoznata greška'}`,
            variant: "destructive",
          });
        }

        // Update progress
        setUploadProgress(Math.round(((i + 1) / selectedFiles.length) * 100));
      }

      // Immediately add uploaded images to state for instant display
      if (uploadedImages.length > 0) {
        setDbImages(prev => [...uploadedImages, ...prev]);
      }

      if (successCount > 0) {
        toast({
          title: "Uspješno",
          description: `Učitano ${successCount} ${successCount === 1 ? 'slika' : 'slika'}${errorCount > 0 ? `, ${errorCount} neuspješno` : ''}`,
        });
      } else {
        toast({
          title: "Greška",
          description: "Nijedna slika nije učitana",
          variant: "destructive",
        });
      }

      setShowUploadModal(false);
      setSelectedFiles([]);
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Greška",
        description: error.message || "Došlo je do greške pri učitavanju",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }

  async function handleDelete(image: GalleryImage) {
    if (!confirm("Jeste li sigurni da želite obrisati ovu sliku?")) return;

    try {
      // Extract file path from URL
      const url = new URL(image.image_url);
      const pathParts = url.pathname.split("/gallery/");
      const filePath = pathParts[1];

      if (filePath) {
        // Delete from storage
        await supabase.storage.from("gallery").remove([filePath]);
      }

      // Delete from database
      const { error } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", image.id);

      if (error) throw error;

      // Immediately remove from state
      setDbImages(prev => prev.filter(img => img.id !== image.id));

      toast({
        title: "Uspješno",
        description: "Slika je obrisana",
      });
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: "Greška",
        description: error.message || "Došlo je do greške pri brisanju",
        variant: "destructive",
      });
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length === 0) return;

    // Calculate total size
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    
    if (totalSize > MAX_TOTAL_SIZE) {
      toast({
        title: "Previše velika veličina",
        description: `Ukupna veličina slika prelazi 100MB. Trenutno: ${(totalSize / (1024 * 1024)).toFixed(1)}MB`,
        variant: "destructive",
      });
      return;
    }

    setSelectedFiles(files);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getTotalSize = () => {
    const totalBytes = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    return (totalBytes / (1024 * 1024)).toFixed(1);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Galerija
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Uživajte u fotografijama koje prikazuju ljepote našeg kraja.
            </p>
            
            {isAdmin && (
              <Button
                onClick={() => setShowUploadModal(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                <Plus className="h-5 w-5" />
                Dodaj slike
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Database Images */}
      {dbImages.length > 0 && (
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
              Slike iz galerije
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dbImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative group cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => setSelectedImage(image.image_url)}
                >
                  <img
                    src={image.image_url}
                    alt={image.title || "Galerija slika"}
                    loading="lazy"
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                    <ZoomIn className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-10 w-10" />
                  </div>
                  {image.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent pointer-events-none">
                      <span className="text-primary-foreground text-sm font-medium">
                        {image.title}
                      </span>
                    </div>
                  )}
                  {isAdmin && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(image);
                      }}
                      className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90 z-10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Static Gallery Grid */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
            Istaknute fotografije
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {staticImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                  <ZoomIn className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-10 w-10" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent pointer-events-none">
                  <span className="text-primary-foreground text-sm font-medium">
                    {image.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 text-primary-foreground hover:bg-primary-foreground/20 rounded-full transition-colors"
              aria-label="Zatvori"
            >
              <X className="h-8 w-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Uvećana slika"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4"
            onClick={() => !uploading && setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background rounded-xl p-6 md:p-8 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-2xl font-semibold text-foreground">
                  Dodaj slike
                </h3>
                <button
                  onClick={() => !uploading && setShowUploadModal(false)}
                  className="p-1 hover:bg-muted rounded-full transition-colors"
                  disabled={uploading}
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => !uploading && fileInputRef.current?.click()}
                >
                  <ImagePlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">
                    Kliknite za odabir slika
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    JPG, PNG - ukupno do 100MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={uploading}
                  />
                </div>

                {/* Selected files list */}
                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-foreground font-medium">
                        Odabrano: {selectedFiles.length} {selectedFiles.length === 1 ? 'slika' : 'slika'}
                      </span>
                      <span className="text-muted-foreground">
                        {getTotalSize()} MB / 100 MB
                      </span>
                    </div>
                    <div className="max-h-40 overflow-y-auto space-y-1">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-muted/50 rounded-md px-3 py-2"
                        >
                          <span className="text-sm text-foreground truncate flex-1 mr-2">
                            {file.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {(file.size / (1024 * 1024)).toFixed(1)} MB
                            </span>
                            {!uploading && (
                              <button
                                onClick={() => removeFile(index)}
                                className="p-1 hover:bg-destructive/20 rounded transition-colors"
                              >
                                <X className="h-4 w-4 text-destructive" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload progress */}
                {uploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">Učitavanje...</span>
                      <span className="text-muted-foreground">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowUploadModal(false);
                    setSelectedFiles([]);
                  }}
                  disabled={uploading}
                >
                  Odustani
                </Button>
                <Button
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleUpload}
                  disabled={uploading || selectedFiles.length === 0}
                >
                  {uploading ? "Učitavanje..." : `Učitaj (${selectedFiles.length})`}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}