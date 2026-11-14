"use client";

import React, { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(true);

  // Video autoplay & unlock sound on initial interaction
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt audio unmuted play first
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlayingSound(true);
          setAutoplayBlocked(false);
        })
        .catch(() => {
          // Autoplay blocked: play muted and set blocked state
          video.muted = true;
          video.play().catch(() => {});
          setIsPlayingSound(false);
          setAutoplayBlocked(true);
        });
    }

    // Unlock sound on first user gesture
    const unlockSound = () => {
      if (video) {
        video.muted = false;
        video
          .play()
          .then(() => {
            setIsPlayingSound(true);
            setAutoplayBlocked(false);
          })
          .catch(() => {});
      }
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
    };

    window.addEventListener("pointerdown", unlockSound, { once: true });
    window.addEventListener("keydown", unlockSound, { once: true });
    window.addEventListener("touchend", unlockSound, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
    };
  }, []);

  // IntersectionObserver to pause video when <35% visible
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.35) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.35, 1.0] }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted || !isPlayingSound) {
      video.muted = false;
      video
        .play()
        .then(() => {
          setIsPlayingSound(true);
          setAutoplayBlocked(false);
        })
        .catch(() => {});
    } else {
      video.muted = true;
      setIsPlayingSound(false);
    }
  };

  // Offscreen canvas reference for frame processing
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Real-time canvas rendering with white studio background removal
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    if (!offscreenRef.current) {
      offscreenRef.current = document.createElement("canvas");
    }
    const offscreen = offscreenRef.current;
    const offscreenCtx = offscreen.getContext("2d", { willReadFrequently: true });
    if (!offscreenCtx) return;

    let animId: number;

    const renderFrame = () => {
      if (!video.paused && !video.ended) {
        const w = video.videoWidth || 768;
        const h = video.videoHeight || 960;

        if (w > 0 && h > 0) {
          if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
            offscreen.width = w;
            offscreen.height = h;
          }

          // Draw frame to offscreen canvas
          offscreenCtx.drawImage(video, 0, 0, w, h);
          const frameData = offscreenCtx.getImageData(0, 0, w, h);
          const data = frameData.data;
          const len = data.length;

          // Studio White Background Chroma Key & Anti-Aliasing
          for (let i = 0; i < len; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const minC = Math.min(r, g, b);
            const maxC = Math.max(r, g, b);
            const diff = maxC - minC;

            if (minC > 230 && diff < 18) {
              data[i + 3] = 0; // 100% transparent background
            } else if (minC > 195 && diff < 22) {
              // Smooth feathered anti-aliasing on edge pixels
              const alphaFactor = (230 - minC) / 35;
              data[i + 3] = Math.round(data[i + 3] * Math.max(0, Math.min(1, alphaFactor)));
            }
          }

          ctx.putImageData(frameData, 0, 0);
        }
      }

      animId = requestAnimationFrame(renderFrame);
    };

    animId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-24 pb-12 px-4 md:px-8 overflow-hidden select-none"
    >
      {/* Background Ghost Word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <span
          className="font-display font-black text-[22vw] leading-none uppercase tracking-tighter text-transparent select-none opacity-20"
          style={{ WebkitTextStroke: "2px var(--ink)" }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* Main Video Presentation */}
      <div className="relative z-10 mx-auto w-full max-w-[768px] flex-1 flex flex-col items-center justify-center">
        <div
          className="relative w-full max-h-[min(96svh,1040px)] h-[62svh] md:h-[84svh] flex justify-center items-center overflow-hidden"
          style={{ aspectRatio: "768 / 960" }}
        >
          {/* Hidden Video Source */}
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            className="hidden"
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>

          {/* Canvas with Transparent Background Removal */}
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain transition-opacity duration-700 pointer-events-none"
          />

          {/* Sound Toggle Floating Button */}
          <div className="absolute bottom-6 right-6 z-20">
            <button
              onClick={toggleSound}
              aria-label={isPlayingSound ? "Pause intro voice audio" : "Play intro voice audio"}
              className="relative w-[46px] h-[46px] rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              {autoplayBlocked && (
                <span className="absolute inset-0 rounded-full animate-ping bg-[var(--ink)] opacity-30 pointer-events-none" />
              )}
              {isPlayingSound ? (
                <span className="text-sm font-mono-code font-bold tracking-tighter">❚❚</span>
              ) : (
                <span className="text-xs font-mono-code font-bold pl-0.5">▶</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Bottom Content & CTAs */}
      <div className="relative z-20 max-w-[1320px] w-full mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 pt-6 border-t border-[var(--line)]">
        <div>
          <span className="font-mono-code text-xs uppercase tracking-widest text-[var(--mute)] block mb-2">
            00 — {PROFILE.tagline}
          </span>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-[var(--ink)] leading-none">
            {PROFILE.role}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => scrollToTarget("#work")} className="btn-primary">
            Explore work ↗
          </button>
          <button onClick={() => scrollToTarget("#contact")} className="btn-secondary">
            Let&apos;s talk
          </button>
          <a
            href={PROFILE.resumePath}
            download="Abhay_Chaudhary_Resume.pdf"
            className="btn-secondary flex items-center gap-1.5"
            aria-label="Download PDF Résumé"
          >
            Résumé ↓
          </a>
        </div>
      </div>
    </section>
  );
};
