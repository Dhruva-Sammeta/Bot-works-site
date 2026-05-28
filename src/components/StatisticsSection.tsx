import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 24, suffix: "H", label: "NON-STOP BUILDING" },
  { value: 100, suffix: "+", label: "EXPECTED BUILDERS" },
  { value: 3, suffix: "", label: "PER TEAM MAX" },
  { value: 2, suffix: "", label: "CONCURRENT TRACKS" },
];

const StatisticsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = stats[i].value;
        const obj = { val: 0 };
        const cell = el.closest(".stat-cell");

        gsap.fromTo(cell,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1.4, ease: "expo.out",
            delay: i * 0.05,
            scrollTrigger: { trigger: el, start: "top 75%" },
          }
        );

        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 75%" },
          onUpdate: () => { if (el) el.textContent = Math.floor(obj.val) + stats[i].suffix; },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="statistics" ref={sectionRef} className="relative border-t border-border bg-transparent" style={{ zIndex: 1 }}>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
        <div className="py-6 sm:py-8">
          <span className="text-[10px] tracking-[0.35em] uppercase text-secondary block font-medium">THE NUMBERS</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-border">
          {stats.map((stat, i) => (
            <div key={i} className={`stat-cell group py-8 sm:py-12 px-4 sm:px-6 hover:bg-secondary transition-colors duration-100 cursor-default
              ${i < 3 ? 'border-r border-border' : ''}
            `}>
              <span
                ref={(el) => { counterRefs.current[i] = el; }}
                className="font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground block mb-2 group-hover:text-secondary-foreground transition-colors duration-100 tabular-nums"
              >
                0{stat.suffix}
              </span>
              <span className="text-[9px] text-muted-foreground/40 group-hover:text-secondary-foreground/60 tracking-[0.25em] font-medium transition-colors duration-100">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
