import Hero from "@/components/sections/Hero";
import CredentialStrip from "@/components/sections/CredentialStrip";
import TwoDisciplines from "@/components/sections/TwoDisciplines";
import Services from "@/components/sections/Services";
import FlatFee from "@/components/sections/FlatFee";
import WhoIHelp from "@/components/sections/WhoIHelp";
import TaxYear from "@/components/sections/TaxYear";
import FitCheck from "@/components/sections/FitCheck";
import HowItWorks from "@/components/sections/HowItWorks";
import MeetDolly from "@/components/sections/MeetDolly";
import KindWords from "@/components/sections/KindWords";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <CredentialStrip />
        <TwoDisciplines />
        <Services />
        <FlatFee />
        <WhoIHelp />
        <TaxYear />
        <FitCheck />
        <HowItWorks />
        <MeetDolly />
        <KindWords />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
