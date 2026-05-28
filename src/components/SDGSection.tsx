import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SDG9 from "../assets/Sustainable_Development_Goal_09Industry.svg";
import SDG17 from "../assets/Sustainable_Development_Goal_17Partnerships.svg";

gsap.registerPlugin(ScrollTrigger);

const SDGSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const words = headingRef.current.textContent?.split(" ") || [];
        headingRef.current.innerHTML = words
          .map((w, idx) => `<span class="inline-block overflow-hidden"><span class="split-word inline-block">${w}</span></span>${idx < words.length - 1 ? '<span style="display:inline-block;width:0.42em"></span>' : ""}`)
          .join("");

        const splitWords = headingRef.current.querySelectorAll(".split-word");
        gsap.set(splitWords, { y: "110%", rotateX: -60 });
        gsap.to(splitWords, {
          y: "0%",
          rotateX: 0,
          duration: 1.6,
          stagger: 0.06,
          ease: "expo.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 70%" },
        });
      }

      const textBlocks = sectionRef.current?.querySelectorAll(".sdg-text");
      if (textBlocks) {
        gsap.fromTo(textBlocks,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: textBlocks[0], start: "top 75%" } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sdg" ref={sectionRef} className="border-t border-border contain-section">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
        <style>{`
          @keyframes sdgFloat {0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}
          .sdg-img{animation:sdgFloat 6s ease-in-out infinite;transition:transform .35s ease}
          .sdg-img:hover{transform:translateY(-4px) scale(1.04)}
        `}</style>
        <div className="py-10 sm:py-14 border-b border-border grid lg:grid-cols-[1fr_1fr] gap-10">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-secondary mb-3 block font-medium">CORE OBJECTIVES</span>
            <h2 ref={headingRef} className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[0.9] max-w-2xl" style={{ perspective: '800px' }}>
              IMPACT DRIVEN
            </h2>
          </div>
          <div className="flex flex-col justify-end space-y-6 lg:pb-2">
            <p className="sdg-text text-muted-foreground text-[14px] leading-[1.8]">
              We are not just building for the sake of building. Every project must be anchored in real-world infrastructure and systemic growth. The whole goal is measurable, scalable impact.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-0 border-b border-border">
          <div className="group py-10 px-6 sm:py-14 sm:px-10 border-r-0 lg:border-r border-border border-b lg:border-b-0 flex flex-col lg:flex-row items-center gap-6 hover:bg-secondary cursor-default transition-colors duration-100">
            <div className="flex-shrink-0 rounded-md overflow-hidden bg-[#F36D25]">
              <img src={SDG9} alt="SDG 9" className="w-28 h-28 object-contain rounded-md" />
            </div>
            <div>
              <span className="sdg-text text-[10px] tracking-[0.35em] uppercase text-secondary group-hover:text-secondary-foreground/60 transition-colors duration-100 mb-2 block font-medium">THE FOUNDATION</span>
              <h3 className="sdg-text text-2xl font-bold text-foreground group-hover:text-secondary-foreground transition-colors duration-100 mb-2">SDG 9: Industry & Infrastructure</h3>
              <p className="sdg-text text-muted-foreground group-hover:text-secondary-foreground/80 transition-colors duration-100 text-[13px] leading-[1.6]">Focus on resilient infrastructure, sustainable industrialisation, and innovation.</p>
            </div>
          </div>
          <div className="group py-10 px-6 sm:py-14 sm:px-10 relative overflow-hidden flex flex-col lg:flex-row items-center gap-6 hover:bg-secondary cursor-default transition-colors duration-100">
            <div className="flex-shrink-0 rounded-md overflow-hidden bg-[#19486A]">
              <img src={SDG17} alt="SDG 17" className="w-28 h-28 object-contain rounded-md" />
            </div>
            <div className="flex-1">
              <span className="sdg-text text-[10px] tracking-[0.35em] uppercase text-secondary group-hover:text-secondary-foreground/60 transition-colors duration-100 mb-2 block font-medium">THE ALIGNMENT</span>
              <h3 className="sdg-text text-2xl font-bold text-foreground group-hover:text-secondary-foreground transition-colors duration-100 mb-2">SDG 17: Partnerships</h3>
              <p className="sdg-text text-muted-foreground group-hover:text-secondary-foreground/80 transition-colors duration-100 text-[13px] leading-[1.6] mb-2">SDG 17 is shown here as the stand‑in to align collaborations and resources.</p>
            </div>
            <div className="flex-shrink-0 flex items-center group-hover:text-secondary-foreground transition-colors duration-100">
              <div className="mx-4 h-24 border-l-2 border-secondary/60 group-hover:border-secondary-foreground/40 transition-colors duration-100"></div>
              <div className="text-sm font-bold text-foreground/80 group-hover:text-secondary-foreground uppercase tracking-wider text-center transition-colors duration-100">
                SDG 2 — Revealed on spot
                <div className="text-xs text-muted-foreground group-hover:text-secondary-foreground/70 font-normal transition-colors duration-100">(SDG 17 IS STAND-IN)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SDGSection;
