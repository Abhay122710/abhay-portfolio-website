"use client";

import React, { useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const line1 = "Let's build";
  const line2 = "something together.";

  return (
    <footer id="contact" className="w-full pt-24 pb-12 px-4 md:px-8 max-w-[1320px] mx-auto flex flex-col justify-between min-h-[85vh]">
      <div>
        {/* Section Tag */}
        <div className="rv mb-6 font-mono-code text-xs text-[var(--mute)] uppercase tracking-wider">
          07 — Get In Touch
        </div>

        {/* Interactive Letter-Hop Heading */}
        <div className="rv mb-16 select-none">
          <h2 className="text-4xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter leading-none text-[var(--ink)]">
            <span className="block mb-2">
              {line1.split("").map((char, idx) => (
                <span
                  key={idx}
                  className="inline-block hover:-translate-y-4 hover:scale-110 transition-transform duration-300 ease-out cursor-default"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            <span className="block">
              {line2.split("").map((char, idx) => (
                <span
                  key={idx}
                  className="inline-block hover:-translate-y-4 hover:scale-110 transition-transform duration-300 ease-out cursor-default text-[var(--mute)] hover:text-[var(--ink)]"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h2>
        </div>

        {/* Email Copy Area + Circular Badge */}
        <div className="rv grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center pb-16 border-b border-[var(--line)]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              className="font-display font-bold text-2xl sm:text-4xl text-[var(--ink)] underline hover:text-[var(--mute)] transition-colors duration-200"
            >
              {PROFILE.email}
            </a>

            {/* Copy Button */}
            <button
              onClick={handleCopyEmail}
              aria-live="polite"
              className="btn-secondary text-xs px-4 py-2 font-mono-code"
            >
              {copied ? "Copied ✓" : "Copy email 📋"}
            </button>
          </div>

          {/* Circular "Say Hello" Spinning Text Badge */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg
              className="w-full h-full animate-[spin_12s_linear_infinite]"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text className="font-mono-code text-[11px] uppercase fill-[var(--ink)] tracking-widest font-semibold">
                <textPath href="#circlePath" startOffset="0%">
                  • SAY HELLO • GET IN TOUCH • LET&apos;S CONNECT
                </textPath>
              </text>
            </svg>
            <div className="absolute w-8 h-8 rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center font-mono-code text-xs font-bold">
              ⚡
            </div>
          </div>
        </div>

        {/* Social Links & Direct Tel */}
        <div className="rv grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 font-mono-code text-xs border-b border-[var(--line)]">
          <div>
            <span className="text-[var(--mute)] block mb-1">PHONE</span>
            <a href={PROFILE.phoneHref} className="text-[var(--ink)] hover:underline font-medium">
              {PROFILE.phone}
            </a>
          </div>
          <div>
            <span className="text-[var(--mute)] block mb-1">GITHUB</span>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-[var(--ink)] hover:underline font-medium">
              github.com/abhay122710 ↗
            </a>
          </div>
          <div>
            <span className="text-[var(--mute)] block mb-1">LINKEDIN</span>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--ink)] hover:underline font-medium">
              linkedin.com/in/abhay5100 ↗
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Line */}
      <div className="rv pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-code text-xs text-[var(--mute)]">
        <div>
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </div>

        <button
          onClick={() => scrollToTarget("#hero")}
          className="hover:text-[var(--ink)] underline cursor-pointer"
        >
          Back to top ↑
        </button>

        <div>
          Built with Next.js 15 & Tailwind CSS 4
        </div>
      </div>
    </footer>
  );
};
