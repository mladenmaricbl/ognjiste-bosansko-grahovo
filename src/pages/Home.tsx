import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Mountain, Trees, Camera } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { HeroButton } from "@/components/ui/HeroButton";
import heroImage from "@/assets/hero-mountains.jpg";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Planine Bosanskog Grahova"
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0"
            style={{ background: "var(--gradient-hero)" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Ognjište Bosansko Grahovo
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto font-light"
          >
            Povratak prirodi i korijenima.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/galerija">
              <HeroButton>
                Istraži ljepote
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </HeroButton>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-primary-foreground/70 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Otkrijte naš kraj
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bosansko Grahovo je mjesto gdje se priroda, tradicija i gostoljubivost susreću u savršenom skladu.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Mountain,
                title: "Planine",
                description: "Dinara i Šator nude nezaboravne planinarenje i poglede koji oduzimaju dah.",
                link: "/planine"
              },
              {
                icon: Trees,
                title: "Priroda",
                description: "Netaknute šume, zelene doline i kristalno čisti potoci.",
                link: "/grad-i-sela"
              },
              {
                icon: Camera,
                title: "Galerija",
                description: "Pogledajte ljepote našeg kraja kroz fotografije naših posjetitelja.",
                link: "/galerija"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link 
                  to={feature.link}
                  className="block card-nature p-8 text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6">
              Imate pitanje?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Kontaktirajte nas i saznajte više o našem kraju i mogućnostima za posjet.
            </p>
            <Link to="/o-nama">
              <HeroButton variant="outline">
                Kontaktirajte nas
              </HeroButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
