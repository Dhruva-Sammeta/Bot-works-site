import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const marqueeItems = [
  { label: "FOUNDING PARTNER", value: "TO BE ANNOUNCED", icon: "🤝" },
  { label: "TRACK SPONSOR", value: "TO BE ANNOUNCED", icon: "🛠" },
  { label: "COMMUNITY PARTNER", value: "TO BE ANNOUNCED", icon: "🌐" },
  { label: "FOUNDING PARTNER", value: "TO BE ANNOUNCED", icon: "🤝" },
  { label: "TRACK SPONSOR", value: "TO BE ANNOUNCED", icon: "🛠" },
  { label: "COMMUNITY PARTNER", value: "TO BE ANNOUNCED", icon: "🌐" },
];

const SponsorsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        const text = headingRef.current.textContent || "";
        headingRef.current.innerHTML = text
          .split("")
          .map((c) => c === " " ? "&nbsp;" : `<span class="overflow-hidden inline-block"><span class="split-char inline-block">${c}</span></span>`)
          .join("");

        const chars = headingRef.current.querySelectorAll(".split-char");
        gsap.set(chars, { y: "110%", rotateX: -60 });
        gsap.to(chars, {
          y: "0%", rotateX: 0,
          duration: 1.4, stagger: 0.025, ease: "expo.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 70%" },
        });
      }

      // Marquee setup — much slower base, proper seamless loop
      const setupMarquee = (el: HTMLDivElement | null, direction: "left" | "right", baseDuration: number) => {
        if (!el) return;

        // For "right" direction, we need to start offset so content is visible
        // and animate toward 0, then snap back
        const startX = direction === "left" ? 0 : -50;
        const endX = direction === "left" ? -50 : 0;

        gsap.set(el, { xPercent: startX });

        const tween = gsap.to(el, {
          xPercent: endX,
          duration: baseDuration,
          ease: "none",
          repeat: -1,
        });

        // Current speed multiplier (use object for GSAP tween target)
        const speedObj = { value: 1 };

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity());
            // Gentle speed boost: max 2.5x, with high velocity threshold
            const targetSpeed = 1 + Math.min(velocity / 2000, 1.5);
            gsap.to(speedObj, {
              value: targetSpeed,
              duration: 0.5,
              ease: "power2.out",
              onUpdate: () => tween.timeScale(speedObj.value),
            });
          },
          onLeave: () => {
            gsap.to(speedObj, {
              value: 1,
              duration: 1.2,
              ease: "power2.out",
              onUpdate: () => tween.timeScale(speedObj.value),
            });
          },
          onLeaveBack: () => {
            gsap.to(speedObj, {
              value: 1,
              duration: 1.2,
              ease: "power2.out",
              onUpdate: () => tween.timeScale(speedObj.value),
            });
          },
        });
      };

      // Much slower durations: 80s and 90s for gentle drift
      setupMarquee(row1Ref.current, "left", 80);
      setupMarquee(row2Ref.current, "right", 90);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const firstHalf = marqueeItems.slice(0, 3);
  const secondHalf = marqueeItems.slice(3);

  return (
    <section id="sponsors" ref={sectionRef} className="border-t border-border overflow-hidden relative">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
        <div className="py-10 sm:py-14 border-b border-border">
          <div className="flex flex-col gap-4 items-start">
            <div>
              <span className="text-[10px] tracking-[0.35em] uppercase text-secondary mb-3 block font-medium">PARTNERSHIPS</span>
              <h2 ref={headingRef} className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-4 sm:mb-6 max-w-4xl" style={{ perspective: '800px' }}>
                SPONSORS / PARTNERS
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee rows */}
      <div className="py-10 sm:py-16 space-y-5 sm:space-y-7 relative">
        {/* Row 1 — gentle left drift */}
        <div className="relative overflow-hidden">
          <div ref={row1Ref} className="flex gap-4 sm:gap-5 w-max" style={{ willChange: "transform" }}>
            {[...firstHalf, ...firstHalf, ...firstHalf, ...firstHalf].map((item, i) => (
              <Card key={i} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2 — gentle right drift */}
        <div className="relative overflow-hidden">
          <div ref={row2Ref} className="flex gap-4 sm:gap-5 w-max" style={{ willChange: "transform" }}>
            {[...secondHalf, ...secondHalf, ...secondHalf, ...secondHalf].map((item, i) => (
              <Card key={i} item={item} />
            ))}
          </div>
        </div>

        {/* Fades removed to support global gradient */}
      </div>

      {/* Bottom fade removed */}
    </section>
  );
};

const Card = ({ item }: { item: typeof marqueeItems[0] }) => {
  const isSponsor = item.label.includes("SPONSOR");

  return (
    <div className={`flex-shrink-0 border border-border group cursor-default relative overflow-hidden transition-colors duration-100 hover:bg-secondary
      ${isSponsor ? "w-[280px] sm:w-[320px] h-[150px] sm:h-[180px]" : "w-[240px] sm:w-[280px] h-[130px] sm:h-[150px]"}
    `}>
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-px bg-secondary/25 group-hover:bg-secondary-foreground/20 transition-colors duration-100" />
      <div className="absolute top-0 left-0 h-4 w-px bg-secondary/25 group-hover:bg-secondary-foreground/20 transition-colors duration-100" />
      <div className="absolute bottom-0 right-0 w-4 h-px bg-secondary/25 group-hover:bg-secondary-foreground/20 transition-colors duration-100" />
      <div className="absolute bottom-0 right-0 h-4 w-px bg-secondary/25 group-hover:bg-secondary-foreground/20 transition-colors duration-100" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <span className="text-[7px] tracking-[0.3em] text-muted-foreground/30 group-hover:text-secondary-foreground/60 font-bold transition-colors duration-100">
            {item.label}
          </span>
          <span className="text-sm opacity-60 group-hover:opacity-100 transition-opacity duration-100">
            {item.icon}
          </span>
        </div>
        <span className={`font-bold text-muted-foreground/60 group-hover:text-secondary-foreground tracking-[0.08em] transition-colors duration-100
          ${isSponsor ? "text-[13px]" : "text-[12px]"}
        `}>
          {item.value}
        </span>
      </div>
    </div>
  );
};

export default SponsorsSection;
