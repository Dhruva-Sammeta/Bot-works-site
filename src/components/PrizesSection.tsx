import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prizes = [
  { place: "01", title: "BEST OVERALL", amount: "TBD", perks: ["UNIFIED HARDWARE & SOFTWARE BUILD"] },
  { place: "02", title: "BEST HARDWARE", amount: "TBD", perks: ["PHYSICAL BUILD EXCELLENCE"] },
  { place: "03", title: "BEST SOFTWARE", amount: "TBD", perks: ["SOFTWARE TRACK EXCELLENCE"] },
];

const PrizesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const text = headingRef.current.textContent || "";
        headingRef.current.innerHTML = text
          .split("")
          .map((c) => c === " " ? "&nbsp;" : `<span class="overflow-hidden inline-block"><span class="split-char inline-block">${c}</span></span>`)
          .join("");

        const chars = headingRef.current.querySelectorAll(".split-char");
        gsap.set(chars, { y: "110%", rotateX: -60 });
        gsap.to(chars, {
          y: "0%",
          rotateX: 0,
          duration: 1.4,
          stagger: 0.03,
          ease: "expo.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 70%" },
        });
      }

      if (cardsRef.current) {
        const cards = Array.from(cardsRef.current.children);
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: cardsRef.current, start: "top 75%" } }
        );

        cards.forEach((card) => {
          const el = card as HTMLElement;
          el.addEventListener("mouseenter", () => gsap.to(el, { y: -3, duration: 0.25, ease: "power2.out" }));
          el.addEventListener("mouseleave", () => gsap.to(el, { y: 0, duration: 0.4, ease: "expo.out" }));
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="prizes" ref={sectionRef} className="border-t border-border contain-section">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
        <div className="py-10 sm:py-14 border-b border-border">
          <span className="text-[10px] tracking-[0.35em] uppercase text-secondary mb-3 block font-medium">WHAT YOU WIN</span>
          <h2 ref={headingRef} className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-2" style={{ perspective: '800px' }}>PRIZE POOL</h2>
          <p className="text-muted-foreground text-[13px] max-w-md leading-[1.8]">EXCEPTIONAL WORK DESERVES EXCEPTIONAL RECOGNITION.</p>
        </div>

        <div ref={cardsRef} className="grid lg:grid-cols-3 border-b border-border">
          {prizes.map((prize, i) => {
            const isFeatured = i === 0;
            return (
              <div
                key={prize.place}
                className={`group relative bg-transparent py-8 sm:py-10 px-6 sm:px-8 transition-colors duration-100 hover:bg-secondary cursor-default
                  ${i < 2 ? 'border-r border-border' : ''}
                  ${isFeatured ? "bg-secondary/[0.03]" : ""}
                `}
              >
                {isFeatured && <div className="absolute top-0 left-0 right-0 h-[2px] bg-secondary group-hover:bg-secondary-foreground transition-colors duration-100" />}

                <span className={`font-bold text-[7rem] sm:text-[8rem] absolute top-2 right-4 ${isFeatured ? 'text-secondary/[0.06]' : 'text-foreground/[0.03]'} group-hover:text-secondary-foreground/10 select-none leading-none transition-colors duration-100`}>
                  {prize.place}
                </span>

                <div className="relative z-10">
                  <p className="text-[10px] tracking-[0.3em] text-secondary group-hover:text-secondary-foreground/60 font-bold mb-2 transition-colors duration-100">{prize.place} — PLACE</p>
                  <h3 className="font-bold text-xl sm:text-2xl text-foreground group-hover:text-secondary-foreground mb-2 transition-colors duration-100">{prize.title}</h3>
                  <p className="text-3xl font-bold text-gradient group-hover:text-secondary-foreground mb-5 transition-colors duration-100">{prize.amount}</p>

                  <div className="space-y-2 border-t border-border group-hover:border-secondary-foreground/20 pt-4 transition-colors duration-100">
                    {prize.perks.map((perk, j) => (
                      <div key={j} className="flex items-center gap-2 text-[11px] text-muted-foreground group-hover:text-secondary-foreground/70 tracking-[0.05em] transition-colors duration-100">
                        <span className="w-1 h-1 bg-secondary group-hover:bg-secondary-foreground flex-shrink-0 transition-colors duration-100" />
                        {perk}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="py-4 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[9px] text-muted-foreground/40 tracking-[0.15em] font-medium">+ CATEGORY PRIZES & SPONSOR AWARDS COMING SOON</span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
