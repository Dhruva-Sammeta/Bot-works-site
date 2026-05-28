import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RotatingGlobe from "@/components/ui/rotating-globe";

gsap.registerPlugin(ScrollTrigger);

const LocationSection = () => {
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

      const blocks = sectionRef.current?.querySelectorAll(".info-block");
      if (blocks) {
        gsap.fromTo(blocks,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.06, ease: "expo.out", scrollTrigger: { trigger: blocks[0], start: "top 70%" } }
        );
      }

      const globe = sectionRef.current?.querySelector(".globe-wrap");
      if (globe) {
        gsap.fromTo(globe,
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: globe, start: "top 75%" } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="location" ref={sectionRef} className="border-t border-border">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
        <div className="py-10 sm:py-14 border-b border-border">
          <span className="text-[10px] tracking-[0.35em] uppercase text-secondary mb-3 block font-medium">WHERE IT HAPPENS</span>
          <h2 ref={headingRef} className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[0.9] max-w-3xl" style={{ perspective: '800px' }}>
            PHYSICAL EVENT IN HYDERABAD
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-0">
          {/* Left: Globe */}
          <div className="globe-wrap flex items-center justify-center py-8 sm:py-12 overflow-hidden">
            <RotatingGlobe width={480} height={480} />
          </div>

          {/* Right: Info grid */}
          <div className="grid grid-cols-2">
            {[
              { label: "CITY", value: "HYDERABAD" },
              { label: "DURATION", value: "24 HOURS" },
              { label: "FORMAT", value: "IN-PERSON" },
              { label: "VENUE", value: "CO-WORKING SPACE" },
            ].map((item, i) => (
              <div
                key={i}
                className={`info-block group p-6 sm:p-8 bg-transparent hover:bg-secondary transition-colors duration-100 cursor-default
                  ${i % 2 === 0 ? 'border-r border-border' : ''}
                  ${i < 2 ? 'border-b border-border' : ''}
                `}
              >
                <span className="text-[9px] tracking-[0.3em] text-muted-foreground/40 group-hover:text-secondary-foreground/60 block mb-2 font-medium transition-colors duration-100">{item.label}</span>
                <span className="font-bold text-xl sm:text-2xl text-foreground group-hover:text-secondary-foreground transition-colors duration-100">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
