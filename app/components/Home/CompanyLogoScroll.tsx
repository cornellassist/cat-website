"use client";

import React, { useId, useState } from "react";
import Image, { StaticImageData } from "next/image";

export interface Company {
  logo: string | StaticImageData; // URL, path to logo image, or StaticImageData
  name: string; // Company name
  url?: string; // Optional URL for clickable companies
}

interface CompanyLogoScrollProps {
  scrollDirection: "left" | "right";
  companies: Company[];
  speed?: number; // Animation speed in seconds (default: 20)
}

export default function CompanyLogoScroll({
  scrollDirection,
  companies,
  speed = 40, // Slower default speed (higher number = slower)
}: CompanyLogoScrollProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate companies array to create seamless loop
  const duplicatedCompanies = [...companies, ...companies];

  // Generate unique ID for this component instance to avoid CSS class conflicts
  const uniqueId = useId().replace(/:/g, "-");
  const containerClass = `company-scroll-container-${uniqueId}`;
  const pausedClass = `company-scroll-paused-${uniqueId}`;

  // Check if logo is a valid image URL (starts with http/https or /) or StaticImageData
  const getImageSrc = (logo: string | StaticImageData): string => {
    if (typeof logo === 'string') {
      return logo;
    }
    // StaticImageData has a src property
    return logo.src;
  };

  const isImageUrl = (logo: string | StaticImageData): boolean => {
    if (typeof logo !== 'string') {
      return true; // StaticImageData is always valid
    }
    return (
      logo.startsWith("http") || logo.startsWith("/") || logo.startsWith("./")
    );
  };

  // Use reverse animation direction for right scroll
  const animationDirection = scrollDirection === "right" ? "reverse" : "normal";

  return (
    <div
      className="relative w-full overflow-hidden py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .${containerClass} {
          display: flex;
          width: fit-content;
          min-width: 100%;
          animation: scroll ${speed}s linear infinite ${animationDirection};
        }

        .${containerClass}.${pausedClass} {
          animation-play-state: paused;
        }
    
      `}</style>

      <div className={`${containerClass} ${isHovered ? pausedClass : ''}`}>
        {duplicatedCompanies.map((company, index) => {
          const content = (
            <div
              className={`flex items-center gap-4 px-8 min-w-max ${company.url ? 'cursor-pointer' : ''}`}
            >
              {/* Logo */}
              {isImageUrl(company.logo) ? (
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={48}
                  height={48}
                  className="object-contain shrink-0 h-10 w-auto min-h-8"
                  sizes="48px"
                />
              ) : (
                <span className="text-2xl shrink-0">{typeof company.logo === 'string' ? company.logo : ''}</span>
              )}
              {/* Company Name */}
              <span className="text-text-dk-grey text-lg sm:text-xl md:text-2xl whitespace-nowrap">
                {company.name}
              </span>
            </div>
          );

          return company.url ? (
            <a
              key={`${company.name}-${index}`}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.open(company.url, '_blank');
              }}
            >
              {content}
            </a>
          ) : (
            <div key={`${company.name}-${index}`}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
