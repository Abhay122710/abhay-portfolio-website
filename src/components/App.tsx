"use client";

import React, { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const App: React.FC = () => {
  // Global IntersectionObserver to reveal .rv elements once on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px 50px 0px",
      }
    );

    const observeAll = () => {
      document.querySelectorAll(".rv:not(.is-in)").forEach((el) => observer.observe(el));
    };

    observeAll();

    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--paper)] text-[var(--ink)] font-display overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <AboutSection />
        <SkillsSection />
        <WorkSection />
        <CertificationsSection />
        <ExperienceSection />
        <AchievementsSection />
      </main>
      <ContactSection />
    </div>
  );
};
