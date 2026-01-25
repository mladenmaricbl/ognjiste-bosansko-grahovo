import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import heroImage from "@/assets/hero-mountains.jpg";
export default function ONama() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 3000);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  return <Layout>
      {/* Header */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              O nama
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Upoznajte priču o Bosanskom Grahovu i zašto je ovo mjesto tako posebno.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }}>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Naša priča
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Ognjište Bosansko Grahovo nastalo je iz ljubavi prema ovom posebnom kraju i želje da se njegova ljepota podijeli sa svijetom. Naš cilj je očuvati tradiciju, promovisati prirodne ljepote i povezati ljude sa korijenima.</p>
                <p>
                  Bosansko Grahovo je mjesto gdje se vrijeme čini usporenijim, gdje se
                  još uvijek cijene tradicionalne vrijednosti i gdje priroda vlada
                  u svojoj punoj ljepoti. Od majestetičnih planina Dinare i Šatora,
                  preko zelenih dolina, do autentičnih sela - svaki kutak ovog kraja
                  priča svoju priču.
                </p>
                <p>
                  Pozivamo vas da otkrijete čari ovog skrivenog dragulja, da osjetite
                  toplinu lokalnog gostoprimstva i da se povežete s prirodom na način
                  koji je sve rjeđi u modernom svijetu.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            x: 30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }}>
              <img src={heroImage} alt="Pogled na Bosansko Grahovo" className="rounded-lg shadow-lg w-full h-[400px] object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Kontaktirajte nas
              </h2>
              <p className="text-muted-foreground">
                Imate pitanje ili želite podijeliti svoju priču? Javite nam se!
              </p>
            </div>

            <motion.form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 md:p-8 shadow-lg space-y-6" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }}>
              {submitted ? <motion.div initial={{
              opacity: 0,
              scale: 0.95
            }} animate={{
              opacity: 1,
              scale: 1
            }} className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                    Hvala vam!
                  </h3>
                  <p className="text-muted-foreground">
                    Vaša poruka je uspješno poslana. Javit ćemo vam se uskoro.
                  </p>
                </motion.div> : <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ime i prezime</Label>
                      <Input id="name" name="name" placeholder="Vaše ime" value={formData.name} onChange={handleChange} required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="vas@email.com" value={formData.email} onChange={handleChange} required className="bg-background" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Naslov</Label>
                    <Input id="subject" name="subject" placeholder="O čemu se radi?" value={formData.subject} onChange={handleChange} required className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Poruka</Label>
                    <Textarea id="message" name="message" placeholder="Vaša poruka..." rows={5} value={formData.message} onChange={handleChange} required className="bg-background resize-none" />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                    <Send className="h-4 w-4" />
                    Pošalji
                  </Button>
                </>}
            </motion.form>
          </motion.div>
        </div>
      </section>
    </Layout>;
}