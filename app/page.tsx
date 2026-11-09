import Hero from "@/components/sections/Hero";
import CredentialStrip from "@/components/sections/CredentialStrip";
import TwoDisciplines from "@/components/sections/TwoDisciplines";
import Services from "@/components/sections/Services";
import FlatFee from "@/components/sections/FlatFee";
import WhoIHelp from "@/components/sections/WhoIHelp";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <CredentialStrip />
      <TwoDisciplines />
      <Services />
      <FlatFee />
      <WhoIHelp />
    </main>
  );
}
