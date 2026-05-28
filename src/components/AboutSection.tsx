import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sponsorBriefHref = "/files/botworks-summary-for-sponsors.pdf";

const AboutSection = () => {
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

      const textBlocks = sectionRef.current?.querySelectorAll(".about-text");
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
    <section id="about" ref={sectionRef} className="border-t border-border contain-section">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
        <div className="py-10 sm:py-14 border-b border-border grid lg:grid-cols-[1fr_1fr] gap-10">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-secondary mb-3 block font-medium">ABOUT BOT WORKS</span>
            <h2 ref={headingRef} className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[0.9] max-w-2xl" style={{ perspective: '800px' }}>
              THE FOUNDING EVENT
            </h2>
          </div>
          <div className="flex flex-col justify-end space-y-6 lg:pb-2">
            <p className="about-text text-muted-foreground text-[14px] leading-[1.8]">
              Bot Works is a student-run club built to turn engineering, making, and collaboration into tangible community value. Build24 is the launch point. The club is open to all students, and future programmes — competitions, community projects, workshops — grow from this foundation.
            </p>
            <p className="about-text text-foreground font-medium text-[14px] leading-[1.8]">
              Build24 challenges teams to address real infrastructure problems through the lens of SDG 9 and SDG 17. The full challenge brief — including the additional SDG pairings teams must respond to — is revealed at kickoff.
            </p>
            <div className="about-text flex flex-col gap-2 pt-2">
              <a
                href={sponsorBriefHref}
                download="Botworks Summary document.pdf"
                className="inline-flex font-bold text-secondary-foreground bg-secondary px-5 py-2.5 text-[11px] tracking-[0.1em] hover:brightness-110 transition-all duration-300"
              >
                PDF SOURCE →
              </a>
              <p className="text-[11px] leading-[1.6] text-muted-foreground/70 max-w-md">
                This PDF is an introductory document talking about the 'who' of this hackathon. For sponsors who want further communication, we have more detailed brochures available.
              </p>
            </div>
          </div>
        </div>

        <div id="contact" className="py-10 sm:py-14 border-b border-border">
          <span className="about-text text-[10px] tracking-[0.35em] uppercase text-secondary mb-4 block font-medium">CONTACT & SPONSORS</span>
          <h3 className="about-text text-2xl font-bold text-foreground mb-4">CONTACT US</h3>
          <p className="about-text text-muted-foreground text-[13px] leading-[1.8] mb-6 max-w-2xl">
            This is the sponsor-facing point of contact for Build24, partnership queries, and long-form support conversations. Use the PDF above for a concise source document, then reach out for a tailored discussion.
          </p>
          <div className="about-text grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Lead", value: "Dhruva Sammeta (+91 7842286303)", href: "https://wa.me/917842286303" },
              { label: "Lead", value: "Naga Pranay (+91 9000153644)", href: "https://wa.me/919000153644" },
              { label: "Email", value: "contact@bot-works.tech", href: "mailto:contact@bot-works.tech" },
              { label: "City", value: "Hyderabad, India", href: "#location" },
            ].map((item) => (
              <a key={item.label} href={item.href} target={item.href.startsWith("https://") ? "_blank" : undefined} rel={item.href.startsWith("https://") ? "noopener noreferrer" : undefined} className="group rounded-none border border-border bg-transparent p-4 transition-colors duration-100 hover:bg-secondary cursor-pointer">
                <span className="block text-[9px] tracking-[0.3em] uppercase text-muted-foreground/40 group-hover:text-secondary-foreground/60 transition-colors duration-100 mb-2">{item.label}</span>
                <span className="block text-[13px] font-medium text-foreground group-hover:text-secondary-foreground transition-colors duration-100">{item.value}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-0 border-b border-border">
          <div className="py-10 sm:py-14 pr-6 sm:pr-10 border-r-0 lg:border-r border-border border-b lg:border-b-0">
            <span className="about-text text-[10px] tracking-[0.35em] uppercase text-secondary mb-4 block font-medium">THE TRACKS</span>
            <h3 className="about-text text-2xl font-bold text-foreground mb-4">TWO CONCURRENT TRACKS</h3>
            <p className="about-text text-muted-foreground text-[13px] leading-[1.8] mb-4">
              <strong>Hardware track:</strong> Physical prototypes, functional builds, embedded systems, robotics. Components provided at the venue; teams may supplement with their own.
            </p>
            <p className="about-text text-muted-foreground text-[13px] leading-[1.8]">
              <strong>Software track:</strong> Web, mobile, data, embedded software. Must be functional and demonstrable to a non-technical judge.
            </p>
          </div>
          <div className="py-10 sm:py-14 lg:pl-10">
            <span className="about-text text-[10px] tracking-[0.35em] uppercase text-secondary mb-4 block font-medium">THE CHALLENGE</span>
            <ul className="about-text text-muted-foreground text-[13px] leading-[1.8] space-y-3 list-none">
              <li className="flex gap-3"><span className="text-secondary">·</span> The event is infrastructure-focused under SDG 9</li>
              <li className="flex gap-3"><span className="text-secondary">·</span> SDG 17 frames the partnership angle — teams, sponsors, and communities working together</li>
              <li className="flex gap-3"><span className="text-secondary">·</span> Teams must fully address at least two SDGs — partial attempts at a third earn nothing; a genuinely complete third is recognised separately</li>
              <li className="flex gap-3"><span className="text-secondary">·</span> The full judging criteria and SDG brief are released at the event. Come prepared.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
