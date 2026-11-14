"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { MAGAZINE_PAGES } from "@/lib/magazineData";
import { MagazinePage } from "./MagazinePage";
import { PageNavigation } from "./PageNavigation";
import { TableOfContents } from "./TableOfContents";

// Dynamically import HTMLFlipBook to ensure SSR compatibility
const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center space-y-4 text-[#F8FAFC] font-mono-code">
      <div className="w-12 h-12 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin" />
      <p className="text-xs uppercase tracking-widest text-[#94A3B8]">Loading THE CREATIVE EDITION...</p>
    </div>
  ),
});

export const MagazineReader: React.FC = () => {
  const flipBookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isTocOpen, setIsTocOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 480,
    height: 640,
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Responsive dimensions handler
  const updateDimensions = useCallback(() => {
    if (typeof window === "undefined") return;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const mobile = screenWidth < 768;
    setIsMobile(mobile);

    if (mobile) {
      const width = Math.min(screenWidth * 0.9, 420);
      const height = Math.min(screenHeight * 0.72, 600);
      setDimensions({ width: Math.floor(width), height: Math.floor(height) });
    } else {
      // 2-page spread on desktop: target aspect ratio ~0.75 per page
      const availableWidth = screenWidth * 0.85;
      const availableHeight = screenHeight * 0.82;
      const targetWidth = Math.min(availableWidth / 2, 540);
      const targetHeight = Math.min(availableHeight, targetWidth / 0.75);

      setDimensions({
        width: Math.floor(targetWidth),
        height: Math.floor(targetHeight),
      });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTocOpen) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        flipBookRef.current?.pageFlip()?.flipNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        flipBookRef.current?.pageFlip()?.flipPrev();
      } else if (e.key === "Escape" && isFullscreen) {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTocOpen, isFullscreen]);

  // Handle page flip events from library
  const onPageFlip = useCallback((e: any) => {
    if (e?.data !== undefined) {
      setCurrentPage(e.data);
    }
  }, []);

  // Jump to specific page
  const handleSelectPage = useCallback((pageIndex: number) => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip()?.flip(pageIndex);
      setCurrentPage(pageIndex);
    }
  }, []);

  // Fullscreen Handler
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  }, []);

  useEffect(() => {
    const handleFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFSChange);
    return () => document.removeEventListener("fullscreenchange", handleFSChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen bg-[#0D0E12] text-[#F8FAFC] flex flex-col justify-between items-center overflow-hidden select-none"
    >
      {/* Top Header Bar */}
      <header className="relative z-30 w-full px-6 py-4 flex items-center justify-between font-mono-code text-xs text-[#94A3B8] border-b border-[#1E222B] bg-[#0D0E12]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] animate-pulse" />
          <span className="font-bold text-white tracking-widest">THE CREATIVE EDITION</span>
          <span className="hidden md:inline text-[#64748B]">• DIGITAL DESIGN MAGAZINE</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsTocOpen(true)}
            className="hover:text-white transition-colors cursor-pointer"
          >
            TABLE OF CONTENTS
          </button>
        </div>
      </header>

      {/* Central Magazine FlipBook Workspace */}
      <main className="relative z-20 flex-1 w-full flex items-center justify-center p-2 sm:p-6 overflow-hidden">
        {/* Subtle radial shadow behind the magazine */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.04)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative shadow-2xl transition-all duration-300">
          {/* @ts-ignore */}
          <HTMLFlipBook
            ref={flipBookRef}
            width={dimensions.width}
            height={dimensions.height}
            size="fixed"
            minWidth={300}
            maxWidth={600}
            minHeight={400}
            maxHeight={800}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            usePortrait={isMobile}
            onFlip={onPageFlip}
            className="magazine-flipbook"
            style={{ margin: "0 auto" }}
            useMouseEvents={true}
            swipeDistance={30}
            clickEventForward={true}
          >
            {MAGAZINE_PAGES.map((page) => (
              <MagazinePage
                key={page.id}
                page={page}
                totalPages={MAGAZINE_PAGES.length}
                onNavigateToPage={handleSelectPage}
              />
            ))}
          </HTMLFlipBook>
        </div>
      </main>

      {/* Page Navigation Toolbar */}
      <PageNavigation
        currentPage={currentPage}
        totalPages={MAGAZINE_PAGES.length}
        onPrevPage={() => flipBookRef.current?.pageFlip()?.flipPrev()}
        onNextPage={() => flipBookRef.current?.pageFlip()?.flipNext()}
        onOpenTOC={() => setIsTocOpen(true)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Table of Contents Drawer Modal */}
      <TableOfContents
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        onSelectPage={handleSelectPage}
        currentPage={currentPage}
      />
    </div>
  );
};
