import { useState } from "react";
import AboutSection from "./AboutSection";

const AboutSummary = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <section id="about-summary" className="border-t border-border contain-section">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 py-12 sm:py-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <span className="text-[10px] tracking-[0.35em] uppercase text-secondary mb-3 block font-medium">ABOUT</span>
              <h3 className="font-bold text-2xl sm:text-3xl text-foreground mb-2">Build24 & Bot Works</h3>
              <p className="text-muted-foreground text-[14px] leading-[1.8] max-w-2xl">
                Build24 is the launch event for Bot Works — a student-run club focused on hands-on engineering projects with measurable community impact. For full details, sponsor materials, and visual references, expand the section below.
              </p>
            </div>
            <div className="text-right">
              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex font-bold text-secondary-foreground bg-secondary px-5 py-2.5 text-[11px] tracking-[0.1em] hover:brightness-110 transition-all duration-300"
              >
                {expanded ? "CLOSE DETAILS ×" : "LEARN MORE →"}
              </button>
            </div>
          </div>
        </div>
      </section>
      {expanded && <AboutSection />}
    </>
  );
};

export default AboutSummary;
