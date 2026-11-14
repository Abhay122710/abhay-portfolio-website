"use client";

import React, { useState } from "react";
import { SKILL_GROUPS, SkillItem } from "@/lib/data";
import { TechLogo } from "@/components/TechLogo";

export const SkillsSection: React.FC = () => {
  const [activeFamily, setActiveFamily] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILL_GROUPS[0]);

  const families = ["All", "Languages", "Game Dev", "Web & AI", "Databases", "Tools & Frameworks"];

  return (
    <section id="skills" className="py-24 px-4 md:px-8 max-w-[1320px] mx-auto">
      {/* Section Header */}
      <div className="rv mb-4 font-mono-code text-xs text-[var(--mute)] uppercase tracking-wider">
        02 — Technical Skills
      </div>

      <div className="rv flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[var(--ink)]">
          The periodic table of <span className="font-serif-italic text-[var(--mute)]">my stack.</span>
        </h2>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {families.map((fam) => {
            const isActive = activeFamily === fam;
            return (
              <button
                key={fam}
                onClick={() => setActiveFamily(fam)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--ink)] text-[var(--paper)] shadow-sm"
                    : "bg-[var(--soft)] text-[var(--ink-2)] hover:bg-[var(--line)]"
                }`}
              >
                {fam}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid + Sticky Inspector Panel Container */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
        
        {/* Periodic Table 8-Column Grid */}
        <div className="rv grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          {SKILL_GROUPS.map((skill, idx) => {
            const row = Math.floor(idx / 8);
            const col = idx % 8;
            const delay = (row + col) * 40;
            const matchesFilter = activeFamily === "All" || skill.family === activeFamily;
            const isSelected = selectedSkill.id === skill.id;

            return (
              <button
                key={skill.id}
                onMouseEnter={() => setSelectedSkill(skill)}
                onFocus={() => setSelectedSkill(skill)}
                onClick={() => setSelectedSkill(skill)}
                className={`relative aspect-square rounded-2xl p-3 flex flex-col justify-between text-left transition-all duration-300 border ${
                  matchesFilter
                    ? "opacity-100 scale-100 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                    : "opacity-25 grayscale scale-95 pointer-events-none"
                } ${
                  isSelected
                    ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] shadow-md"
                    : "bg-[var(--card)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink)]"
                }`}
                style={{ "--i": idx, animationDelay: `${delay}ms` } as React.CSSProperties}
                aria-label={`Skill tile ${skill.name}`}
              >
                {/* Atomic Number */}
                <span className={`font-mono-code text-[10px] ${isSelected ? "text-gray-400" : "text-[var(--mute)]"}`}>
                  {String(skill.number).padStart(2, "0")}
                </span>

                {/* 2-Letter Symbol */}
                <div className="my-auto text-center">
                  <span className="font-display text-2xl font-extrabold tracking-tight block">
                    {skill.symbol}
                  </span>
                </div>

                {/* Name */}
                <span className={`font-mono-code text-[9px] truncate block ${isSelected ? "text-gray-300" : "text-[var(--ink-2)]"}`}>
                  {skill.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sticky Inspector Panel */}
        <div className="rv lg:sticky lg:top-28 p-8 hairline-card flex flex-col items-center text-center">
          <div className="font-mono-code text-[10px] text-[var(--mute)] uppercase tracking-widest mb-6">
            INSPECTOR PANEL — ATOMIC #{String(selectedSkill.number).padStart(2, "0")}
          </div>

          {/* Large Logo 150px with Pop Animation */}
          <div className="relative w-36 h-36 flex items-center justify-center mb-6 p-4 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-inner transition-transform duration-300 transform hover:scale-105">
            <TechLogo logoKey={selectedSkill.logoKey} name={selectedSkill.name} size={110} />
          </div>

          {/* Skill Title & Family */}
          <h3 className="font-display text-2xl font-bold text-[var(--ink)] mb-1">
            {selectedSkill.name}
          </h3>
          <span className="font-mono-code text-xs px-3 py-1 rounded-full bg-[var(--soft)] text-[var(--ink-2)] mb-6">
            {selectedSkill.family}
          </span>

          {/* Projects Used In */}
          <div className="w-full text-left pt-4 border-t border-[var(--line)]">
            <span className="font-mono-code text-[10px] text-[var(--mute)] block mb-2 uppercase">
              PROJECTS & APPLICATION:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedSkill.projectsUsed.map((proj, i) => (
                <span
                  key={i}
                  className="font-mono-code text-[11px] px-2.5 py-1 rounded-md bg-[var(--ink)] text-[var(--paper)]"
                >
                  {proj}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
