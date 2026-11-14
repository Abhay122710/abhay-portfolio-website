"use client";

import React from "react";
import { CERTIFICATIONS } from "@/lib/data";

export const CertificationsSection: React.FC = () => {
  return (
    <section
      id="leadership"
      className="w-full bg-[var(--card)] py-24 border-y border-[var(--line)] my-16"
    >
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 items-start">
        
        {/* Left Sticky Column */}
        <div className="rv lg:sticky lg:top-28">
          <div className="font-mono-code text-xs text-[var(--mute)] uppercase tracking-wider mb-4">
            04 — Leadership & Campus Roles
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-[var(--ink)] mb-4">
            Driving <span className="font-serif-italic text-[var(--mute)]">impact.</span>
          </h2>

          <p className="font-mono-code text-xs text-[var(--mute)]">
            Total active leadership roles: {CERTIFICATIONS.length}
          </p>
        </div>

        {/* Right Ink-Flood Numbered Index List */}
        <div className="flex flex-col border-t border-[var(--line)]">
          {CERTIFICATIONS.map((cert, idx) => (
            <div
              key={cert.id}
              tabIndex={0}
              role="region"
              aria-label={cert.title}
              className="rv group relative py-8 px-6 border-b border-[var(--line)] cursor-pointer transition-colors duration-300 overflow-hidden"
              style={{ "--i": idx } as React.CSSProperties}
            >
              {/* Ink-Flood Background Effect (scaleX 0 -> 1) */}
              <div
                className="absolute inset-0 bg-[var(--ink)] origin-left transform scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                aria-hidden="true"
              />

              {/* Row Content */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-300 group-hover:text-[var(--paper)] group-focus-visible:text-[var(--paper)]">
                <div className="flex items-start gap-6">
                  <span className="font-mono-code text-sm font-bold text-[var(--faint)] group-hover:text-gray-400 group-focus-visible:text-gray-400">
                    {cert.index}
                  </span>

                  <div>
                    <h3 className="font-display text-xl font-bold text-[var(--ink)] group-hover:text-[var(--paper)] group-focus-visible:text-[var(--paper)] mb-1">
                      {cert.title}
                    </h3>
                    <p className="font-mono-code text-xs text-[var(--mute)] group-hover:text-gray-300 group-focus-visible:text-gray-300">
                      {cert.issuer} • {cert.period}
                    </p>
                    <p className="text-xs text-[var(--ink-2)] group-hover:text-gray-200 group-focus-visible:text-gray-200 mt-2 max-w-xl">
                      {cert.details}
                    </p>
                  </div>
                </div>

                {/* Sliding Arrow Icon */}
                <div className="font-mono-code text-lg font-bold transform -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                  ↗
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
