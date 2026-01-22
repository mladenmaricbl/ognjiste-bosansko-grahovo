import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, ZoomIn, Trash2, Upload, LogOut, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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

export default function Galerija() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dbImages, setDbImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { user, signOut } = useAuth();
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
    if (!selectedFile) {
      toast({
        title: "Greška",
        description: "Molimo odaberite sliku",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload to storage
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("gallery")
        .getPublicUrl(filePath);

      // Insert into database
      const { error: dbError } = await supabase.from("gallery_images").insert({
        title: title || null,
        image_url: urlData.publicUrl,
        uploaded_by: user?.id,
      });

      if (dbError) throw dbError;

      toast({
        title: "Uspješno",
        description: "Slika je uspješno dodana",
      });

      setShowUploadModal(false);
      setTitle("");
      setSelectedFile(null);
      fetchImages();
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Greška",
        description: error.message || "Došlo je do greške pri učitavanju",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
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

      toast({
        title: "Uspješno",
        description: "Slika je obrisana",
      });

      fetchImages();
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
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
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
            
            <div className="flex items-center justify-center gap-3">
              {isAdmin && (
                <Button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Dodaj sliku
                </Button>
              )}
              
              {user ? (
                <Button
                  variant="outline"
                  onClick={() => signOut()}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Odjavi se
                </Button>
              ) : (
                <Link to="/login">
                  <Button variant="outline" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    Admin prijava
                  </Button>
                </Link>
              )}
            </div>
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
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="relative group cursor-pointer overflow-hidden rounded-lg"
                >
                  <img
                    src={image.image_url}
                    alt={image.title || "Galerija slika"}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    onClick={() => setSelectedImage(image.image_url)}
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-10 w-10" />
                  </div>
                  {image.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent">
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
                      className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
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
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-10 w-10" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent">
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
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background rounded-xl p-6 md:p-8 max-w-md w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-2xl font-semibold text-foreground">
                  Dodaj sliku
                </h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-1 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Naslov (opcionalno)</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Npr. Pogled na Dinaru"
                  />
                </div>

                <div
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {selectedFile ? (
                    <div className="space-y-2">
                      <Upload className="h-12 w-12 text-primary mx-auto" />
                      <p className="text-foreground font-medium">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Kliknite za promjenu
                      </p>
                    </div>
                  ) : (
                    <>
                      <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">
                        Kliknite za odabir slike
                      </p>
                      <p className="text-sm text-muted-foreground/70">
                        JPG, PNG do 10MB
                      </p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowUploadModal(false);
                    setSelectedFile(null);
                    setTitle("");
                  }}
                >
                  Odustani
                </Button>
                <Button
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleUpload}
                  disabled={uploading || !selectedFile}
                >
                  {uploading ? "Učitavanje..." : "Učitaj"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
