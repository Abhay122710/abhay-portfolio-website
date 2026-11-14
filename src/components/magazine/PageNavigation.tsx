"use client";

import React from "react";
import Link from "next/link";
import { PORTFOLIO_MAIN_URL } from "@/lib/magazineData";

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onOpenTOC: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onOpenTOC,
  isFullscreen,
  onToggleFullscreen,
}) => {
  return (
    <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 sm:gap-3 px-4 py-2.5 rounded-full bg-[#16181D]/90 backdrop-blur-md border border-[#2D3139] text-[#F8FAFC] shadow-2xl font-mono-code text-xs">
      {/* Back to Portfolio */}
      <Link
        href={PORTFOLIO_MAIN_URL}
        className="px-3 py-1.5 rounded-full bg-[#242830] hover:bg-[#333844] text-[#E2E8F0] hover:text-white transition-colors flex items-center gap-1.5"
        title="Return to main portfolio"
      >
        <span>←</span>
        <span className="hidden sm:inline">Portfolio</span>
      </Link>

      <div className="h-4 w-px bg-[#2D3139]" />

      {/* Prev Page */}
      <button
        onClick={onPrevPage}
        disabled={currentPage === 0}
        className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-[#242830] hover:bg-[#38BDF8] hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        aria-label="Previous page"
      >
        ◄ Prev
      </button>

      {/* Page Indicator */}
      <button
        onClick={onOpenTOC}
        className="px-3 py-1.5 rounded-full bg-[#0F172A] border border-[#2D3139] hover:border-[#38BDF8] text-[#38BDF8] font-bold transition-all cursor-pointer"
        title="Open Table of Contents"
      >
        <span>{currentPage + 1} / {totalPages}</span>
      </button>

      {/* Next Page */}
      <button
        onClick={onNextPage}
        disabled={currentPage >= totalPages - 1}
        className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-[#242830] hover:bg-[#38BDF8] hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        aria-label="Next page"
      >
        Next ►
      </button>

      <div className="h-4 w-px bg-[#2D3139]" />

      {/* Table of Contents Button */}
      <button
        onClick={onOpenTOC}
        className="px-3 py-1.5 rounded-full bg-[#242830] hover:bg-[#333844] text-[#E2E8F0] transition-colors cursor-pointer"
        title="View Table of Contents"
      >
        <span className="hidden sm:inline">TOC</span>
        <span className="sm:hidden">≡</span>
      </button>

      {/* Fullscreen Toggle */}
      <button
        onClick={onToggleFullscreen}
        className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-[#242830] hover:bg-[#333844] text-[#E2E8F0] transition-colors cursor-pointer"
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        {isFullscreen ? "⤓ Exit" : "⤢ Full"}
      </button>
    </footer>
  );
};
