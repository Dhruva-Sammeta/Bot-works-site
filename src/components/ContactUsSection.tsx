import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactUsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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
          y: "0%", rotateX: 0,
          duration: 1.4, stagger: 0.025, ease: "expo.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 70%" },
        });
      }

      const contactItems = sectionRef.current?.querySelectorAll(".contact-item");
      if (contactItems) {
        gsap.fromTo(contactItems,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: contactItems[0], start: "top 75%" } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="border-t border-border contain-section">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
        <div className="py-10 sm:py-14 border-b border-border">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10">
            <div>
              <span className="text-[10px] tracking-[0.35em] uppercase text-secondary mb-3 block font-medium">GET IN TOUCH</span>
              <h2 ref={headingRef} className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[0.9] max-w-2xl" style={{ perspective: '800px' }}>
                CONTACT US
              </h2>
            </div>
            <div className="flex flex-col justify-end space-y-6 lg:pb-2">
              <p className="contact-item text-muted-foreground text-[14px] leading-[1.8]">
                Questions about Build24, sponsorships, or Project Reboot? We're here and ready to talk.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-0 border-b border-border py-10 sm:py-14">
          <div className="pr-6 sm:pr-10 border-r-0 lg:border-r border-border pb-10 sm:pb-0 lg:pb-0">
            <div className="space-y-8">
              <div className="contact-item">
                <span className="text-[10px] tracking-[0.35em] uppercase text-secondary mb-3 block font-medium">LEAD</span>
                <h3 className="text-lg font-bold text-foreground mb-2">Dhruva Sammeta</h3>
                <p className="text-secondary text-[13px]">+91 7842286303 · Lead of Bot Works</p>
              </div>

              <div className="contact-item">
                <span className="text-[10px] tracking-[0.35em] uppercase text-secondary mb-3 block font-medium">LEAD</span>
                <h3 className="text-lg font-bold text-foreground mb-2">Naga Pranay Immadi</h3>
                <p className="text-secondary text-[13px]">+91 9000153644 · Lead of Bot Works</p>
              </div>

              <div className="contact-item">
                <span className="text-[10px] tracking-[0.35em] uppercase text-secondary mb-3 block font-medium">EMAIL</span>
                <h3 className="text-lg font-bold text-foreground mb-2">Contact</h3>
                <a href="mailto:contact@bot-works.tech" className="text-secondary text-[13px] hover:underline underline-offset-2 transition-all">
                  contact@bot-works.tech
                </a>
              </div>

              <div className="contact-item">
                <span className="text-[10px] tracking-[0.35em] uppercase text-secondary mb-3 block font-medium">LOCATION</span>
                <h3 className="text-lg font-bold text-foreground mb-2">Based in Hyderabad</h3>
                <p className="text-muted-foreground text-[13px]">
                  IB Diploma Programme. Student-led. Hardware & software building.
                </p>
              </div>
            </div>
          </div>

          <div className="pl-6 sm:pl-10 lg:pl-10">
            <div className="space-y-8">
              <div className="contact-item">
                <span className="text-[10px] tracking-[0.35em] uppercase text-secondary mb-3 block font-medium">RESOURCES</span>
                <h3 className="text-lg font-bold text-foreground mb-3">Sponsor-ready links</h3>
                <div className="flex gap-4">
                  <a href="/files/botworks-summary-for-sponsors.pdf" download="Botworks Summary document.pdf" className="text-[13px] text-secondary hover:underline underline-offset-2 transition-all">
                    Sponsor PDF
                  </a>
                  <a href="mailto:contact@bot-works.tech" className="text-[13px] text-secondary hover:underline underline-offset-2 transition-all">
                    Email Us
                  </a>
                  <a href="https://wa.me/917842286303" target="_blank" rel="noopener noreferrer" className="text-[13px] text-secondary hover:underline underline-offset-2 transition-all">
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <span className="text-[10px] tracking-[0.35em] uppercase text-secondary mb-3 block font-medium">RESPOND TIME</span>
                <h3 className="text-lg font-bold text-foreground mb-2">Within 48 hours</h3>
                <p className="text-muted-foreground text-[13px]">
                  We're students. We build fast, we respond fast.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-8 sm:py-10">
          <div className="contact-item group border border-secondary/30 bg-secondary/5 hover:bg-secondary transition-colors duration-100 cursor-default rounded-lg p-6 sm:p-8">
            <p className="text-foreground group-hover:text-secondary-foreground transition-colors duration-100 font-bold text-[14px] mb-2">
              Ready to sponsor or partner?
            </p>
            <p className="text-muted-foreground group-hover:text-secondary-foreground transition-colors duration-100 text-[13px] leading-[1.6] mb-4">
              Tell us about your company, what you're looking for, and how you see Bot Works fitting into your plans or CSR goals.
            </p>
            <a
              href="mailto:contact@bot-works.tech"
              className="inline-flex font-bold text-secondary-foreground bg-secondary px-5 py-2.5 text-[11px] tracking-[0.1em] hover:brightness-110 transition-all duration-300"
            >
              SEND US A MESSAGE →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
