import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const schedule = [
  {
    day: "DAY 01",
    date: "OPENING",
    events: [
      { time: "09:00", title: "REGISTRATION & CHECK-IN", emoji: "📋" },
      { time: "10:00", title: "OPENING CEREMONY", emoji: "🎤" },
      { time: "11:00", title: "TEAM FORMATION", emoji: "🤝" },
      { time: "12:00", title: "HACKING BEGINS", emoji: "💻" },
      { time: "13:00", title: "LUNCH BREAK", emoji: "🍕" },
      { time: "18:00", title: "MENTOR SESSIONS R1", emoji: "🧠" },
      { time: "20:00", title: "DINNER & LIGHTNING TALKS", emoji: "⚡" },
      { time: "00:00", title: "MIDNIGHT CHECKPOINT", emoji: "🌙" },
    ],
  },
  {
    day: "DAY 02",
    date: "DEMO DAY",
    events: [
      { time: "08:00", title: "BREAKFAST", emoji: "☕" },
      { time: "10:00", title: "MENTOR SESSIONS R2", emoji: "🧠" },
      { time: "12:00", title: "HACKING ENDS", emoji: "🏁" },
      { time: "13:00", title: "LUNCH BREAK", emoji: "🍜" },
      { time: "14:00", title: "DEMO PRESENTATIONS", emoji: "🎯" },
      { time: "16:00", title: "JUDGING & DELIBERATION", emoji: "⚖️" },
      { time: "17:00", title: "AWARDS CEREMONY", emoji: "🏆" },
      { time: "18:00", title: "CLOSING & NETWORKING", emoji: "🎉" },
    ],
  },
];

const ScheduleSection = () => {
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
          y: "0%",
          rotateX: 0,
          duration: 1.4,
          stagger: 0.03,
          ease: "expo.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 70%" },
        });
      }

      const rows = sectionRef.current?.querySelectorAll(".schedule-row");
      if (rows) {
        gsap.fromTo(rows,
          { x: -20, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 0.8, stagger: 0.025, ease: "expo.out",
            scrollTrigger: { trigger: rows[0], start: "top 75%" },
          }
        );
      }

      const headers = sectionRef.current?.querySelectorAll(".day-header");
      if (headers) {
        gsap.fromTo(headers,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1.4, stagger: 0.12, ease: "expo.out",
            scrollTrigger: { trigger: headers[0], start: "top 75%" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="schedule" ref={sectionRef} className="border-t border-border contain-section">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
        <div className="py-10 sm:py-14 border-b border-border">
          <span className="text-[10px] tracking-[0.35em] uppercase text-secondary mb-3 block font-medium">THE TIMELINE</span>
            <h2 ref={headingRef} className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground" style={{ perspective: '800px' }}>SCHEDULE</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-0">
          {schedule.map((day, dayIdx) => (
            <div key={day.day} className={`${dayIdx === 0 ? 'lg:border-r border-border' : ''}`}>
              <div className="day-header border-b border-border py-4 px-0 sm:px-3 flex items-baseline justify-between">
                <span className="font-bold text-2xl sm:text-3xl text-foreground">{day.day}</span>
                <span className="text-[9px] tracking-[0.25em] text-muted-foreground/40 font-medium">{day.date}</span>
              </div>

              {day.events.map((event, i) => (
                <div key={i} className="schedule-row group flex border-b border-border/40 hover:bg-secondary transition-colors duration-100 cursor-default">
                  <div className="w-16 sm:w-20 flex-shrink-0 py-3 px-0 sm:px-3 flex items-center">
                    <span className="text-[12px] font-medium text-muted-foreground/60 group-hover:text-secondary-foreground/80 tabular-nums transition-colors duration-100">
                      {event.time}
                    </span>
                  </div>
                  <div className="flex-1 py-3 border-l border-border/30 group-hover:border-secondary-foreground/20 pl-4 transition-colors duration-100 flex items-center gap-2">
                    <h4 className="font-bold text-[12px] text-foreground group-hover:text-secondary-foreground transition-colors duration-100 tracking-[0.02em]">
                      {event.title}
                    </h4>
                    <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 translate-y-0.5 group-hover:translate-y-0">
                      {event.emoji}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
