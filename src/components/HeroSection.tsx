import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Build24logoSrc from "@/assets/Build24intro.mp4";
import { ShaderBackground } from "@/components/ui/blue-noise";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({
  onIntroComplete,
  startAnimation = false,
  freezeBeforeEndSeconds,
  videoSrc,
}: {
  onIntroComplete?: () => void;
  startAnimation?: boolean;
  freezeBeforeEndSeconds?: number;
  videoSrc?: string;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLVideoElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const logoSource = videoSrc || Build24logoSrc;

  useEffect(() => {
    if (!startAnimation) return;

    const video = logoRef.current;
    let freezeTime = freezeBeforeEndSeconds && freezeBeforeEndSeconds > 0 ? null : undefined;

    const updateFreezeTime = () => {
      if (!video || !freezeBeforeEndSeconds || !Number.isFinite(video.duration) || video.duration <= 0) return;
      freezeTime = Math.max(0, video.duration - freezeBeforeEndSeconds);
    };

    const handleTimeUpdate = () => {
      if (!video || freezeTime === undefined || freezeTime === null) return;
      if (video.currentTime >= freezeTime) {
        video.pause();
        video.currentTime = freezeTime;
      }
    };

    if (video) {
      updateFreezeTime();
      video.addEventListener("loadedmetadata", updateFreezeTime);
      video.addEventListener("timeupdate", handleTimeUpdate);
    }

    // Intro Animation
    const tl = gsap.timeline({
      onComplete: () => {
        onIntroComplete?.();
      }
    });

    // Logo scale & fade in
    tl.fromTo(logoRef.current,
      { scale: 0.8, opacity: 0 },
      { 
        scale: 1, opacity: 1, duration: 1.5, ease: "expo.out", delay: 0.3,
        onStart: () => {
          if (video) {
            video.currentTime = 0;
            video.play().catch(() => {});
          }
        }
      }
    );
    
    // Glow behind logo
    tl.fromTo(glowRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 2, ease: "expo.out" },
      "-=1.2"
    );

    // Marquee — passive auto-scroll
    if (marqueeRef.current) {
      const inner = marqueeRef.current.querySelector(".marquee-inner");
      if (inner) gsap.to(inner, { xPercent: -50, duration: 18, repeat: -1, ease: "none" });
    }

    return () => {
      if (video) {
        video.removeEventListener("loadedmetadata", updateFreezeTime);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
      tl.kill();
    };
  }, [startAnimation, onIntroComplete, freezeBeforeEndSeconds]);

  return (
    <>
      <div ref={sectionRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Neuro Noise Shader Background */}
        <ShaderBackground className="absolute inset-0 z-0 h-full w-full object-cover" />
        
        {/* Dark Glass Overlay for Contrast */}
        <div className="absolute inset-0 bg-[#000]/50 backdrop-blur-[1px] z-10 pointer-events-none" />

        {/* Content & Logo container */}
        <div className="relative z-30 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto">
          {/* Logo container */}
          <div className="relative inline-block mb-2">
            {/* Glow behind the logo */}
            <div 
              ref={glowRef}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent_60%)] pointer-events-none opacity-0"
            />
            
            {/* The Logo Video */}
            <video
              ref={logoRef}
              src={logoSource}
              muted
              playsInline
              className="w-40 sm:w-48 md:w-56 mx-auto object-contain relative z-10 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-105 transition-transform duration-700 opacity-0 rounded-2xl"
            />
          </div>

          {/* Hero text */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-2 uppercase font-sans">
            Build24
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-blue-400 font-bold uppercase tracking-[0.25em] mb-4 font-sans">
            By Bot Works
          </p>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed mb-8 font-sans">
            A 24-hour student hackathon & prototyping challenge. Conceptualize, build, and deploy functional hardware and software under industry mentorship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#support" 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              View Initiatives
            </a>
            <a 
              href="mailto:contact@bot-works.tech?subject=Build24%20Inquiry" 
              className="px-6 py-3 bg-[#111827]/85 border border-blue-900/30 text-slate-300 hover:bg-blue-950/20 hover:text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all active:scale-95"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1 transition-opacity duration-700 ${
            startAnimation ? "opacity-100 delay-1000" : "opacity-0"
          }`}
        >
          <span className="text-[8px] tracking-[0.5em] uppercase text-muted-foreground/50">
            SCROLL
          </span>
          <div className="h-8 w-px overflow-hidden">
            <div className="h-full w-full animate-[shimmer_2s_ease-in-out_infinite] bg-gradient-to-b from-secondary/70 to-transparent" />
          </div>
        </div>
      </div>

      {/* Marquee — auto-scrolling */}
      <div ref={marqueeRef} className="overflow-hidden bg-secondary py-2.5">
        <div className="marquee-inner flex w-max items-center gap-12 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, groupIndex) => (
            <div key={groupIndex} className="flex items-center gap-12 whitespace-nowrap pr-12">
              {Array.from({ length: 10 }).map((__, i) => (
                <span
                  key={`${groupIndex}-${i}`}
                  className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-foreground"
                >
                  {i % 2 === 0 ? "BUILD-24 BY BOT WORKS" : "24 HOURS OF INNOVATION"}
                  <span className="h-1 w-1 bg-secondary-foreground/30" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
