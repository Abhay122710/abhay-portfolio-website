"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import { MagazinePageData, MAGAZINE_PAGES, PORTFOLIO_MAIN_URL } from "@/lib/magazineData";

interface MagazinePageProps {
  page: MagazinePageData;
  totalPages: number;
  onNavigateToPage?: (pageIndex: number) => void;
  onBackToPortfolio?: () => void;
}

export const MagazinePage = forwardRef<HTMLDivElement, MagazinePageProps>(
  ({ page, totalPages, onNavigateToPage, onBackToPortfolio }, ref) => {
    const isEven = page.pageNumber % 2 === 0;

    return (
      <div
        ref={ref}
        className="magazine-page relative w-full h-full bg-[#FAF9F5] text-[#1A1A1A] flex flex-col justify-between p-6 sm:p-8 md:p-10 select-none overflow-hidden border border-[#E5E2D9] shadow-md"
        style={{
          boxShadow: isEven
            ? "inset -12px 0 18px -8px rgba(0, 0, 0, 0.12)"
            : "inset 12px 0 18px -8px rgba(0, 0, 0, 0.12)",
        }}
      >
        {/* Paper subtle grain overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.025] pointer-events-none" />

        {/* Page Top Header Bar (omitted on front & back covers) */}
        {page.type !== "cover" && page.type !== "back-cover" && (
          <header className="relative z-10 flex items-center justify-between pb-3 border-b border-[#E0DCD3] font-mono-code text-[10px] text-[#78716C] tracking-wider uppercase">
            <span>THE CREATIVE EDITION • ISSUE 01</span>
            <span>{page.category || page.title || "GALLERY"}</span>
          </header>
        )}

        {/* Page Body Content */}
        <main className="relative z-10 my-auto flex-1 flex flex-col justify-center py-4 overflow-y-auto">
          {/* FRONT COVER */}
          {page.type === "cover" && (
            <div className="w-full h-full flex flex-col justify-between items-center text-center p-2 sm:p-4">
              <div className="w-full border-b-2 border-[#1A1A1A] pb-4">
                <span className="font-mono-code text-xs font-bold tracking-widest text-[#78716C] block mb-1">
                  {page.issueText}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-[#1A1A1A] uppercase">
                  {page.title}
                </h1>
                <p className="font-display text-xs sm:text-sm text-[#57534E] tracking-widest uppercase mt-1">
                  {page.subtitle}
                </p>
              </div>

              {page.image && (
                <div className="relative w-full h-[55%] my-4 rounded border border-[#D6D3CD] shadow-lg overflow-hidden bg-[#111]">
                  <Image
                    src={page.image}
                    alt={page.title || "Cover Artwork"}
                    fill
                    className="object-contain p-2"
                    unoptimized
                    priority
                  />
                </div>
              )}

              <div className="w-full pt-3 border-t border-[#E5E2D9] flex justify-between items-center font-mono-code text-[10px] text-[#78716C]">
                <span>ART DIRECTION & DESIGN</span>
                <span>BY ABHAY CHAUDHARY</span>
              </div>
            </div>
          )}

          {/* INTRO SPREAD */}
          {page.type === "intro" && (
            <div className="w-full max-w-md mx-auto space-y-6">
              <div className="border-b border-[#D6D3CD] pb-4">
                <span className="font-mono-code text-xs text-[#78716C] uppercase tracking-widest">
                  EDITORIAL FOREWORD
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mt-1">
                  {page.title}
                </h2>
                <p className="text-xs text-[#78716C] italic mt-1">{page.subtitle}</p>
              </div>

              {page.analysisText?.map((paragraph, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-[#3C3836] leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {page.quote && (
                <blockquote className="p-4 rounded bg-[#F2EFEE] border-l-4 border-[#1A1A1A] font-serif italic text-xs text-[#292524]">
                  {page.quote}
                </blockquote>
              )}
            </div>
          )}

          {/* TABLE OF CONTENTS */}
          {page.type === "toc" && (
            <div className="w-full max-w-md mx-auto space-y-6">
              <div className="border-b border-[#D6D3CD] pb-3">
                <h2 className="font-serif text-3xl font-bold text-[#1A1A1A]">{page.title}</h2>
                <p className="text-xs text-[#78716C] uppercase tracking-wider mt-1">{page.subtitle}</p>
              </div>

              <div className="space-y-3 font-mono-code text-xs">
                {MAGAZINE_PAGES.filter(p => p.type !== 'intro' && p.type !== 'toc').map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigateToPage?.(item.pageNumber - 1)}
                    className="w-full flex items-center justify-between p-2.5 rounded hover:bg-[#EFECE6] border border-transparent hover:border-[#D6D3CD] transition-all text-left group cursor-pointer"
                  >
                    <span className="font-bold text-[#1A1A1A] group-hover:text-[#8B0000] truncate max-w-[220px]">
                      {item.title}
                    </span>
                    <span className="text-[#A8A29E] group-hover:text-[#1A1A1A]">
                      PAGE {String(item.pageNumber).padStart(2, '0')} ↗
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ARTWORK SPREAD */}
          {page.type === "artwork" && (
            <div className="w-full h-full flex flex-col justify-between items-center text-center">
              <div className="mb-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                  {page.title}
                </h3>
                <span className="font-mono-code text-[11px] text-[#78716C] uppercase">
                  {page.category}
                </span>
              </div>

              {page.image && (
                <div className="relative w-full flex-1 min-h-[300px] rounded border border-[#D6D3CD] shadow-sm overflow-hidden bg-[#0A0A0C]">
                  <Image
                    src={page.image}
                    alt={page.title || "Artwork Presentation"}
                    fill
                    className="object-contain p-3"
                    unoptimized
                  />
                </div>
              )}
            </div>
          )}

          {/* ANALYSIS SPREAD */}
          {page.type === "analysis" && (
            <div className="w-full max-w-md mx-auto space-y-5">
              <div>
                <span className="font-mono-code text-xs text-[#78716C] uppercase tracking-wider block">
                  {page.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-1">
                  {page.title}
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#3C3836] leading-relaxed">
                {page.analysisText?.map((pText, idx) => (
                  <p key={idx}>{pText}</p>
                ))}
              </div>

              {page.keyElements && (
                <div className="pt-3 border-t border-[#E5E2D9]">
                  <span className="font-mono-code text-[10px] text-[#78716C] font-bold uppercase block mb-2">
                    KEY DESIGN BREAKDOWN:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono-code text-[11px] text-[#292524]">
                    {page.keyElements.map((elem, eIdx) => (
                      <li key={eIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
                        <span>{elem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {page.colorPalette && (
                <div className="pt-3 border-t border-[#E5E2D9]">
                  <span className="font-mono-code text-[10px] text-[#78716C] font-bold uppercase block mb-1.5">
                    CURATED COLOR PALETTE:
                  </span>
                  <div className="flex items-center gap-2">
                    {page.colorPalette.map((hex, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-1 font-mono-code text-[10px]">
                        <span className="w-4 h-4 rounded border border-[#D6D3CD]" style={{ backgroundColor: hex }} />
                        <span>{hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* APPAREL SPREAD */}
          {page.type === "apparel" && (
            <div className="w-full h-full flex flex-col justify-between space-y-4">
              <div className="border-b border-[#D6D3CD] pb-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                  {page.title}
                </h3>
                <p className="text-xs font-mono-code text-[#78716C]">{page.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 min-h-[260px]">
                {page.image && (
                  <div className="relative w-full h-full rounded border border-[#D6D3CD] bg-[#111] overflow-hidden">
                    <Image
                      src={page.image}
                      alt="Apparel Mockup 1"
                      fill
                      className="object-contain p-2"
                      unoptimized
                    />
                  </div>
                )}
                {page.secondaryImage && (
                  <div className="relative w-full h-full rounded border border-[#D6D3CD] bg-[#111] overflow-hidden">
                    <Image
                      src={page.secondaryImage}
                      alt="Apparel Mockup 2"
                      fill
                      className="object-contain p-2"
                      unoptimized
                    />
                  </div>
                )}
              </div>

              {page.analysisText && (
                <p className="font-mono-code text-xs text-[#57534E] leading-relaxed pt-2 border-t border-[#E5E2D9]">
                  {page.analysisText[0]}
                </p>
              )}
            </div>
          )}

          {/* COMMERCIAL ADS SPREAD */}
          {page.type === "commercial" && (
            <div className="w-full h-full flex flex-col justify-between space-y-3">
              <div className="border-b border-[#D6D3CD] pb-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                  {page.title}
                </h3>
                <p className="text-xs font-mono-code text-[#78716C]">{page.subtitle}</p>
              </div>

              <div className={`grid ${page.secondaryImage ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"} gap-3 flex-1 min-h-[260px]`}>
                {page.image && (
                  <div className="relative w-full h-full rounded border border-[#D6D3CD] bg-[#0C0D10] overflow-hidden">
                    <Image
                      src={page.image}
                      alt={page.title || "Commercial Ad"}
                      fill
                      className="object-contain p-2"
                      unoptimized
                    />
                  </div>
                )}
                {page.secondaryImage && (
                  <div className="relative w-full h-full rounded border border-[#D6D3CD] bg-[#0C0D10] overflow-hidden">
                    <Image
                      src={page.secondaryImage}
                      alt="Secondary Ad"
                      fill
                      className="object-contain p-2"
                      unoptimized
                    />
                  </div>
                )}
              </div>

              {page.keyElements && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E5E2D9] font-mono-code text-[10px]">
                  {page.keyElements.map((k, kIdx) => (
                    <span key={kIdx} className="px-2 py-0.5 rounded bg-[#EFECE6] text-[#292524] border border-[#D6D3CD]">
                      • {k}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* BACK COVER */}
          {page.type === "back-cover" && (
            <div className="w-full h-full flex flex-col justify-between items-center text-center p-4">
              <div className="w-full border-b-2 border-[#1A1A1A] pb-4">
                <h2 className="font-serif text-3xl font-extrabold text-[#1A1A1A]">
                  {page.title}
                </h2>
                <p className="font-mono-code text-xs text-[#78716C] uppercase mt-1">
                  {page.subtitle}
                </p>
              </div>

              <div className="my-auto space-y-4 max-w-sm">
                <p className="font-serif italic text-sm text-[#44403C]">
                  {page.quote}
                </p>
                {page.analysisText?.map((text, tIdx) => (
                  <p key={tIdx} className="font-mono-code text-xs text-[#78716C]">
                    {text}
                  </p>
                ))}
              </div>

              <div className="w-full pt-4 border-t border-[#E5E2D9] flex flex-col gap-3 items-center">
                {onBackToPortfolio ? (
                  <button
                    onClick={onBackToPortfolio}
                    className="px-5 py-2 rounded-full bg-[#1A1A1A] text-[#FAF9F5] font-mono-code text-xs font-bold hover:bg-[#333] transition-colors cursor-pointer"
                  >
                    ← BACK TO MAIN PORTFOLIO
                  </button>
                ) : (
                  <a
                    href={PORTFOLIO_MAIN_URL}
                    className="px-5 py-2 rounded-full bg-[#1A1A1A] text-[#FAF9F5] font-mono-code text-xs font-bold hover:bg-[#333] transition-colors"
                  >
                    ← BACK TO MAIN PORTFOLIO
                  </a>
                )}
                <span className="font-mono-code text-[10px] text-[#A8A29E]">
                  © 2026 Abhay Chaudhary. All Rights Reserved.
                </span>
              </div>
            </div>
          )}
        </main>

        {/* Page Footer Navigation Bar */}
        <footer className="relative z-10 flex items-center justify-between pt-3 border-t border-[#E0DCD3] font-mono-code text-[10px] text-[#78716C]">
          <span>
            {page.type === "cover" ? "FRONT COVER" : page.type === "back-cover" ? "BACK COVER" : `PAGE ${page.pageNumber}`}
          </span>
          <span>{page.pageNumber} / {totalPages}</span>
        </footer>
      </div>
    );
  }
);

MagazinePage.displayName = "MagazinePage";
