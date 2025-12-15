import Navbar2 from "@/components/Navbar2";
import ServiceHero from "@/components/ServiceHero";

import Topnav from "@/components/Topnav";
import SalesEngineSection from "@/components/SalesEngineSection";
import WhyChooseUsSection from "@/components/WhyChooseUs";
import RoadmapSection from "@/components/RoadmapSection";
import CoreWebServices from "@/components/CoreWebServices";
import MythVsReality from "@/components/MythVsReality";
import ContactForm from "@/components/ContactForm";
import FaqSection from "@/components/FaqSection";
import ThisIsYou2 from "@/components/ThisISYou2";
import Footer from "@/components/Footer";
import Portfolio from "@/components/Portfolio";
import CalendlyButton from "@/components/CalendlyEmbed";

interface HeroData {
  btnText: string;
  btnText2: string;
  btnText3: string;
  title: string;
  description: string;
  formSubtitle: string;
  formTitle: string;
}

const serviceHero: HeroData = {
  btnText: "Get a Quote",
  btnText2: "Get a Quote",
  btnText3: "Get a Quote",
  title: "Website Development Services",
  description: "Website Development Services",
  formSubtitle: "Talk To Us",
  formTitle: "Website Development Services",
}

export default function Home() {
  return (
    <div className=" overflow-x-hidden  ">
      <Topnav />
      <Navbar2 />
      <ServiceHero serviceHero={serviceHero} />
      <Portfolio/>
      <div className="hidden md:block">

      <ThisIsYou2 />
      </div>
      <CoreWebServices />
      <WhyChooseUsSection />
      {/* <RoadmapSection /> */}
      {/* <MythVsReality /> */}
      <SalesEngineSection />
      <ContactForm />
       {/* <CalendlyButton /> */}
      <FaqSection />
      <Footer/>
    </div>
  );
}
