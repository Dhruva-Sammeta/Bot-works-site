import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SupportInitiativesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const text = headingRef.current.textContent || "";
        headingRef.current.innerHTML = text
          .split("")
          .map((c) => (c === " " ? "&nbsp;" : `<span class="overflow-hidden inline-block"><span class="split-char inline-block">${c}</span></span>`))
          .join("");

        const chars = headingRef.current.querySelectorAll(".split-char");
        gsap.set(chars, { y: "110%", rotateX: -60 });
        gsap.to(chars, {
          y: "0%",
          rotateX: 0,
          duration: 1.4,
          stagger: 0.02,
          ease: "expo.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 70%" },
        });
      }

      const blocks = sectionRef.current?.querySelectorAll(".support-block");
      if (blocks) {
        gsap.fromTo(
          blocks,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: blocks[0], start: "top 75%" } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="support" ref={sectionRef} className="border-t border-border contain-section">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
        <div className="py-10 sm:py-14 border-b border-border grid lg:grid-cols-[1fr_1fr] gap-6 sm:gap-10">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-secondary mb-2 sm:mb-3 block font-medium">SUPPORT</span>
            <h2 ref={headingRef} className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[0.9] max-w-2xl" style={{ perspective: '800px' }}>
              SUPPORT INITIATIVES
            </h2>
          </div>
          <div className="flex flex-col justify-end space-y-4 lg:pb-2">
            <p className="text-muted-foreground text-[14px] leading-[1.8]">
              Sponsors of Build24 are founding partners of Bot Works — not just event sponsors. Their support at this stage is part of the club's origin story and will be credited as such across all future activity. Your sponsorship funds three parallel initiatives running simultaneously. Sponsors fund the launch of a student club that is competitive, charitable, and accountable.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-0 border-b border-border py-10 sm:py-14">
          <div className="group pr-6 sm:pr-10 border-r-0 lg:border-r border-border py-6 px-6 sm:py-8 sm:px-8 -ml-6 -mt-6 lg:-ml-8 lg:-mt-8 mb-4 lg:mb-0 support-block hover:bg-secondary transition-colors duration-100 cursor-default">
            <h3 className="text-2xl font-bold text-foreground group-hover:text-secondary-foreground transition-colors duration-100 mb-4">Build24 — Launch & Event Support</h3>
            <p className="text-muted-foreground group-hover:text-secondary-foreground transition-colors duration-100 text-[13px] leading-[1.7] mb-3">
              Sponsor the 24-hour Build24 launch event: venue, logistics, mentoring, judging, and documentation. This is the public proof point that shows Bot Works can plan, build, and deliver under pressure.
            </p>
            <p className="text-muted-foreground group-hover:text-secondary-foreground transition-colors duration-100 text-[13px] leading-[1.7]">
              What sponsors get from this part is simple: a strong launch, visible branding, project photos, and a clean narrative that introduces the club to schools, partners, and future supporters.
            </p>
          </div>

          <div className="group pl-6 sm:pl-10 pr-6 sm:pr-10 border-r-0 lg:border-r border-border py-6 px-6 sm:py-8 sm:px-8 -mt-6 sm:-mr-0 lg:-mt-8 mb-4 lg:mb-0 support-block hover:bg-secondary transition-colors duration-100 cursor-default flex flex-col h-full">
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-foreground group-hover:text-secondary-foreground transition-colors duration-100 mb-4">Project Reboot — Sustained Impact</h3>
              <p className="text-muted-foreground group-hover:text-secondary-foreground transition-colors duration-100 text-[13px] leading-[1.7] mb-3">
                Sponsor the refurbishment programme: collect, repair, wipe, install Linux on, and deliver laptops to verified NGO partners. The target is 15 refurbished machines, with a realistic path to lower-cost scaling if donations reduce procurement.
              </p>
              <p className="text-muted-foreground group-hover:text-secondary-foreground transition-colors duration-100 text-[13px] leading-[1.7] mb-3">
                The rough summary is straightforward: one laptop can serve up to three students in some NGO settings, functional machines are diverted from e-waste, and sponsors get a clean CSR package with reporting, beneficiary data, photos, and the chance to file against Schedule VII.
              </p>
              <p className="text-muted-foreground group-hover:text-secondary-foreground transition-colors duration-100 text-[13px] leading-[1.7] mb-3">
                This is not charity theatre. It is a repeatable student-built groundwork programme that creates real access, real documentation, and a handoff for the next cohort.
              </p>
            </div>
            <div className="mt-auto pt-5">
              <a href="mailto:contact@bot-works.tech?subject=Request%20Project%20Reboot%20CAS%20Plan" className="inline-flex font-bold text-secondary-foreground bg-secondary px-5 py-2.5 text-[11px] tracking-[0.1em] hover:brightness-110 transition-all duration-300">
                REQUEST THE PROJECT REBOOT PLAN →
              </a>
            </div>
          </div>

          <div className="group pl-6 sm:pl-10 lg:pl-10 py-6 px-6 sm:py-8 sm:px-8 -mt-6 sm:-mr-8 lg:-mt-8 support-block hover:bg-secondary transition-colors duration-100 cursor-default relative overflow-hidden flex flex-col h-full">
            <svg className="absolute inset-0 w-full h-full text-secondary/15 pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,50 L20,50 L25,30 L35,70 L45,20 L55,80 L65,40 L70,50 L100,50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <div className="relative z-10 flex-grow">
              <h3 className="text-2xl font-bold text-foreground group-hover:text-secondary-foreground transition-colors duration-100 mb-4">Proteus Arc</h3>
              <p className="text-muted-foreground group-hover:text-secondary-foreground transition-colors duration-100 text-[13px] leading-[1.7] mb-3">
                Proteus Arc is an implementation-focused Alzheimer’s detection initiative that uses EEG data to provide accessible and scalable supportative diagnosises through considering real-world conditions. The goal is to make early Alzheimer’s assessment more accessible for everyone.
              </p>
              <p className="text-muted-foreground group-hover:text-secondary-foreground transition-colors duration-100 text-[13px] leading-[1.7]">
                Having mentors from UoH, and the core team of the India Segment of the World Economic Forum's Davos Initiative, the algorithm is getting set for real-world deployment and impact.
              </p>
            </div>
            <div className="mt-auto pt-5 relative z-10">
              <a href="mailto:contact@bot-works.tech?subject=Request%20Proteus%20Arc%20Plan" className="inline-flex font-bold text-secondary-foreground bg-secondary px-5 py-2.5 text-[11px] tracking-[0.1em] hover:brightness-110 transition-all duration-300">
                REQUEST THE PROTEUS ARC PLAN →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportInitiativesSection;
