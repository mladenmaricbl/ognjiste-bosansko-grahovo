import { motion } from "framer-motion";
import { Compass, TrendingUp, Sun, Wind } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import dinaraImage from "@/assets/dinara-mountain.jpg";
import satorImage from "@/assets/sator-mountain.jpg";

const mountains = [
  {
    name: "Dinara",
    altitude: "1.831 m",
    description: "DINARA je najznačajnija i najpoznatija grahovska planina, pod čijim se obroncima smjestio i sam grad. Dugačka preko osamdeset kilometara, Dinara je majka svih dinarskih planina-planina po kojoj je masiv Dinarida i dobio ime. Ogromna kraška teritorija Dinare čini nestvarno prostranstvo. Dom je najraznovrsnijih krečnjačkih, kraških prirodnih oblika, koji daju posebno obelježje njenom reljefu. Horizontom iz Grahova i okoline dominiraju vrhovi Veliki Bat (1854m n.v.) i Sinjal (1831 m n.v.), dok se najviši vrh Dinare, Troglav (1913m n.v.) ponosno uzdiže iznad Livanjskog polja. Dinara je prirodna granica između Bosanske Krajine i Dalmacije, Bosne i Hrvatske, vjekovima je predstavljala granicu, među između svjetova i civilizacija, vjera i naroda. Besputna prostranstva Dinare nisu za svakoga, ali onome ko umije da gleda, sluša i shvati svoj položaj pred kolosalnom prirodnom veličinom, ona otvara sva vrata i sve svoje ljepote. Od Troglava do crnoluških Točila, od Bata do Sinjala, od prevoja Derala do obronaka Dinare u koje spadaju i grahovska Gradina i Pečenački kuk, nižu se beskrajne ljepote Dinare.",
    highlights: ["Panoramski pogledi", "Planinarenje", "Netaknuta priroda", "Endemske biljke"],
    image: dinaraImage,
    reverse: false,
  },
  {
    name: "Šator",
    altitude: "1.872 m",
    description: "Šatorsko jezero je jezero na planini Šator u zapadnoj Federaciji Bosne i Hercegovine, BiH. Nalazi se na visini od 1488 m nmv. Dugačko je 280 m, široko 150 m, a duboko oko 8 m. Jezero je jedno od najljepših planinskih jezera u Bosni i Hercegovini. Zaleđeno je od decembra do aprila. Na dnu jezera su biljke potamogeton, i zbog njih se jezero providi i do 4 metra, skroz do dna osim u najdubljim dijelovima. Iz njega izvire Mlinski potok od kojeg kad se spoji sa Šatorskim potokom nastaje rijeka Unac.",
    highlights: ["Planinska jezera", "Guste šume", "Divlje životinje", "Kampiranje"],
    image: satorImage,
    reverse: true,
  },
];

export default function Planine() {
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
              Planine
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Dinara i Šator - veličanstvene planine koje okružuju Bosansko Grahovo i nude 
              nezaboravna iskustva za ljubitelje prirode i planinare.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mountains Sections */}
      {mountains.map((mountain, index) => (
        <section
          key={mountain.name}
          className={`section-padding ${index % 2 === 0 ? "bg-background" : "bg-cream"}`}
        >
          <div className="container mx-auto px-4">
            <div className={`grid md:grid-cols-2 gap-12 items-center ${mountain.reverse ? "md:flex-row-reverse" : ""}`}>
              <motion.div
                initial={{ opacity: 0, x: mountain.reverse ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={mountain.reverse ? "md:order-2" : ""}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-accent font-medium text-sm uppercase tracking-wider">
                    {mountain.altitude}
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                  {mountain.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {mountain.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {mountain.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: mountain.reverse ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={mountain.reverse ? "md:order-1" : ""}
              >
                <div className="relative">
                  <img
                    src={mountain.image}
                    alt={mountain.name}
                    className="rounded-lg shadow-lg w-full h-[400px] md:h-[500px] object-cover"
                  />
                  <div className={`absolute -bottom-4 ${mountain.reverse ? "-right-4" : "-left-4"} w-32 h-32 bg-accent/20 rounded-lg -z-10`} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Info Cards */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Praktične informacije
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Sve što trebate znati prije odlaska na planine.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Compass, title: "Staze", desc: "Označene planinarenje staze različitih težina" },
              { icon: TrendingUp, title: "Težina", desc: "Od laganog šetanja do zahtjevnog uspona" },
              { icon: Sun, title: "Sezona", desc: "Proljeće do jeseni idealno za posjet" },
              { icon: Wind, title: "Klima", desc: "Svježi planinski zrak i čista priroda" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-primary-foreground/10 rounded-lg p-6 text-center"
              >
                <item.icon className="h-10 w-10 mx-auto mb-4 text-primary-foreground/90" />
                <h3 className="font-serif text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-primary-foreground/70 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
