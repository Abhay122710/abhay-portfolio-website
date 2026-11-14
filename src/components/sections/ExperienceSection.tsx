"use client";

import React, { useRef, useState, useEffect } from "react";
import { TIMELINE } from "@/lib/data";

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [spineHeight, setSpineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      
      // Calculate how far scrolled through section
      const totalH = rect.height;
      const currentScroll = windowH / 2 - rect.top;
      const pct = Math.min(1, Math.max(0, currentScroll / totalH));

      setSpineHeight(pct * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-24 px-4 md:px-8 max-w-[1320px] mx-auto relative">
      {/* Section Header */}
      <div className="rv mb-4 font-mono-code text-xs text-[var(--mute)] uppercase tracking-wider">
        05 — Experience & Education
      </div>

      <h2 className="rv text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[var(--ink)] mb-16">
        Chronological <span className="font-serif-italic text-[var(--mute)]">journey.</span>
      </h2>

      {/* Timeline Wrapper with Animated Spine */}
      <div className="relative pl-6 md:pl-12 border-l border-[var(--line)] space-y-12">
        {/* Animated Ink Spine Line */}
        <div
          className="absolute left-[-1px] top-0 bg-[var(--ink)] w-[2px] transition-all duration-150 ease-out"
          style={{ height: `${spineHeight}%` }}
          aria-hidden="true"
        />

        {TIMELINE.map((item, idx) => {
          const itemPct = ((idx + 1) / (TIMELINE.length + 1)) * 100;
          const isLit = spineHeight >= itemPct;

          return (
            <div
              key={item.id}
              className="rv relative group"
              style={{ "--i": idx } as React.CSSProperties}
            >
              {/* Timeline Node Dot */}
              <div
                className={`absolute -left-[31px] md:-left-[55px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  isLit
                    ? "bg-[var(--ink)] border-[var(--ink)] scale-110 shadow-md"
                    : "bg-[var(--paper)] border-[var(--mute)]"
                }`}
              />

              {/* Timeline Content Card */}
              <div className="hairline-card p-6 md:p-8 max-w-3xl">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="font-mono-code text-xs font-bold text-[var(--mute)]">
                    {item.year}
                  </span>
                  <div className="flex gap-2">
                    <span className="font-mono-code text-[10px] px-2.5 py-0.5 rounded-full bg-[var(--soft)] text-[var(--ink)] font-semibold">
                      {item.type}
                    </span>
                    {item.score && (
                      <span className="font-mono-code text-[10px] px-2.5 py-0.5 rounded-full bg-[var(--ink)] text-[var(--paper)] font-bold">
                        {item.score}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-[var(--ink)] mb-1">
                  {item.title}
                </h3>
                <p className="font-mono-code text-xs text-[var(--mute)] mb-4">
                  {item.place}
                </p>

                <ul className="space-y-2 text-sm text-[var(--ink-2)] leading-relaxed">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="text-[var(--ink)] font-bold">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}

        {/* Ending Dashed Card: Next — Your team? */}
        <div className="rv relative pt-4">
          <div className="absolute -left-[31px] md:-left-[55px] top-7 w-4 h-4 rounded-full border-2 border-dashed border-[var(--ink)] bg-[var(--paper)]" />
          <div className="border-2 border-dashed border-[var(--line)] rounded-3xl p-8 max-w-3xl bg-transparent hover:border-[var(--ink)] transition-colors duration-300">
            <h3 className="font-display text-xl font-bold text-[var(--ink)] mb-2">
              Next — Your team?
            </h3>
            <p className="text-sm text-[var(--mute)] mb-4">
              Open for full-time opportunities, engineering roles, and high-impact technical challenges.
            </p>
            <a href="#contact" className="btn-primary text-xs">
              Let&apos;s talk ↗
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
