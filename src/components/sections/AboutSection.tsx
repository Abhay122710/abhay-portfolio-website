"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PROFILE } from "@/lib/data";

export const AboutSection: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [swingAngle, setSwingAngle] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Damped pendulum physics animation state
  const physicsRef = useRef({
    angle: 0,
    velocity: 0,
    targetAngle: 0,
  });

  // Track mouse movement to add pendulum velocity
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const deltaX = e.clientX - centerX;
    // Apply mouse velocity proportional offset
    physicsRef.current.targetAngle = (deltaX / rect.width) * 12; // max ~12deg swing
  };

  const handleMouseLeave = () => {
    physicsRef.current.targetAngle = 0;
  };

  // Spring damping animation loop for pendulum swing
  useEffect(() => {
    let animId: number;

    const animate = () => {
      const p = physicsRef.current;
      // Spring force
      const force = (p.targetAngle - p.angle) * 0.08;
      p.velocity += force;
      p.velocity *= 0.88; // Damping
      p.angle += p.velocity;

      // Idle subtle sway when target is 0
      if (Math.abs(p.targetAngle) < 0.1 && Math.abs(p.velocity) < 0.01) {
        const time = Date.now() * 0.0015;
        setSwingAngle(Math.sin(time) * 1.5);
      } else {
        setSwingAngle(p.angle);
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <section id="about" className="py-24 px-4 md:px-8 max-w-[1320px] mx-auto">
      {/* Section Tag */}
      <div className="rv mb-4 font-mono-code text-xs text-[var(--mute)] uppercase tracking-wider">
        01 — About me
      </div>

      <h2 className="rv text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[var(--ink)] mb-16">
        Architecting intelligent systems. <span className="font-serif-italic text-[var(--mute)]">Quietly.</span>
      </h2>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 items-stretch">
        
        {/* Left Column */}
        <div className="rv flex flex-col justify-between p-8 hairline-card" style={{ "--i": 1 } as React.CSSProperties}>
          <div>
            <h3 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">
              Hi, I&apos;m {PROFILE.name.split(" ")[0]}.
            </h3>
            <p className="text-[var(--ink-2)] leading-relaxed text-sm md:text-base mb-4">
              {PROFILE.resumeSummary}
            </p>
            <p className="text-[var(--mute)] leading-relaxed text-sm">
              {PROFILE.extraBio}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <a href={PROFILE.resumePath} download="Abhay_Chaudhary_Resume.pdf" className="btn-primary text-xs">
              Résumé ↓
            </a>
            {PROFILE.github && (
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs">
                GitHub ↗
              </a>
            )}
            {PROFILE.linkedin && (
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs">
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>

        {/* Centre Column: Hanging Lanyard ID Card */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="rv flex flex-col items-center justify-start relative min-h-[460px]"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {/* Lanyard Strap */}
          <div className="relative w-8 h-16 bg-[var(--ink)] rounded-b-md shadow-md flex flex-col items-center justify-end overflow-hidden z-20">
            <div className="absolute inset-0 flex flex-col items-center animate-[marquee_8s_linear_infinite] opacity-60 text-[9px] font-mono-code text-[var(--paper)]">
              <span>{PROFILE.name.toUpperCase()}</span>
              <span>•</span>
              <span>DEVELOPER</span>
              <span>•</span>
              <span>{PROFILE.name.toUpperCase()}</span>
            </div>
            {/* Metal Clip */}
            <div className="w-5 h-3 bg-gradient-to-b from-gray-400 to-gray-600 rounded-sm mb-1 shadow-inner border border-gray-300" />
          </div>

          {/* Swinging Pendulum Card Wrapper */}
          <div
            className="w-[300px] h-[404px] cursor-pointer focus:outline-none z-10"
            style={{
              transformOrigin: "top center",
              transform: `rotate(${swingAngle}deg)`,
              perspective: "1000px",
            }}
            onClick={() => setIsFlipped(!isFlipped)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label="Developer ID Card. Click or press Enter to flip."
          >
            {/* 3D Flip Container */}
            <div
              className="relative w-full h-full rounded-3xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Card FRONT */}
              <div
                className="absolute inset-0 w-full h-full bg-[var(--card)] rounded-3xl border border-[var(--line)] shadow-xl p-6 flex flex-col justify-between overflow-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                {/* Black Top Band */}
                <div className="bg-[var(--ink)] text-[var(--paper)] text-center py-2 -mx-6 -mt-6 mb-4 flex items-center justify-between px-6">
                  <span className="font-mono-code text-[10px] tracking-widest uppercase">DEVELOPER ID</span>
                  <span className="font-mono-code text-[10px] text-[var(--faint)]">UPES-2026</span>
                </div>

                {/* Photo Portrait */}
                <div className="flex justify-center my-2">
                  <div className="relative w-32 h-36 rounded-2xl p-1 bg-gradient-to-tr from-gray-300 via-gray-100 to-gray-400 shadow-md group overflow-hidden">
                    <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-gray-100">
                      <Image
                        src={PROFILE.portraitBust}
                        alt={PROFILE.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

                {/* Front Info */}
                <div className="text-center mt-1">
                  <h4 className="font-display font-bold text-lg text-[var(--ink)]">{PROFILE.name}</h4>
                  <p className="font-mono-code text-xs text-[var(--mute)]">{PROFILE.role}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-left font-mono-code text-[10px] pt-3 border-t border-[var(--line)]">
                  <div>
                    <span className="text-[var(--faint)] block">ID NO.</span>
                    <span className="text-[var(--ink)] font-semibold">AC-8476-DEV</span>
                  </div>
                  <div>
                    <span className="text-[var(--faint)] block">DEPT.</span>
                    <span className="text-[var(--ink)] font-semibold">CSE Graphics</span>
                  </div>
                  <div>
                    <span className="text-[var(--faint)] block">VALID TILL</span>
                    <span className="text-[var(--ink)] font-semibold">JUN 2026</span>
                  </div>
                  <div>
                    <span className="text-[var(--faint)] block">STATUS</span>
                    <span className="text-[var(--ink)] font-semibold">ACTIVE</span>
                  </div>
                </div>

                {/* Bottom Barcode & Hologram */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex gap-0.5 h-6 opacity-75">
                    {[2, 1, 3, 1, 4, 1, 2, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4].map((w, i) => (
                      <span key={i} className="bg-[var(--ink)] h-full" style={{ width: `${w * 1.5}px` }} />
                    ))}
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-gray-300 via-gray-100 to-gray-400 border border-gray-300 shadow-inner flex items-center justify-center text-[8px] font-mono-code font-bold text-gray-700">
                    ★
                  </div>
                </div>
              </div>

              {/* Card BACK */}
              <div
                className="absolute inset-0 w-full h-full bg-[var(--ink)] text-[var(--paper)] rounded-3xl p-6 flex flex-col justify-between overflow-hidden shadow-xl"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-4">
                    <span className="font-mono-code text-[10px] text-[var(--faint)] uppercase">WHAT I AM</span>
                    <span className="font-mono-code text-[10px] text-gray-400">FLIP ↺</span>
                  </div>

                  <ul className="space-y-2 text-xs font-mono-code leading-relaxed text-gray-300">
                    <li>• {PROFILE.degree}</li>
                    <li>• CGPA: {PROFILE.cgpa}</li>
                    <li>• AI RAG & Unity Physics Systems</li>
                    <li>• Design Head - IEEE & SAE Member</li>
                    <li>• Software Dev Intern - Tribal Fusion</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="font-serif-italic text-lg text-gray-300 mb-1">{PROFILE.name}</div>
                  <p className="font-mono-code text-[9px] text-[var(--faint)]">
                    If found, say hello · {PROFILE.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Facts & Quote */}
        <div className="rv flex flex-col justify-between p-8 hairline-card" style={{ "--i": 3 } as React.CSSProperties}>
          <div>
            <h3 className="font-display text-xl font-bold text-[var(--ink)] mb-6">Quick facts</h3>

            <div className="space-y-4 font-mono-code text-xs">
              <div className="pb-3 border-b border-[var(--line)]">
                <span className="text-[var(--mute)] block mb-1">LOCATION</span>
                <span className="text-[var(--ink)] font-medium">{PROFILE.location}</span>
              </div>
              <div className="pb-3 border-b border-[var(--line)]">
                <span className="text-[var(--mute)] block mb-1">EDUCATION</span>
                <span className="text-[var(--ink)] font-medium">{PROFILE.college}</span>
              </div>
              <div className="pb-3 border-b border-[var(--line)]">
                <span className="text-[var(--mute)] block mb-1">RECENT INTERNSHIP</span>
                <span className="text-[var(--ink)] font-medium">Tribal Fusion R&D LLP</span>
              </div>
              <div>
                <span className="text-[var(--mute)] block mb-1">EMAIL</span>
                <a href={`mailto:${PROFILE.email}`} className="text-[var(--ink)] font-medium underline">
                  {PROFILE.email}
                </a>
              </div>
            </div>
          </div>

          <blockquote className="mt-8 pt-6 border-t border-[var(--line)] italic text-xs text-[var(--mute)] leading-relaxed">
            &ldquo;Building RAG memory systems, physics-driven games, and commerce platforms through rigorous engineering.&rdquo;
          </blockquote>
        </div>

      </div>
    </section>
  );
};
