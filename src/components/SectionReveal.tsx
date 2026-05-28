import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a section with a scrub-driven reveal animation.
 * Combines translate + opacity for a polished transition.
 */
const SectionReveal = ({ children, className = "" }: SectionRevealProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          y: window.innerWidth < 768 ? 24 : 50,
          opacity: 0,
          scale: window.innerWidth < 768 ? 0.99 : 0.97,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "top 45%",
            scrub: 0.8,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
};

export default SectionReveal;
