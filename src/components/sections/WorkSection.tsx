"use client";

import React, { useState } from "react";
import { PROJECTS, ProjectItem } from "@/lib/data";
import { TechLogo } from "@/components/TechLogo";

export const WorkSection: React.FC = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);

  return (
    <section id="work" className="py-24 px-4 md:px-8 max-w-[1320px] mx-auto">
      {/* Section Header */}
      <div className="rv mb-4 font-mono-code text-xs text-[var(--mute)] uppercase tracking-wider">
        03 — Selected Work
      </div>

      <h2 className="rv text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[var(--ink)] mb-12">
        Things I&apos;ve <span className="font-serif-italic text-[var(--mute)]">built.</span>
      </h2>

      {/* Desktop Expanding Accordion Gallery (Side-by-side flex layout) */}
      <div className="rv hidden lg:flex gap-4 h-[570px] w-full items-stretch">
        {PROJECTS.map((project, idx) => {
          const isOpen = activeProjectIndex === idx;

          return (
            <div
              key={project.id}
              onClick={() => setActiveProjectIndex(idx)}
              onMouseEnter={() => setActiveProjectIndex(idx)}
              onFocus={() => setActiveProjectIndex(idx)}
              tabIndex={0}
              role="button"
              aria-expanded={isOpen}
              aria-label={`Project panel ${project.title}`}
              className={`relative hairline-card overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen
                  ? "flex-[8] bg-[var(--card)] cursor-default p-6 lg:p-7"
                  : "flex-[1] bg-[var(--paper)] hover:bg-[var(--card)] cursor-pointer p-6 flex flex-col justify-between items-center"
              }`}
            >
              {isOpen ? (
                /* OPEN PANEL LAYOUT */
                <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch overflow-hidden">
                  {/* Left Side: Info & Details */}
                  <div className="flex flex-col justify-between h-full overflow-hidden">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 font-mono-code text-[11px] text-[var(--mute)]">
                        <span className="px-2 py-0.5 rounded bg-[var(--ink)] text-[var(--paper)] font-bold text-[10px]">
                          {project.index}
                        </span>
                        <span>{project.kicker}</span>
                        <span>•</span>
                        <span>{project.badgeText}</span>
                      </div>

                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-[var(--ink)] mb-2 tracking-tight">
                        {project.title}
                      </h3>

                      <p className="text-[var(--ink-2)] text-xs lg:text-[13px] leading-relaxed mb-3">
                        {project.description}
                      </p>

                      <div className="mb-3">
                        <span className="font-mono-code text-[10px] font-bold text-[var(--mute)] uppercase block mb-1.5 tracking-wider">
                          Key Systems & Innovations:
                        </span>
                        <ul className="space-y-1.5 text-xs font-mono-code text-[var(--ink-2)]">
                          {project.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2">
                              <span className="text-[var(--ink)] font-bold">•</span>
                              <span className="leading-snug">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-1">
                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-3.5">
                        {project.tech?.map((t, tIdx) => {
                          const logoKey = t.toLowerCase().replace(/[^a-z0-9]/g, "");
                          return (
                            <span
                              key={tIdx}
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--soft)] font-mono-code text-[10px] text-[var(--ink)]"
                            >
                              <TechLogo logoKey={logoKey} name={t} size={13} />
                              {t}
                            </span>
                          );
                        })}
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex items-center flex-wrap gap-2.5">
                        {project.primaryBtnUrl ? (
                          <a
                            href={project.primaryBtnUrl}
                            className="btn-primary text-xs py-2 px-3.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {project.primaryBtnText || "View Projects ↗"}
                          </a>
                        ) : project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-xs py-2 px-3.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {project.primaryBtnText || "GitHub Code ↗"}
                          </a>
                        ) : null}

                        {project.secondaryBtnUrl ? (
                          <a
                            href={project.secondaryBtnUrl}
                            className="btn-secondary text-xs py-2 px-3.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {project.secondaryBtnText || "Explore Designs ↗"}
                          </a>
                        ) : project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary text-xs py-2 px-3.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {project.secondaryBtnText || "Live Demo ↗"}
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Grayscale Illustrative UI Component */}
                  <div className="relative w-full h-full min-h-[280px] rounded-2xl bg-[var(--soft)]/60 border border-[var(--line)] p-4 flex flex-col justify-between overflow-hidden shadow-inner">
                    <div className="flex items-center justify-between font-mono-code text-[10px] text-[var(--mute)] pb-2 border-b border-[var(--line)]">
                      <span>PROJECT ARCHITECTURE SNAPSHOT</span>
                      <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-700">Illustrative UI</span>
                    </div>

                    {/* Dynamic Mini-UI according to project */}
                    {project.id === "mnemosyne" && (
                      <div className="my-auto space-y-3 font-mono-code text-xs">
                        <div className="bg-[var(--card)] p-3 rounded-xl border border-[var(--line)] shadow-sm">
                          <div className="text-[10px] text-[var(--mute)] mb-1">PROMPT INGESTION & STACKTRACE</div>
                          <div className="text-[var(--ink)] font-semibold">Error: NullPointer in KnowledgeGraph.py:142</div>
                        </div>
                        <div className="flex justify-center">
                          <div className="w-0.5 h-4 bg-[var(--mute)]" />
                        </div>
                        <div className="bg-[var(--ink)] text-[var(--paper)] p-3 rounded-xl shadow-md">
                          <div className="text-[10px] text-gray-400 mb-1">OLLAMA RAG REASONING</div>
                          <div className="text-gray-200 text-[11px]">Matched historical fix from ChromaDB #8492. Applying patch...</div>
                        </div>
                      </div>
                    )}

                    {project.id === "geometry-dash" && (
                      <div className="my-auto relative h-44 w-full bg-[var(--card)] rounded-xl border border-[var(--line)] p-4 flex flex-col justify-between overflow-hidden">
                        <div className="flex justify-between font-mono-code text-[10px] text-[var(--mute)]">
                          <span>MODE: CUBE / GRAVITY INVERTED</span>
                          <span>FPS: 60.0</span>
                        </div>
                        <div className="relative h-20 w-full border-b-2 border-[var(--ink)] flex items-end">
                          {/* Cube Player */}
                          <div className="w-8 h-8 bg-[var(--ink)] rounded-sm text-[var(--paper)] flex items-center justify-center font-bold text-xs animate-bounce ml-8">
                            ▲
                          </div>
                          {/* Obstacles */}
                          <div className="ml-24 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-[var(--ink)]" />
                          <div className="ml-16 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-[var(--ink)]" />
                        </div>
                        <div className="font-mono-code text-[9px] text-[var(--mute)] text-center">
                          C# Raycast Collision Matrix Active
                        </div>
                      </div>
                    )}

                    {project.id === "vendor-plus" && (
                      <div className="my-auto space-y-2 font-mono-code text-xs">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-[var(--card)] p-3 rounded-xl border border-[var(--line)]">
                            <div className="text-[9px] text-[var(--mute)]">REALTIME ORDERS</div>
                            <div className="text-lg font-bold text-[var(--ink)]">1,248</div>
                          </div>
                          <div className="bg-[var(--card)] p-3 rounded-xl border border-[var(--line)]">
                            <div className="text-[9px] text-[var(--mute)]">ML DEMAND INDEX</div>
                            <div className="text-lg font-bold text-[var(--ink)]">+94.2%</div>
                          </div>
                        </div>
                        <div className="bg-[var(--card)] p-3 rounded-xl border border-[var(--line)] flex items-center justify-between">
                          <span className="text-[10px] text-[var(--ink)]">Twilio Order Alert Masked Voice Call</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                      </div>
                    )}

                    {project.id === "my-designs" && (
                      <div className="my-auto space-y-3 font-mono-code text-xs w-full">
                        <div className="bg-[var(--card)] p-3 rounded-xl border border-[var(--line)] shadow-sm space-y-2">
                          <div className="flex items-center justify-between text-[10px] text-[var(--mute)]">
                            <span className="font-bold text-[var(--ink)]">VISUAL ART DIRECTION</span>
                            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 font-semibold dark:text-amber-400">
                              4 DOMAINS
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                            <div className="p-2 rounded bg-[var(--paper)] border border-[var(--line)] flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                              <span className="truncate">Cinematic Posters</span>
                            </div>
                            <div className="p-2 rounded bg-[var(--paper)] border border-[var(--line)] flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                              <span className="truncate">Commercial Ads</span>
                            </div>
                            <div className="p-2 rounded bg-[var(--paper)] border border-[var(--line)] flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                              <span className="truncate">Apparel Graphics</span>
                            </div>
                            <div className="p-2 rounded bg-[var(--paper)] border border-[var(--line)] flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                              <span className="truncate">Brand Identity</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-[var(--ink)] text-[var(--paper)] p-3 rounded-xl shadow-md space-y-2">
                          <div className="flex items-center justify-between text-[10px] text-gray-400">
                            <span>COLOR THEORY & TYPOGRAPHY</span>
                            <span>COMPOSITION</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="h-3 flex-1 rounded bg-slate-900 border border-slate-700"></div>
                            <div className="h-3 flex-1 rounded bg-sky-500"></div>
                            <div className="h-3 flex-1 rounded bg-amber-500"></div>
                            <div className="h-3 flex-1 rounded bg-rose-500"></div>
                            <div className="h-3 flex-1 rounded bg-emerald-500"></div>
                          </div>
                          <div className="text-[10px] text-gray-300 flex justify-between font-mono-code pt-1 border-t border-gray-800">
                            <span>Canva · Adobe Express</span>
                            <span>Figma Mockups</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-2 text-[9px] font-mono-code text-[var(--mute)] text-center border-t border-[var(--line)]">
                      Component Diagram • System State Machine
                    </div>
                  </div>
                </div>
              ) : (
                /* FOLDED SLIM SPINE LAYOUT */
                <>
                  <span className="font-mono-code text-xs font-bold text-[var(--ink)]">
                    {project.index}
                  </span>

                  <span
                    className="font-display font-bold text-lg text-[var(--ink)] tracking-tight uppercase writing-mode-vertical rotate-180 my-auto"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    {project.title}
                  </span>

                  <div className="w-9 h-9 rounded-full bg-[var(--card)] border border-[var(--line)] flex items-center justify-center font-mono-code text-sm text-[var(--ink)] transition-transform duration-300 group-hover:rotate-90">
                    +
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Vertical Accordion Stack */}
      <div className="flex flex-col gap-4 lg:hidden">
        {PROJECTS.map((project, idx) => {
          const isOpen = activeProjectIndex === idx;

          return (
            <div
              key={project.id}
              onClick={() => setActiveProjectIndex(idx)}
              className="hairline-card p-6 flex flex-col gap-4 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-xs font-bold text-[var(--mute)]">
                  {project.index} — {project.kicker}
                </span>
                <span className="font-mono-code text-xs font-bold text-[var(--ink)]">
                  {isOpen ? "−" : "+"}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-[var(--ink)]">
                {project.title}
              </h3>

              {isOpen && (
                <div className="space-y-4 pt-4 border-t border-[var(--line)]">
                  <p className="text-[var(--ink-2)] text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <ul className="space-y-1.5 font-mono-code text-xs text-[var(--mute)]">
                    {project.features.map((feat, fIdx) => (
                      <li key={fIdx}>• {feat}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.primaryBtnUrl ? (
                      <a href={project.primaryBtnUrl} className="btn-primary text-xs" onClick={(e) => e.stopPropagation()}>
                        {project.primaryBtnText || "View Projects ↗"}
                      </a>
                    ) : project.githubUrl ? (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs" onClick={(e) => e.stopPropagation()}>
                        {project.primaryBtnText || "GitHub Code ↗"}
                      </a>
                    ) : null}

                    {project.secondaryBtnUrl ? (
                      <a href={project.secondaryBtnUrl} className="btn-secondary text-xs" onClick={(e) => e.stopPropagation()}>
                        {project.secondaryBtnText || "Explore Designs ↗"}
                      </a>
                    ) : project.liveUrl ? (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs" onClick={(e) => e.stopPropagation()}>
                        {project.secondaryBtnText || "Live Demo ↗"}
                      </a>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
