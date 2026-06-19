import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particles-typography";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = footerRef.current?.querySelectorAll(".footer-reveal");
      if (els) {
        gsap.fromTo(els,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1.2, stagger: 0.08, ease: "expo.out",
            scrollTrigger: { trigger: footerRef.current, start: "top 75%" },
          }
        );
      }

      const socials = footerRef.current?.querySelectorAll(".social-link");
      socials?.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          gsap.to(link, { y: -3, color: "hsl(var(--secondary))", duration: 0.3, ease: "power2.out" });
        });
        link.addEventListener("mouseleave", () => {
          gsap.to(link, { y: 0, color: "", duration: 0.5, ease: "expo.out" });
        });
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="border-t border-border">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
        {/* CTA */}
        <div className="py-14 sm:py-20 grid lg:grid-cols-[1.5fr_1fr] gap-10 items-end border-b border-border">
          <div>
            <h3 className="font-bold text-5xl sm:text-6xl lg:text-8xl text-foreground leading-[0.95] mb-0">
              READY TO
            </h3>
            <div className="h-[100px] sm:h-[140px] lg:h-[180px] mb-6">
              <CursorDrivenParticleTypography
                text="BUILD?"
                fontSize={220}
                fontFamily="Switzer, sans-serif"
                particleSize={2}
                particleDensity={5}
                dispersionStrength={18}
                returnSpeed={0.06}
                color="hsl(200, 60%, 55%)"
                className="h-full"
              />
            </div>
            <div className="mb-6 max-w-md">
              <p className="text-muted-foreground text-[16px] leading-[1.6]">
                24 hours. Real problems. Build something that matters.
              </p>
              <p className="text-muted-foreground/60 text-[12px] mt-2">
                Registration details, capacity cap, and cost to be announced.
              </p>
            </div>
            <a
              href="/about"
              className="inline-flex font-bold text-secondary-foreground bg-secondary px-5 py-2.5 text-[11px] tracking-[0.1em] hover:brightness-110 transition-all duration-300"
            >
              REGISTER NOW / CONTACT →
            </a>
          </div>
          <div className="footer-reveal space-y-5">
            {[
              { label: "EMAIL", value: "CONTACT@BOT-WORKS.TECH", href: "mailto:contact@bot-works.tech" },
              { label: "LEAD 1 WHATSAPP", value: "+91 7842286303", href: "https://wa.me/917842286303" },
              { label: "LEAD 2 WHATSAPP", value: "+91 9000153644", href: "https://wa.me/919000153644" },
              { label: "LOCATION", value: "HYDERABAD, INDIA", href: null },
            ].map((item) => (
              <div key={item.value} className="border-b border-border/50 pb-3">
                <span className="text-[8px] tracking-[0.3em] text-muted-foreground/30 block mb-1 font-medium">{item.label}</span>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith("https://") ? "_blank" : undefined} rel={item.href.startsWith("https://") ? "noopener noreferrer" : undefined} className="text-foreground text-[12px] hover:text-secondary transition-colors duration-400 tracking-[0.02em]">
                    {item.value}
                  </a>
                ) : (
                  <span className="text-foreground text-[12px] tracking-[0.02em]">{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="footer-reveal flex flex-col sm:flex-row items-center gap-2">
            <span className="text-[10px] text-muted-foreground tracking-[0.1em]">© 2025 BUILD-24 BY BOT WORKS</span>
            <span className="hidden sm:inline text-muted-foreground/30">·</span>
            <span className="text-[10px] text-muted-foreground/50 tracking-[0.05em]">Made by Naga Pranay Immadi and Dhruva Sammeta</span>
          </div>
          <div className="footer-reveal flex items-center gap-6">
            {[
              { label: "BRIEF", href: "/files/botworks-summary-for-sponsors.pdf" },
              { label: "ABOUT", href: "/about" },
              { label: "CONTACT", href: "/about#contact" },
              { label: "LOCATION", href: "#location" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="social-link text-[10px] text-muted-foreground tracking-[0.1em] font-medium transition-colors duration-400 hover:text-secondary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
