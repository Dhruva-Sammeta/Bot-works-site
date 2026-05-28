import { useState, useCallback, useEffect } from "react";
import { AssetProvider } from "@/contexts/AssetContext";
import LoadingScreen from "@/components/LoadingScreen";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSummary from "@/components/AboutSummary";
import SDGSection from "@/components/SDGSection";
import LocationSection from "@/components/LocationSection";
import StatisticsSection from "@/components/StatisticsSection";
import SponsorsSection from "@/components/SponsorsSection";
import PrizesSection from "@/components/PrizesSection";
import SupportInitiativesSection from "@/components/SupportInitiativesSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";

gsap.registerPlugin(ScrollTrigger);

const IndexContent = ({ siteReady }: { siteReady: boolean }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [navVisible, setNavVisible] = useState(false);
  const handleIntroComplete = useCallback(() => setNavVisible(true), []);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
          gsap.fromTo(el,
            { y: 50, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 1.4, ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 75%", toggleActions: "play none none none" },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>(".gsap-stagger-parent").forEach((parent) => {
          const children = parent.querySelectorAll(".gsap-stagger-child");
          gsap.fromTo(children,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: 1, stagger: 0.06, ease: "expo.out",
              scrollTrigger: { trigger: parent, start: "top 75%", toggleActions: "play none none none" },
            }
          );
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
          gsap.fromTo(el,
            { y: 20, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>(".gsap-stagger-parent").forEach((parent) => {
          const children = parent.querySelectorAll(".gsap-stagger-child");
          gsap.fromTo(children,
            { y: 20, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: 0.6, stagger: 0.03, ease: "expo.out",
              scrollTrigger: { trigger: parent, start: "top 85%", toggleActions: "play none none none" },
            }
          );
        });
      });

      ScrollTrigger.refresh();
    }, mainRef);

    return () => { mm.revert(); ctx.revert(); };
  }, []);

  return (
    <div ref={mainRef} id="top" className="min-h-screen overflow-x-hidden">
      <Navbar visible={navVisible} />
      <HeroSection onIntroComplete={handleIntroComplete} startAnimation={siteReady} />
      <SectionReveal>
        <AboutSummary />
      </SectionReveal>
      <SectionReveal>
        <SDGSection />
      </SectionReveal>
      <SectionReveal>
        <LocationSection />
      </SectionReveal>
      <SectionReveal>
        <StatisticsSection />
      </SectionReveal>
      <SectionReveal>
        <SponsorsSection />
      </SectionReveal>
      <SectionReveal>
        <PrizesSection />
      </SectionReveal>
      <SectionReveal>
        <SupportInitiativesSection />
      </SectionReveal>
      <SectionReveal>
        <FAQSection />
      </SectionReveal>
      <SectionReveal>
        <Footer />
      </SectionReveal>
    </div>
  );
};

const Index = () => {
  const [ready, setReady] = useState(false);
  const handleComplete = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (!ready) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [ready]);

  return (
    <AssetProvider>
      {!ready && <LoadingScreen onComplete={handleComplete} />}
      <div
        style={{
          opacity: ready ? 1 : 0,
          pointerEvents: ready ? "auto" : "none",
          transition: "opacity 300ms ease",
          minHeight: "100vh",
        }}
      >
        <IndexContent siteReady={ready} />
      </div>
    </AssetProvider>
  );
};

export default Index;
