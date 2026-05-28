import { useEffect, useState } from "react";
import { AssetProvider } from "@/contexts/AssetContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import loadingIntroSrc from "@/assets/loadingscreenintro.webm";

const About = () => {
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setIntroReady(true);
  }, []);

  return (
    <AssetProvider>
      <div className="min-h-screen overflow-x-hidden">
        <Navbar visible variant="about" />
        <HeroSection startAnimation={introReady} freezeBeforeEndSeconds={2} videoSrc={loadingIntroSrc} />
        <SectionReveal>
          <AboutSection />
        </SectionReveal>
        <SectionReveal>
          <Footer />
        </SectionReveal>
      </div>
    </AssetProvider>
  );
};

export default About;