import React, { useState, useEffect, useRef } from 'react';
import { ImageOff, Loader2 } from 'lucide-react';

/**
 * ProgressiveImage provides lazy loading, intersection observation,
 * an animated progressive shimmer skeleton placeholder, blur-up transition,
 * and graceful fallback on load error.
 */
export const ProgressiveImage = ({
  src,
  alt = 'Product image',
  placeholderSrc,
  className = '',
  imgClassName = '',
  aspectRatio = 'aspect-square',
  objectFit = 'object-contain',
  priority = false, // If true, eager loads immediately
  sizes,
  onLoad
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  // Initialize isInView based on priority or window capabilities
  const [isInView, setIsInView] = useState(() => 
    priority || typeof window === 'undefined' || !('IntersectionObserver' in window)
  );

  const containerRef = useRef(null);

  // Sync state when src changes
  if (prevSrc !== src) {
    setPrevSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }

  // IntersectionObserver for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    if (!('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.01
      }
    );

    const currentElem = containerRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) observer.unobserve(currentElem);
      observer.disconnect();
    };
  }, [priority, isInView]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${aspectRatio} ${className} bg-slate-50`}
    >
      {/* 1. Progressive Shimmer Skeleton Placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 z-0 bg-gradient-to-r from-slate-100 via-slate-200/70 to-slate-100 bg-[length:200%_100%] animate-shimmer flex items-center justify-center"
          aria-hidden="true"
        >
          {placeholderSrc ? (
            <img
              src={placeholderSrc}
              alt=""
              className={`w-full h-full ${objectFit} filter blur-md scale-105 opacity-60 transition-opacity duration-300`}
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-1.5 opacity-40">
              <Loader2 size={18} className="animate-spin text-slate-400" />
            </div>
          )}
        </div>
      )}

      {/* 2. Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-2 text-center select-none">
          <ImageOff size={22} className="stroke-[1.5] mb-1 opacity-60" />
          <span className="text-[10px] font-medium text-slate-500">Image unavailable</span>
        </div>
      )}

      {/* 3. Actual Image with Lazy Loading & Blur-up Crossfade */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
          onLoad={(e) => {
            setIsLoaded(true);
            if (onLoad) onLoad(e);
          }}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
          className={`w-full h-full ${objectFit} transition-all duration-500 ease-out relative z-[1] ${
            isLoaded 
              ? 'opacity-100 blur-0 scale-100' 
              : 'opacity-0 blur-xs scale-95'
          } ${imgClassName}`}
        />
      )}
    </div>
  );
};
