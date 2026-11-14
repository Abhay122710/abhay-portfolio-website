"use client";

import React, { useEffect, useState, useRef } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";
import { useScrollProgress } from "@/lib/hooks";

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  const navRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // Handle scroll detection for nav glass state & name fade out
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section with IntersectionObserver rootMargin: -45% 0px -50% 0px
  useEffect(() => {
    const sectionIds = NAV.map((item) => item.id);
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-45% 0px -50% 0px",
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Update sliding indicator pill position
  useEffect(() => {
    if (!navRef.current) return;
    const activeBtn = navRef.current.querySelector<HTMLButtonElement>(`[data-nav-id="${activeSection}"]`);
    if (activeBtn) {
      setIndicatorStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
      });
    }
  }, [activeSection, scrolled]);

  // Lock body scroll when mobile menu is open & listen for Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    scrollToTarget(`#${id}`, { offset: -80 });
  };

  return (
    <>
      {/* 2px Ink Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[var(--ink)] z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
        aria-hidden="true"
      />

      {/* Main Header Container */}
      <header className="fixed top-4 left-0 right-0 z-40 px-4 md:px-8 pointer-events-none flex justify-center">
        <div className="max-w-[1320px] w-full flex items-center justify-between pointer-events-auto">
          
          {/* Left: Initials mark + Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToTarget("#hero")}
              aria-label="Scroll to Hero top"
              className={`w-11 h-11 rounded-full flex items-center justify-center font-mono-code text-xs font-bold transition-all duration-300 transform hover:rotate-[360deg] ${
                scrolled
                  ? "bg-[var(--ink)] text-[var(--paper)] shadow-md"
                  : "border border-[var(--ink)] text-[var(--ink)] bg-transparent"
              }`}
            >
              {PROFILE.initials}
            </button>

            <span
              className={`font-display text-sm font-semibold tracking-tight transition-opacity duration-300 hidden sm:inline-block ${
                scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {PROFILE.name}
            </span>
          </div>

          {/* Centre/Right: Desktop Nav Links Pill */}
          <nav
            ref={navRef}
            aria-label="Main Navigation"
            className={`hidden md:flex items-center relative p-1.5 rounded-full transition-all duration-300 ${
              scrolled
                ? "bg-[var(--card)]/80 backdrop-blur-md shadow-lg border border-[var(--line)]"
                : "bg-transparent border border-transparent"
            }`}
          >
            {/* Active sliding indicator pill */}
            <div
              className="absolute top-1.5 bottom-1.5 bg-[var(--ink)] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
              }}
              aria-hidden="true"
            />

            {NAV.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  data-nav-id={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative z-10 px-4 py-2 text-xs font-medium tracking-tight rounded-full transition-colors duration-200 ${
                    isActive ? "text-[var(--paper)]" : "text-[var(--ink-2)] hover:text-[var(--ink)]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            className="md:hidden px-4 py-2 rounded-full bg-[var(--card)]/90 backdrop-blur-md border border-[var(--line)] text-xs font-medium text-[var(--ink)] shadow-sm hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            {mobileMenuOpen ? "Close ✕" : "Menu"}
          </button>
        </div>
      </header>

      {/* Mobile Full Screen Overlay Menu */}
      <div
        className={`fixed inset-0 z-50 bg-[var(--paper)] flex flex-col justify-between p-8 md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? "clip-open opacity-100 pointer-events-auto" : "clip-closed opacity-0 pointer-events-none"
        }`}
        style={{
          clipPath: mobileMenuOpen ? "circle(150% at 90% 5%)" : "circle(0% at 90% 5%)",
        }}
      >
        <div className="flex justify-between items-center">
          <span className="font-mono-code text-xs text-[var(--mute)]">00 — Navigation</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center font-mono-code text-sm text-[var(--ink)]"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-6 my-auto">
          {NAV.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="group flex items-baseline gap-4 text-left transition-transform duration-300 hover:translate-x-2"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <span className="font-mono-code text-sm text-[var(--faint)]">0{idx + 1}</span>
              <span className="font-display text-4xl font-bold tracking-tight text-[var(--ink)] group-hover:text-[var(--mute)]">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="pt-6 border-t border-[var(--line)] flex flex-col gap-2 font-mono-code text-xs text-[var(--mute)]">
          <p>{PROFILE.name} — Portfolio</p>
          <a href={`mailto:${PROFILE.email}`} className="underline hover:text-[var(--ink)]">
            {PROFILE.email}
          </a>
        </div>
      </div>
    </>
  );
};
