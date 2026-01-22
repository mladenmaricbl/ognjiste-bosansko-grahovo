import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import townCenter from "@/assets/town-center.jpg";
import village1 from "@/assets/village-1.jpg";
import village2 from "@/assets/village-2.jpg";

const villages = [
  {
    name: "Resanovci",
    description: "Tradicionalno selo poznato po očuvanoj arhitekturi i gostoljubivim domaćinima.",
    image: village1,
  },
  {
    name: "Uništa",
    description: "Mirno selo smješteno u srcu zelene doline, idealno za bijeg od gradske vreve.",
    image: village2,
  },
  {
    name: "Crni Lug",
    description: "Poznato po tradicionalnim običajima i predivnim pogledom na okolne planine.",
    image: village1,
  },
  {
    name: "Korita",
    description: "Selo okruženo šumama, savršeno za ljubitelje prirode i mira.",
    image: village2,
  },
];

export default function GradISela() {
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
              Grad i sela
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Istražite bogatu povijest i autentičnu atmosferu Bosanskog Grahova i okolnih sela 
              koja čuvaju tradiciju naših predaka.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Town Center Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                Centar
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-2 mb-6">
                Bosansko Grahovo
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Bosansko Grahovo je gradić smješten u srcu Grahovo polja, okružen veličanstvenim 
                planinama Dinarom i Šatorom. S bogatom poviješću koja seže u antičko doba, 
                ovaj kraj nudi jedinstvenu kombinaciju kulturne baštine i prirodne ljepote.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Danas je Bosansko Grahovo mirno mjesto koje privlači posjetitelje u potrazi za 
                autentičnim iskustvom, netaknutom prirodom i toplinom lokalnog stanovništva.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <img
                src={townCenter}
                alt="Centar Bosanskog Grahova"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary rounded-lg -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Villages Grid */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Okolna sela
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upoznajte tradicionalna sela koja čuvaju duh prošlosti i nude autentično iskustvo života u planinama.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {villages.map((village, index) => (
              <motion.div
                key={village.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-nature group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={village.image}
                    alt={village.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {village.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {village.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
