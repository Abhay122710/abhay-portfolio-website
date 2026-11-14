"use client";

import React from "react";
import Image from "next/image";

interface TechLogoProps {
  logoKey: string;
  name: string;
  size?: number;
  className?: string;
}

export function isBrand(key: string): boolean {
  const conceptKeys = [
    "concept-navmesh",
    "navmesh",
    "concept-raycast",
    "raycasting",
    "concept-physics",
    "physicsengine",
    "concept-cognee",
    "cognee",
    "concept-kg",
    "knowledgegraph",
    "concept-ollama",
    "ollama",
    "concept-ml",
    "machinelearning",
    "concept-vectordb",
    "chromadb",
    "concept-twilio",
    "twilio",
    "typography",
    "artdirection",
    "visualcomposition",
    "brandidentity",
    "advertising",
    "appareldesign",
    "mockupdesign",
    "c",
  ];
  return !conceptKeys.includes(key);
}

export const TechLogo: React.FC<TechLogoProps> = ({
  logoKey,
  name,
  size = 32,
  className = "",
}) => {
  // Brand SVGs stored in public/logos/
  if (isBrand(logoKey)) {
    // Map custom key overrides if any
    let svgName = logoKey;
    if (logoKey === "cplusplus") svgName = "cplusplus";
    if (logoKey === "csharp") svgName = "csharp";
    if (logoKey === "unity" || logoKey === "unity3d") svgName = "unity";
    if (logoKey === "react" || logoKey === "reactjs") svgName = "react";
    if (logoKey === "githooks") svgName = "git";
    if (logoKey === "photoshop") svgName = "photoshop";
    if (logoKey === "illustrator") svgName = "illustrator";
    if (logoKey === "canva") svgName = "canva";
    if (logoKey === "adobeexpress" || logoKey === "adobe-express" || logoKey === "express") svgName = "adobeexpress";

    return (
      <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <Image
          src={`/logos/${svgName}.svg`}
          alt={`${name} logo`}
          width={size}
          height={size}
          className="object-contain w-full h-full"
          unoptimized
        />
      </div>
    );
  }

  // Custom minimalist line icons for computer science & domain concepts
  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-[var(--soft)]/50 text-[var(--ink)] ${className}`}
      style={{ width: size, height: size }}
      aria-label={name}
    >
      <svg
        width={size * 0.65}
        height={size * 0.65}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {(logoKey === "concept-navmesh" || logoKey === "navmesh") && (
          <>
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </>
        )}
        {(logoKey === "concept-raycast" || logoKey === "raycasting") && (
          <>
            <circle cx="6" cy="12" r="3" />
            <path d="M9 12h12M17 8l4 4-4 4" />
          </>
        )}
        {(logoKey === "concept-physics" || logoKey === "physicsengine") && (
          <>
            <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(30 12 12)" />
            <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)" />
            <circle cx="12" cy="12" r="2.5" fill="currentColor" />
          </>
        )}
        {(logoKey === "concept-cognee" || logoKey === "cognee") && (
          <>
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </>
        )}
        {(logoKey === "concept-kg" || logoKey === "knowledgegraph") && (
          <>
            <circle cx="6" cy="6" r="3" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="12" cy="18" r="3" />
            <line x1="8.5" y1="7.5" x2="15.5" y2="7.5" />
            <line x1="7.5" y1="8.5" x2="10.5" y2="15.5" />
            <line x1="16.5" y1="8.5" x2="13.5" y2="15.5" />
          </>
        )}
        {(logoKey === "concept-ollama" || logoKey === "ollama") && (
          <>
            <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4 21l3.5-1.1c1.37.7 2.9 1.1 4.5 1.1 4.97 0 9-4.03 9-9s-4.03-9-9-9z" />
            <circle cx="9" cy="11" r="1.5" fill="currentColor" />
            <circle cx="15" cy="11" r="1.5" fill="currentColor" />
          </>
        )}
        {(logoKey === "concept-ml" || logoKey === "machinelearning") && (
          <>
            <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
            <path d="M12 12L2.5 7.5" />
            <path d="M12 12v10" />
          </>
        )}
        {(logoKey === "concept-vectordb" || logoKey === "chromadb") && (
          <>
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
          </>
        )}
        {(logoKey === "concept-twilio" || logoKey === "twilio") && (
          <>
            <circle cx="12" cy="12" r="9" />
            <circle cx="9" cy="9" r="2" fill="currentColor" />
            <circle cx="15" cy="9" r="2" fill="currentColor" />
            <circle cx="9" cy="15" r="2" fill="currentColor" />
            <circle cx="15" cy="15" r="2" fill="currentColor" />
          </>
        )}
        {logoKey === "typography" && (
          <>
            <path d="M4 7V4h16v3M9 20h6M12 4v16" />
          </>
        )}
        {logoKey === "artdirection" && (
          <>
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.74 1.7-1.67 0-.43-.17-.83-.46-1.13-.29-.3-.46-.7-.46-1.13 0-.92.75-1.67 1.67-1.67h1.67c2.92 0 5.38-2.46 5.38-5.38C21.5 6.5 17.21 2 12 2z" />
          </>
        )}
        {logoKey === "visualcomposition" && (
          <>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <line x1="15" y1="3" x2="15" y2="21" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
          </>
        )}
        {logoKey === "brandidentity" && (
          <>
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
            <polygon points="12 6 17 9.5 17 14.5 12 18 7 14.5 7 9.5 12 6" />
          </>
        )}
        {logoKey === "advertising" && (
          <>
            <path d="M3 11l18-5v12L3 13v-2z" />
            <path d="M11.6 16.8L9 22" />
          </>
        )}
        {logoKey === "appareldesign" && (
          <>
            <path d="M20.38 3.46L16 2l-4 3-4-3-4.38 1.46a2 2 0 0 0-1.34 1.72L2 10.5 6 12v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9l4-1.5- cocktail 1.72a2 2 0 0 0-1.34-1.72z" />
          </>
        )}
        {logoKey === "mockupdesign" && (
          <>
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </>
        )}
      </svg>
    </div>
  );
};

