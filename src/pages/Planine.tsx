import { motion } from "framer-motion";
import { Compass, TrendingUp, Sun, Wind } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import dinaraImage from "@/assets/dinara-new.jpg";
import satorImage from "@/assets/sator-mountain.jpg";
import uilicaImage from "@/assets/uilica-mountain.jpg";
import jadovnikImage from "@/assets/jadovnik-mountain.jpg";
import staretinaImage from "@/assets/staretina-mountain.jpg";

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
  {
    name: "Uilica",
    altitude: "1.654 m",
    description: "UILICA (UJILICA) se nastavlja sjeverno od Dinare i prevoja Derala, iako je neki geolozi smatraju krajnjim sjevernim ogrankom Dinare, ona je zbog svojih karakteristika ipak zasebna planina. Pruža se od okoline Derala pa do Ličke Kaldrme. Najviši vrhovi Uilice su Veliki vrh/Plana ili Bursać (1654m n.v.), Gologlav/Goli bat (1623m n.v.), Jarića vrh (1604m n.v.), Sokolova gredas (1498m n.v.) i drugi. Za Uilicu je karakteristično da se guste belogorične šume prostiru samim grebenom planine. Velike formacije stjena dominiraju horizontom iznad sela Peći i Tiškovca, dok su iznad Resanovaca i prema ličkoj strani guste šume koje se izdižu iz polja u valovitim visovima te daju prelijep ton pejzažu. Sa vrhova Uilice pruža se veličanstven pogled na Bosnu, Liku, Dalmaciju i Jadransko more. Nedaleko od Uilice je i predivno Babića jezero. Brojna divljač naseljava Uilicu, bogata je životinjskim i biljnim svjetom.",
    highlights: ["Panoramski vidici", "Belogorične šume", "Babića jezero", "Divljač"],
    image: uilicaImage,
    reverse: false,
  },
  {
    name: "Jadovnik",
    altitude: "1.650 m",
    description: "JADOVNIK, često u kartama označavan i kao Vijenac, pruža se sjeveroistično od Bosanskog Grahova, i gledano iz grada potpuno dominira horizontom, pošto su od svih pobrojanih planina, njegovi vrhovi najbliži gradu. Podaci o najvišem vrhu Jadovnika, Lisini, variraju, najčešće se u kartama spominje podatak od 1650m n.v, ali se pominju i podaci o 1656 i 1666m n.v. Jadovnik je sa grahovske strane krševit, siromašan šumom sa dosta nižeg rastinja i krša, a sa gustim šumama tek na većim visinama i pod samim vrhovima, dok se prema Drvaru spušta u velikim šumskim površinama. Ali zato ljepotu pejzaža kod Grahova posebno dopunjuju vrhovi Jadovnika. Dok putujete od Resanovaca, Peći i Borovače ka Bosanskom Grahovu, jedan za drugim nakon Golog vrha počinju da vam se ukazuju stjenoviti vrhunci Jadovnika, koji se poput džinovskih kapa uzdižu iznad Bosanskog Grahova. Jadovnik i Uilica, gotovo identične visine, stoje jedno naspram drugoga, razdvojeni samo poljem širine nekoliko kilometara, te tako čine jedan od najljepših grahovskih pejzaža.",
    highlights: ["Stjenoviti vrhovi", "Krški reljef", "Panorama grada", "Šumski predjeli"],
    image: jadovnikImage,
    reverse: true,
  },
  {
    name: "Staretina",
    altitude: "1.700 m",
    description: "STARETINA je planina koja se poput zida pruža iznad Livanjskog polja, i isto dijeli od Glamočkog polja. Staretina je planina šatorsko-golijskog niza (nalazi se između Šatora i Golije, na koje se i naslanja) i slično Jadovniku, jedan njen dio je krševit, prekriven pašnjacima i kraškim oblicima reljefa, dok drugi dio planine pokrivaju guste šume. Travnati i šumoviti pejzaži Staretine su vrlo ugodni oku, a posebno njeni vidici, specifični usled njenog položaja koji joj pruža dominantnu poziciju iznad dva velika polja. Pejzaži Staretine odišu mirom i širinom velikog prostranstva. Šteta što je Staretina u poslednjem ratu posijana minskim poljima, te predstavlja najnerazminiraniju oblast u ovom dijelu Evrope, te treba biti vrlo oprezan kada se kreće njenim stazama.",
    highlights: ["Dominantni vidici", "Pašnjaci", "Šumoviti predjeli", "Kraški reljef"],
    image: staretinaImage,
    reverse: false,
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
