import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, ZoomIn } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-mountains.jpg";
import dinaraImage from "@/assets/dinara-mountain.jpg";
import satorImage from "@/assets/sator-mountain.jpg";
import village1 from "@/assets/village-1.jpg";
import village2 from "@/assets/village-2.jpg";
import townCenter from "@/assets/town-center.jpg";

const galleryImages = [
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
              Podijelite i vi svoje trenutke s nama.
            </p>
            <Button
              onClick={() => setShowUploadModal(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              <Plus className="h-5 w-5" />
              Dodaj sliku
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
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
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-6">
                <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">
                  Povucite sliku ovdje ili kliknite za odabir
                </p>
                <p className="text-sm text-muted-foreground/70">
                  JPG, PNG do 10MB
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowUploadModal(false)}
                >
                  Odustani
                </Button>
                <Button
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => {
                    alert("Funkcionalnost učitavanja će biti dostupna uskoro!");
                    setShowUploadModal(false);
                  }}
                >
                  Učitaj
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
