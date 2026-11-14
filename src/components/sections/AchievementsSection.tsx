"use client";

import React, { useState } from "react";
import { CERTIFICATES, CertificateItem, SubCertificate } from "@/lib/data";

export const AchievementsSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>("google");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll("#achievements .rv");
      els.forEach((el) => el.classList.add("is-in"));
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="achievements"
      className="w-full bg-[var(--card)] py-24 border-y border-[var(--line)] my-16"
    >
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 items-start">
        
        {/* Left Sticky Column */}
        <div className="rv lg:sticky lg:top-28">
          <div className="font-mono-code text-xs text-[var(--mute)] uppercase tracking-wider mb-4">
            06 — Accomplishments & Certifications
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-[var(--ink)] mb-4">
            Always <span className="font-serif-italic text-[var(--mute)]">learning.</span>
          </h2>

          <p className="font-mono-code text-xs text-[var(--mute)] mb-6">
            Total active accreditations: 5
          </p>

          <div className="hidden lg:block p-5 rounded-2xl bg-[var(--paper)] border border-[var(--line)]">
            <span className="font-mono-code text-[11px] text-[var(--mute)] uppercase tracking-wider block mb-2">
              Credential Verification
            </span>
            <p className="text-xs text-[var(--ink-2)] leading-relaxed">
              All credentials are authentic, verified through official issuer programs, and viewable as authorized PDF documents.
            </p>
          </div>
        </div>

        {/* Right Ink-Flood Numbered Index List */}
        <div className="flex flex-col border-t border-[var(--line)]">
          {CERTIFICATES.map((item, idx) => {
            const hasSubCerts = Boolean(item.subCertificates && item.subCertificates.length > 0);
            const isExpanded = expandedId === item.id;

            // Multi-certificate item (e.g., Google with Google AI and Google UX Design)
            if (hasSubCerts) {
              return (
                <div
                  key={item.id}
                  className="rv border-b border-[var(--line)] transition-all duration-300"
                  style={{ "--i": idx } as React.CSSProperties}
                >
                  {/* Google Header Row */}
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    aria-label={`${item.title} — Click to ${isExpanded ? "collapse" : "view all certificates"}`}
                    onClick={() => toggleExpand(item.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleExpand(item.id);
                      }
                    }}
                    className="group relative py-8 px-6 cursor-pointer transition-colors duration-300 overflow-hidden select-none"
                  >
                    {/* Ink-Flood Background Effect */}
                    <div
                      className={`absolute inset-0 bg-[var(--ink)] origin-left transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isExpanded
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      }`}
                      aria-hidden="true"
                    />

                    {/* Row Content */}
                    <div
                      className={`relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-300 ${
                        isExpanded
                          ? "text-[var(--paper)]"
                          : "group-hover:text-[var(--paper)] group-focus-visible:text-[var(--paper)]"
                      }`}
                    >
                      <div className="flex items-start gap-6">
                        <span
                          className={`font-mono-code text-sm font-bold transition-colors ${
                            isExpanded ? "text-gray-400" : "text-[var(--faint)] group-hover:text-gray-400"
                          }`}
                        >
                          {item.index}
                        </span>

                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3
                              className={`font-display text-xl font-bold transition-colors ${
                                isExpanded ? "text-[var(--paper)]" : "text-[var(--ink)] group-hover:text-[var(--paper)]"
                              }`}
                            >
                              {item.title}
                            </h3>
                            <span
                              className={`font-mono-code text-[11px] px-2.5 py-0.5 rounded-full border transition-all ${
                                isExpanded
                                  ? "bg-white/10 text-gray-200 border-white/20"
                                  : "bg-[var(--soft)] text-[var(--ink-2)] border-[var(--line)] group-hover:bg-white/10 group-hover:text-gray-200 group-hover:border-white/20"
                              }`}
                            >
                              {item.subCertificates?.length} Certificates
                            </span>
                          </div>

                          <p
                            className={`font-mono-code text-xs transition-colors ${
                              isExpanded ? "text-gray-300" : "text-[var(--mute)] group-hover:text-gray-300"
                            }`}
                          >
                            {item.issuer} • {item.period}
                          </p>
                          <p
                            className={`text-xs mt-2 max-w-xl transition-colors ${
                              isExpanded ? "text-gray-200" : "text-[var(--ink-2)] group-hover:text-gray-200"
                            }`}
                          >
                            {item.details}
                          </p>
                        </div>
                      </div>

                      {/* Right Indicator: Chevron + Arrow */}
                      <div className="flex items-center gap-3 sm:self-center self-end">
                        <span
                          className={`font-mono-code text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-2 ${
                            isExpanded
                              ? "bg-white/15 text-white border-white/30"
                              : "border-transparent text-[var(--mute)] group-hover:border-white/30 group-hover:text-white"
                          }`}
                        >
                          {isExpanded ? "Hide Certificates" : "Click to View"}
                          <span
                            className={`inline-block transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : "rotate-0"
                            }`}
                          >
                            ▼
                          </span>
                        </span>
                        <div
                          className={`font-mono-code text-lg font-bold transition-all duration-300 ${
                            isExpanded
                              ? "translate-x-0 opacity-100 text-white"
                              : "transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          }`}
                        >
                          ↗
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Sub-Certificates List */}
                  {isExpanded && (
                    <div className="px-6 pb-8 pt-2 bg-[var(--soft)]/40 border-t border-[var(--line)]">
                      <div className="font-mono-code text-[11px] text-[var(--mute)] uppercase tracking-wider mb-4 px-1 flex items-center gap-2">
                        <span>Google Certified Specializations</span>
                        <span className="w-8 h-[1px] bg-[var(--line)]" />
                        <span className="text-[10px] text-[var(--ink-2)]">Click any certificate to open verified PDF</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {item.subCertificates?.map((sub: SubCertificate, sIdx: number) => (
                          <a
                            key={sub.id}
                            href={sub.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${sub.name} Certificate PDF`}
                            className="group/sub relative p-6 rounded-2xl bg-[var(--card)] border border-[var(--line)] hover:border-[var(--ink)] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
                          >
                            {/* Accent highlight bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--ink)] transform scale-x-0 group-hover/sub:scale-x-100 transition-transform duration-300 origin-left" />

                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <span className="font-mono-code text-xs font-bold text-[var(--mute)] group-hover/sub:text-[var(--ink)]">
                                  0{idx + 1}.{sIdx + 1}
                                </span>
                                <span className="font-mono-code text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-[var(--soft)] text-[var(--ink-2)] border border-[var(--line)]">
                                  Verified PDF
                                </span>
                              </div>

                              <h4 className="font-display text-xl font-bold text-[var(--ink)] group-hover/sub:text-[var(--ink)] mb-2 flex items-center justify-between">
                                <span>{sub.name}</span>
                              </h4>

                              <p className="text-xs text-[var(--ink-2)] leading-relaxed mb-6">
                                {sub.details}
                              </p>
                            </div>

                            <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between font-mono-code text-xs text-[var(--ink)] font-bold">
                              <span className="group-hover/sub:underline flex items-center gap-1.5">
                                View Certificate PDF
                              </span>
                              <span className="text-base transform transition-transform duration-200 group-hover/sub:translate-x-1 group-hover/sub:-translate-y-0.5">
                                ↗
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // Single-certificate items (PwC, IBM, Scrimba)
            return (
              <a
                key={item.id}
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
                aria-label={`${item.title} Certificate PDF`}
                className="rv group relative py-8 px-6 border-b border-[var(--line)] cursor-pointer transition-colors duration-300 overflow-hidden block"
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
                      {item.index}
                    </span>

                    <div>
                      <h3 className="font-display text-xl font-bold text-[var(--ink)] group-hover:text-[var(--paper)] group-focus-visible:text-[var(--paper)] mb-1">
                        {item.title}
                      </h3>
                      <p className="font-mono-code text-xs text-[var(--mute)] group-hover:text-gray-300 group-focus-visible:text-gray-300">
                        {item.issuer} • {item.period}
                      </p>
                      <p className="text-xs text-[var(--ink-2)] group-hover:text-gray-200 group-focus-visible:text-gray-200 mt-2 max-w-xl">
                        {item.details}
                      </p>
                    </div>
                  </div>

                  {/* Sliding Arrow Icon */}
                  <div className="font-mono-code text-lg font-bold transform -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 self-end sm:self-center">
                    ↗
                  </div>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
