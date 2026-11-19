import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
}

const TARGET_TEXT = 'Loading the loop...';

export default function Preloader({ onComplete }: PreloaderProps) {
  const [typedText, setTypedText] = useState('');
  const [fading, setFading] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setTypedText(TARGET_TEXT);
      const fadeTimer = window.setTimeout(() => setFading(true), 250);
      const doneTimer = window.setTimeout(() => {
        setUnmounted(true);
        onComplete?.();
      }, 600);
      return () => {
        window.clearTimeout(fadeTimer);
        window.clearTimeout(doneTimer);
      };
    }

    let charIdx = 0;
    const typeInterval = window.setInterval(() => {
      charIdx += 1;
      setTypedText(TARGET_TEXT.slice(0, charIdx));
      if (charIdx >= TARGET_TEXT.length) {
        window.clearInterval(typeInterval);
      }
    }, 55);

    const fadeTimer = window.setTimeout(() => {
      setFading(true);
    }, 1500);

    const doneTimer = window.setTimeout(() => {
      setUnmounted(true);
      onComplete?.();
    }, 1850);

    return () => {
      window.clearInterval(typeInterval);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (unmounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Write Made by Sams Sanian"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0f] transition-opacity duration-350 ease-out ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center gap-5 px-6 text-center">
        <div
          className="font-anton text-6xl sm:text-7xl tracking-[0.18em] text-white animate-glitch-text select-none"
          aria-hidden="true"
        >
          SAMS
        </div>
        <p className="font-inter text-xs sm:text-sm tracking-[0.28em] uppercase text-zinc-300 min-h-[1.25rem]">
          {typedText}
          <span className="inline-block w-1.5 h-3.5 ml-1 align-middle bg-[#ff2d55] animate-pulse" aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}
