import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: "WHAT IS BUILD-24 BY BOT WORKS?", a: "Build-24 by Bot Works is a 24-hour in-person build event held in Hyderabad. It challenges teams to address real infrastructure problems through the lens of SDG 9 and SDG 17." },
  { q: "WHO CAN PARTICIPATE?", a: "Anyone with a passion for building — students, developers, designers, makers. The event is open to all students regardless of discipline or prior experience." },
  { q: "HOW BIG SHOULD TEAMS BE?", a: "Teams of 2–4 members. Solo registrants will be placed into teams on arrival." },
  { q: "IS THERE A REGISTRATION FEE?", a: "Registration details will be announced soon. Follow our updates to be the first to know." },
  { q: "WHAT SHOULD I BRING?", a: "Bring your laptops and any specialist hardware you know you need. The venue provides power, high-bandwidth wifi, meals, snacks, a maker component starter kit, and rest space." },
  { q: "WHAT ARE THE JUDGING CRITERIA?", a: "The full judging criteria and SDG brief are released at the event. Come prepared." },
  { q: "WILL FOOD BE PROVIDED?", a: "Yes! Meals, snacks, and beverages will be available throughout the entire 24-hour event." },
  { q: "CAN I WORK ON A PRE-EXISTING PROJECT?", a: "No. All projects must be started from scratch during the event. You may come with ideas, but code, designs, and physical builds must be made on-site." },
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
          stagger: 0.04,
          ease: "expo.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 70%" },
        });
      }

      const items = sectionRef.current?.querySelectorAll(".faq-item");
      if (items) {
        gsap.fromTo(items,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.03, ease: "expo.out", scrollTrigger: { trigger: items[0], start: "top 75%" } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate open/close with GSAP
  useEffect(() => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const content = el.querySelector(".faq-content") as HTMLElement;
      if (!content) return;

      if (openIdx === i) {
        gsap.set(content, { display: "block" });
        gsap.fromTo(content,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.5, ease: "expo.out" }
        );
      } else {
        gsap.to(content, {
          height: 0, opacity: 0, duration: 0.35, ease: "expo.inOut",
          onComplete: () => gsap.set(content, { display: "none" }),
        });
      }
    });
  }, [openIdx]);

  return (
    <section id="faq" ref={sectionRef} className="border-t border-border contain-section">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
        <div className="py-10 sm:py-14 grid lg:grid-cols-[1fr_1fr] gap-4 items-end border-b border-border">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-secondary mb-3 block font-medium">GOT QUESTIONS?</span>
            <h2 ref={headingRef} className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground" style={{ perspective: '800px' }}>FAQ</h2>
          </div>
          <p className="text-muted-foreground text-[13px] leading-[1.8] lg:text-right">EVERYTHING YOU NEED TO KNOW.</p>
        </div>

        <div>
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                ref={(el) => { itemRefs.current[i] = el; }}
                className={`faq-item group border-b border-border transition-colors duration-100 cursor-pointer ${isOpen ? 'bg-secondary' : 'hover:bg-secondary'
                  }`}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <div className="flex items-center justify-between py-4 sm:py-5 px-1 sm:px-2">
                  <div className="flex items-center gap-4 pr-4">
                    <span className={`text-[10px] font-bold tabular-nums w-5 transition-colors duration-100 ${isOpen ? 'text-secondary-foreground/50' : 'text-muted-foreground/30 group-hover:text-secondary-foreground/60'
                      }`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`font-bold text-[13px] sm:text-[14px] tracking-[0.02em] transition-colors duration-100 ${isOpen ? 'text-secondary-foreground' : 'text-foreground group-hover:text-secondary-foreground'
                      }`}>
                      {faq.q}
                    </span>
                  </div>
                  <span className={`flex-shrink-0 text-lg font-light transition-colors transition-transform duration-300 ${isOpen ? "rotate-45 text-secondary-foreground" : "text-muted-foreground group-hover:text-secondary-foreground/60"
                    }`}>
                    +
                  </span>
                </div>
                <div className="faq-content overflow-hidden" style={{ display: "none", height: 0 }}>
                  <div className="pb-5 pl-9 sm:pl-11 pr-8">
                    <p className={`text-[12px] leading-[1.9] ${isOpen ? 'text-secondary-foreground/80' : 'text-muted-foreground'}`}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
