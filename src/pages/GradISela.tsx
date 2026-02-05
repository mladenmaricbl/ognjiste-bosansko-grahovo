import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import townCenter from "@/assets/town-center.jpg";
import village1 from "@/assets/village-1.jpg";
import village2 from "@/assets/village-2.jpg";
import preodacImg from "@/assets/preodac.jpg";
import peciImg from "@/assets/peci.jpg";
import obljajImg from "@/assets/obljaj.jpg";
import stozistaImg from "@/assets/stozista.jpg";
import resanovciImg from "@/assets/resanovci.jpg";
import unistaImg from "@/assets/unista.jpg";
import crniLugImg from "@/assets/crni-lug.jpg";
import koritaImg from "@/assets/korita.jpg";
const simpleVillages = [{
  name: "Resanovci",
  description: "Tradicionalno selo poznato po očuvanoj arhitekturi i gostoljubivim domaćinima.",
  image: resanovciImg
}, {
  name: "Uništa",
  description: "Mirno selo smješteno u srcu zelene doline, idealno za bijeg od gradske vreve.",
  image: unistaImg
}, {
  name: "Crni Lug",
  description: "Poznato po tradicionalnim običajima i predivnom pogledu na okolne planine.",
  image: crniLugImg
}, {
  name: "Korita",
  description: "Selo okruženo šumama, savršeno za ljubitelje prirode i mira.",
  image: koritaImg
}];
const detailedVillages = [{
  name: "Preodac",
  description: `Na sjevernim padinama planine Šator, na nadmorskoj visini 860 m smješteno je naselje Preodac, pa se može reći da je Preodac smješten na planini Šator. Pobočni dijelovi Šatora, Vrščić i Vranjuša opasuju Preodac sa južne strane. Na toj strani je i Šatorsko jezero. Sa istoka ga omeđavaju Veliki i Mali Kuk. Od Tičeva na zapadu omeđuje ga padina Strmac i šuma Balinjača, a sa sjeverne strane više kosa i brijegova, među kojima se ističe Kuk.

Leži na tromeđi općina Bosansko Grahovo, Glamoč i Drvar. U prošlosti, osamdesetih godina dvadesetog vijeka, Preodac je bio proglašen među najljepšim selima u Evropi. U naselju Preodac bilo je preko 300 izvora pitke vode, danas ih je manje. Vodotok Brzica izbija ispod vrha Babina Greda, a Mlinski potok ispod Vranjuše. Sastaju se jedan sa drugim i još sa potokom Karlice i tada dobijaju ime Šator. Nakon izlaska iz naselja dobija poznato ime Unac i nakon toka od 66 km ulijeva se u Unu kod Martin Broda.

U naselju se nalazi i jedno malo jezero. Samo naselje je zdjeličarskog oblika, sredina mu je najniža i podvodna. Preko Tičeva cestom vezano je za Bosansko Grahovo. Ovo selo poznato je i po Momčilovoj kuli koja sa vrha litice baca pogled ka selu.`,
  image: preodacImg,
  reverse: false
}, {
  name: "Peći",
  description: `U naselju ima 60 izvora žive vode. Područje općine između Bosanskog Grahova i Resanovci snabdjeva se vodovodom sa izvora u ovom naselju. Vodovod je izgrađen donacijom vlade Japana.

U naselju postoji Gradina, rimsko utvrđenje iz kasne antike, nedovoljno istraženo. Tu je pronađen i miljokaz uz rimsku cestu koja je išla iz Dalmacije za Sisak.

Iznad sela se proteže planina Ujilica, kada se popnete na njene vrhove imate predivan pogled ka Hrvatskoj i Jadranskom moru.`,
  image: peciImg,
  reverse: true
}, {
  name: "Obljaj",
  description: `Obljaj je naseljeno mjesto u Bosni i Hercegovini, u opštini Bosansko Grahovo, koje administrativno pripada Federaciji Bosne i Hercegovine. Prema popisu stanovništva iz 2013. u naselju je živjelo 108 stanovnika. Prema opisu iz 1891. godine selo Obljaj je smešteno pod glavicom Obljojom ili Obljajkom. Po tom brdu je mesto ime dobilo. To je vrlo lepo selo, ali bez ikakvih starina.

U mesnoj parohiji "Obljaj" 1827. godine službuje pravoslavni sveštenik pop Nikola Lončar. Krajem 19. veka selo Obljaj je u sastavu pravoslavne parohije Grahovo. U mjestu žive pravoslavci ali i katolici. Tu je rimokatolički župni ured sa stanom za župnika.

Pred Drugi svetski rat delovalo je Nacionalno društvo "Krajišnik" sa sedištem u Sarajevu. To srpsko društvo je radilo na njegovanju uspomene na velikog mučenika Gavrila Principa. Kada je poznati srpski vajar Đoka Jovanović završio bistu Gavrilovu, maja 1940. godine beogradski pododbor je rešio da se ista postavi u Bosanskom Grahovu. Tamo je tada završavan spomen-dom posvećen Principu, ispred kojeg je postavljena njegova bista.

U naselju se nalazila rodna kuća Gavrila Principa u kojoj je do jula 1995. godine bio muzej sa eksponatima. Ova kuća prva je spaljena od strane pripadnika Sedme gardijske brigade Vojske Hrvatske prilikom njihovog ulaska u Obljaj u ljeto 1995. Od kuće je tada ostao samo kameni temelj, dok je gornji sprat od drveta potpuno izgoreo. U plamenu su izgorjeli i neki dokumenti, kao originalan plan za atentat u Sarajevu. Povodom jubileja atentata planirano je obnavljanje njegove rodne kuće. Kuća je ponovo otvorena na Vidovdan 28. juna 2014. godine. Na donjem spratu je muzejska postavka o Gavrilu Principu, a na gornjem je rekonstruisan namještaj iz vremena u kojem se u kući stanovalo.`,
  image: obljajImg,
  reverse: false
}, {
  name: "Stožišta",
  description: `Naselje koje se nalazi na samoj granici sa Hrvatskom. Prepuno prirodnih ljepota, kao i uvala koje su tipične za kraško područje. Bogato sa šumskim bogatstvima i kršnom klimom.

Stožišta nude jedinstven pogled na okolne planine i predstavljaju savršeno odredište za ljubitelje netaknute prirode i mirnog seoskog života.`,
  image: stozistaImg,
  reverse: true
}];
export default function GradISela() {
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
              Grad i sela
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Istražite bogatu istoriju i autentičnu atmosferu Bosanskog Grahova i okolnih sela koja čuvaju tradiciju naših predaka.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Town Center Section */}
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
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                Centar
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-2 mb-6">
                Bosansko Grahovo
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4 text-base font-light text-left">
                Opština Bosansko Grahovo se nalazi na jugozapadnom dijelu BiH i obuhvata površinu od 780 kvadratnih kilometara, graniči sa opštinama Drvar, Glamoč, Livno, Kulen Vakuf u Bosni i Hercegovini i opštinama Srb, Knin i Kijevo u Republici Hrvatskoj, a od obale Jadranskog mora udaljena je 80km (Šibenik). Planine Dinara, Uilica, Jadovnik, Šator i Staretina sa padinama i poljima između njih čine grahovsku teritoriju sa nadmorskom visinom između 400m (selo Mračaj) i 1851 (Veliki bat na Dinari). Grahovska polja (Resenovačko, Pašića, Crnoluško i Ždralovac) na nadmorskoj visini od 708 – 873 m čine kotlinu koja se proteže od sjeverozapada ka jugoistoku u dužini od 45 km i širini od 10km. Na jugu je Ždralovac i Livanjsko polje do Livna, a na sjeveru iz resenovačkog polja pruža se prevoj prema Drvaru (Ploče 985 m nadmorske visine) i uvala ka Srbu. Prevoj preko Stožišta između Dinare i Uilice (Derala 965 m nadmorske visine) je prolaz na zapad prema Kninu, a Tičevska visoravan (1098 m nadmorske visine) je prolaz na istok ka Glamoču. Prva velika cesta kroz grahovski kraj gradi se 47. i 48. godine nove ere, a na podlozi ove ceste Austrougarske vlasti 1892. godine grade makadamsku cestu Strmica - Bosansko Grahovo – Drvar, koja se 1975. godine preuređenjem pretvara u magistralni put. Magistralni putevi povezuju Bosansko Grahovo sa Kninom (35 km), Drvarom (35 km) i Livnom (76 km). Područjem opštine Bosansko Grahovo prolazi željeznička pruga (Donji Tiškovac) Bosanski Novi – Knin u dužini od 1700 m sa željezničkom stanicom u Bosanskom Drenovcu. Grahovska naselja (32 naseljena mjesta) nalaze se na obodima polja povezana su asfaltnim putevima sa sjedištem opštine, a postavljena su tako da na najbolji način koriste prirodne pogodnosti. Naselja su na sunčanim i od vjetra i nepogoda zaštićenim planinskim padinama i uvalama, na granici plodnog zemljišta sa pašnjacima i šumom, odakle se na najbolji način eksploatišu prirodna bogatstva. Po svom geografskom položaju opština Bosansko Grahovo iako blizu Jadranskog mora ima kontinentalnu klimu sa dugim i jakim zimama i kratkim i toplim ljetima sa velikim brojem sunčanih dana u godini.
              </p>
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
          }} className="relative">
              <img alt="Centar Bosanskog Grahova" className="rounded-lg shadow-lg w-full h-[400px] object-cover" src="/lovable-uploads/2ced3733-39ac-4aad-9585-de411d7b8b6c.jpg" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary rounded-lg -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Villages Sections */}
      <section className="section-padding">
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
        }} className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Okolna sela
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upoznajte tradicionalna sela koja čuvaju duh prošlosti i nude autentično iskustvo života u planinama.
            </p>
          </motion.div>

          <div className="space-y-24">
            {detailedVillages.map((village, index) => <motion.div key={village.name} initial={{
            opacity: 0,
            y: 40
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true,
            margin: "-100px"
          }} transition={{
            duration: 0.7
          }} className={`grid md:grid-cols-2 gap-12 items-center ${village.reverse ? "md:grid-flow-dense" : ""}`}>
                <div className={village.reverse ? "md:col-start-2" : ""}>
                  <span className="text-accent font-medium text-sm uppercase tracking-wider">
                    Selo
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mt-2 mb-6">
                    {village.name}
                  </h3>
                  <div className="text-muted-foreground leading-relaxed text-base font-light whitespace-pre-line">
                    {village.description}
                  </div>
                </div>
                <motion.div initial={{
              opacity: 0,
              x: village.reverse ? -30 : 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }} className={`relative ${village.reverse ? "md:col-start-1 md:row-start-1" : ""}`}>
                  <img src={village.image} alt={village.name} className="rounded-lg shadow-lg w-full h-[350px] md:h-[400px] object-cover" />
                  <div className={`absolute -bottom-4 ${village.reverse ? "-right-4" : "-left-4"} w-20 h-20 bg-accent/30 rounded-lg -z-10`} />
                </motion.div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Simple Villages Grid */}
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
        }} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Ostala sela
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Još nekoliko sela koja čine bogatu zajednicu grahovskog kraja.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {simpleVillages.map((village, index) => <motion.div key={village.name} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} className="card-nature group">
                <div className="relative h-48 overflow-hidden">
                  <img src={village.image} alt={village.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {village.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {village.description}
                  </p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>
    </Layout>;
}