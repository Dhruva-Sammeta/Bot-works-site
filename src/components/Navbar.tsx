import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const homeNavLinks = [
  { label: "ABOUT", href: "#about-summary" },
  { label: "IMPACT", href: "#sdg" },
  { label: "PRIZES", href: "#prizes" },
  { label: "SPONSORS", href: "#sponsors" },
  { label: "SCHEDULE", href: "#schedule" },
  { label: "FAQ", href: "#faq" },
];

const aboutNavLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

const Navbar = ({ visible = true, variant = "home" }: { visible?: boolean; variant?: "home" | "about" }) => {
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hasAnimated = useRef(false);
  const navLinks = variant === "about" ? aboutNavLinks : homeNavLinks;

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !visible || hasAnimated.current) return;

    hasAnimated.current = true;

    // Kill any existing tweens on nav elements to prevent glitches
    gsap.killTweensOf(nav);
    gsap.killTweensOf(nav.querySelectorAll(".nav-link, .nav-logo"));

    // Set initial states immediately
    gsap.set(nav, { y: -50, opacity: 0 });
    const links = nav.querySelectorAll(".nav-link");
    const logo = nav.querySelector(".nav-logo");
    gsap.set(links, { opacity: 0 });
    gsap.set(logo, { opacity: 0 });

    // Single clean timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.1,
    });

    tl.to(nav, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
    tl.to(logo, { opacity: 1, duration: 0.6 }, "-=0.5");
    tl.to(links, { opacity: 1, duration: 0.6, stagger: 0.04 }, "-=0.4");

    // Hover effects — attach once
    links.forEach((link) => {
      const el = link as HTMLElement;
      const enter = () => gsap.to(el, { y: -2, duration: 0.25, ease: "power2.out" });
      const leave = () => gsap.to(el, { y: 0, duration: 0.35, ease: "power2.out" });
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
  }, [visible]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ opacity: 0, pointerEvents: visible ? undefined : "none" }}
    >
      <div className="flex justify-center pt-4 px-4">
        <div
          ref={pillRef}
          className="nav-pill flex items-center gap-0 rounded-full border border-foreground/[0.08] relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(220 25% 6% / 0.65), hsl(220 25% 10% / 0.45))",
            boxShadow: "0 8px 32px -8px hsl(200 80% 50% / 0.08), 0 2px 8px hsl(0 0% 0% / 0.25), inset 0 1px 0 hsl(210 20% 93% / 0.04)",
          }}
        >
          {/* Subtle inner glow for liquid glass */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(200 80% 80% / 0.04), transparent)",
            }}
          />

          {/* Left links */}
          <div className="hidden md:flex items-center relative z-10">
            {navLinks.slice(0, variant === "about" ? 1 : 3).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link text-[10px] tracking-[0.15em] text-muted-foreground hover:text-secondary px-5 py-3.5 transition-colors duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={variant === "about" ? "/" : "#top"}
            onClick={(e) => {
              if (variant !== "about") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="nav-logo px-6 py-3 border-l border-r border-foreground/[0.06] flex items-center relative z-10"
          >
            <span className="font-bold text-foreground text-[11px] tracking-[0.15em] hover:text-secondary transition-colors duration-300">
              BUILD-24 BY BOT WORKS
            </span>
          </a>

          {/* Right links */}
          <div className="hidden md:flex items-center relative z-10">
            {navLinks.slice(variant === "about" ? 1 : 3).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link text-[10px] tracking-[0.15em] text-muted-foreground hover:text-secondary px-5 py-3.5 transition-colors duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href={variant === "about" ? "mailto:contact@bot-works.tech" : "#about-summary"}
              className="nav-link inline-flex font-bold text-secondary-foreground bg-secondary px-5 py-2.5 text-[11px] tracking-[0.1em] hover:brightness-110 transition-all duration-300 rounded-r-full"
            >
              {variant === "about" ? "EMAIL US →" : "REGISTER / CONTACT →"}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[4px] p-4 border-l border-foreground/[0.06] relative z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-4 h-[1.5px] bg-foreground transition-all duration-500 origin-center ${mobileOpen ? "rotate-45 translate-y-[5.5px]" : ""}`} />
            <span className={`w-4 h-[1.5px] bg-foreground transition-all duration-500 ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
            <span className={`w-4 h-[1.5px] bg-foreground transition-all duration-500 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[5.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/92 flex flex-col items-start justify-center px-10 gap-5 transition-all duration-700 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-4xl font-bold text-foreground hover:text-secondary transition-colors duration-300 tracking-[-0.02em]"
            style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms" }}
          >
            {link.label}
          </a>
        ))}
        <a
          href={variant === "about" ? "mailto:contact@bot-works.tech" : "#about-summary"}
          onClick={() => setMobileOpen(false)}
          className="inline-flex font-bold text-secondary-foreground bg-secondary px-5 py-2.5 text-[11px] tracking-[0.1em] hover:brightness-110 transition-all duration-300 mt-4"
        >
          {variant === "about" ? "EMAIL US →" : "REGISTER / CONTACT →"}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
