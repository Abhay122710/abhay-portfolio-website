"use client";

import React from "react";
import { MAGAZINE_PAGES } from "@/lib/magazineData";

interface TableOfContentsProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPage: (pageIndex: number) => void;
  currentPage: number;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  isOpen,
  onClose,
  onSelectPage,
  currentPage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-opacity">
      <div className="relative w-full max-w-lg bg-[#141519] border border-[#2D3139] rounded-2xl shadow-2xl p-6 text-[#F8FAFC]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2D3139] mb-4">
          <div>
            <h3 className="font-serif text-2xl font-bold">THE CREATIVE EDITION</h3>
            <span className="font-mono-code text-xs text-[#94A3B8]">Table of Contents</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#242830] hover:bg-[#333844] flex items-center justify-center font-mono-code text-sm transition-colors cursor-pointer"
            aria-label="Close table of contents"
          >
            ✕
          </button>
        </div>

        {/* Page List */}
        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1 font-mono-code text-xs">
          {MAGAZINE_PAGES.map((page, idx) => {
            const isActive = currentPage === idx;
            return (
              <button
                key={page.id}
                onClick={() => {
                  onSelectPage(idx);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left cursor-pointer ${
                  isActive
                    ? "bg-[#38BDF8]/10 border-[#38BDF8] text-[#38BDF8] font-bold"
                    : "bg-[#1C1F26] border-[#2D3139] text-[#E2E8F0] hover:bg-[#282D37] hover:border-gray-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#0F172A] text-[#94A3B8] text-[10px] font-bold">
                    P.{String(page.pageNumber).padStart(2, "0")}
                  </span>
                  <span className="truncate max-w-[240px]">{page.title}</span>
                </div>
                <span className="text-[10px] text-[#64748B] uppercase">
                  {page.type}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-[#2D3139] mt-4 flex justify-between items-center font-mono-code text-[11px] text-[#64748B]">
          <span>Use ← → keys or swipe to flip pages</span>
          <button
            onClick={onClose}
            className="text-[#38BDF8] hover:underline cursor-pointer"
          >
            Back to Reading
          </button>
        </div>
      </div>
    </div>
  );
};
