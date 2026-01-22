import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import townCenter from "@/assets/town-center.jpg";
import village1 from "@/assets/village-1.jpg";
import village2 from "@/assets/village-2.jpg";
const villages = [{
  name: "Resanovci",
  description: "Tradicionalno selo poznato po očuvanoj arhitekturi i gostoljubivim domaćinima.",
  image: village1
}, {
  name: "Uništa",
  description: "Mirno selo smješteno u srcu zelene doline, idealno za bijeg od gradske vreve.",
  image: village2
}, {
  name: "Crni Lug",
  description: "Poznato po tradicionalnim običajima i predivnim pogledom na okolne planine.",
  image: village1
}, {
  name: "Korita",
  description: "Selo okruženo šumama, savršeno za ljubitelje prirode i mira.",
  image: village2
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
              <p className="text-muted-foreground leading-relaxed mb-4 text-base font-light text-left">Opština Bosansko Grahovo se nalazi na jugozapadnom dijelu BiH i obuhvata površinu od 780 kvadratnih kilometara, graniči sa opštinama Drvar, Glamoč, Livno, Kulen Vakuf u Bosni i Hercegovini i opštinama Srb, Knin i Kijevo u Republici Hrvatskoj, a od obale Jadranskog mora udaljena je 80km (Šibenik). Planine Dinara, Uilica, Jadovnik, Šator i Staretina sa padinama i poljima između njih čine grahovsku teritoriju sa nadmorskom visinom između 400m (selo Mračaj) i 1851 (Veliki bat na Dinari). Grahovska polja (Resenovačko, Pašića, Crnoluško i Ždralovac) na nadmorskoj visini od 708 – 873 m čine kotlinu koja se proteže od sjeverozapada ka jugoistoku u dužini od 45 km i širini od 10km. Na jugu je Ždralovac i Livanjsko polje do Livna, a na sjeveru iz resenovačkog polja pruža se prevoj prema Drvaru (Ploče 985 m nadmorske visine) i uvala ka Srbu. Prevoj preko Stožišta između Dinare i Uilice (Derala 965 m nadmorske visine) je prolaz na zapad prema Kninu, a Tičevska visoravan (1098 m nadmorske visine) je prolaz na istok ka Glamoču. Prva velika cesta kroz grahovski kraj gradi se 47. i 48. godine nove ere, a na podlozi ove ceste Austrougarske vlasti 1892. godine grade makadamsku cestu Strmica - Bosansko Grahovo – Drvar, koja se 1975. godine preuređenjem pretvara u magistralni put. Magistralni putevi povezuju Bosansko Grahovo sa Kninom (35 km), Drvarom (35 km) i Livnom (76 km). Područjem opštine Bosansko Grahovo prolazi željeznička pruga (Donji Tiškovac) Bosanski Novi – Knin u dužini od 1700 m sa željezničkom stanicom u Bosanskom Drenovcu. Grahovska naselja (32 naseljena mjesta) nalaze se na obodima polja povezana su asfaltnim putevima sa sjedištem opštine, a postavljena su tako da na najbolji način koriste prirodne pogodnosti. Naselja su na sunčanim i od vjetra i nepogoda zaštićenim planinskim padinama i uvalama, na granici plodnog zemljišta sa pašnjacima i šumom, odakle se na najbolji način eksploatišu prirodna bogatstva. Po svom geografskom položaju opština Bosansko Grahovo iako blizu Jadranskog mora ima kontinentalnu klimu sa dugim i jakim zimama i kratkim i toplim ljetima sa velikim brojem sunčanih dana u godini. </p>
              
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

      {/* Villages Grid */}
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
              Okolna sela
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upoznajte tradicionalna sela koja čuvaju duh prošlosti i nude autentično iskustvo života u planinama.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {villages.map((village, index) => <motion.div key={village.name} initial={{
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