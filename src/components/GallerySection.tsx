import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Expand } from 'lucide-react';
import { GALLERY_FRAMES, GalleryFrame, Language, UI_COPY } from '../data/storyData';
import { audioEngine } from '../utils/audioEngine';

gsap.registerPlugin(ScrollTrigger);

interface GallerySectionProps {
  language: Language;
}

export default function GallerySection({ language }: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<GalleryFrame | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const getScrollAmount = () => {
        const totalWidth = track.scrollWidth;
        return -(totalWidth - window.innerWidth + 64);
      };

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(track.scrollWidth - window.innerWidth, 900)}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  useEffect(() => {
    if (!selectedFrame) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedFrame(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedFrame]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      aria-label="Evidence gallery of the time loop"
      className="relative bg-[#0a0a0f] border-t border-white/10 py-20 md:py-0 md:min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Section Header */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12 mb-8 md:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p
              lang={language}
              className={`text-xs tracking-[0.2em] uppercase text-[#00f0ff] ${
                language === 'bn' ? 'font-hind tracking-[0.06em]' : 'font-inter'
              }`}
            >
              {UI_COPY.galleryKicker[language]}
            </p>
            <h2
              lang={language}
              className={`mt-2 text-white ${
                language === 'bn'
                  ? 'font-hind font-semibold text-3xl sm:text-4xl md:text-5xl'
                  : 'font-bebas text-4xl sm:text-5xl md:text-6xl tracking-[0.06em]'
              }`}
            >
              {UI_COPY.galleryHeading[language]}
            </h2>
          </div>
          <p
            lang={language}
            className={`text-sm sm:text-base text-zinc-400 max-w-sm ${
              language === 'bn' ? 'font-hind' : 'font-playfair italic'
            }`}
          >
            {UI_COPY.galleryLead[language]}
          </p>
        </div>
      </div>

      {/* Desktop GSAP Horizontal Pin Track */}
      <div className="hidden md:block w-full overflow-visible">
        <div ref={trackRef} className="flex items-stretch gap-8 pl-6 lg:pl-12 pr-16 w-max will-change-transform">
          {GALLERY_FRAMES.map((frame) => {
            const hasFailed = Boolean(failedImages[frame.id]);
            return (
              <button
                key={frame.id}
                type="button"
                data-cursor="expand"
                onMouseEnter={() => audioEngine.playHoverSfx()}
                onClick={() => {
                  audioEngine.playClickSfx();
                  setSelectedFrame(frame);
                }}
                className="group relative w-[320px] lg:w-[360px] aspect-[3/4] shrink-0 rounded-2xl overflow-hidden bg-[#12121a] border border-white/10 text-left focus-visible:ring-2 focus-visible:ring-[#00f0ff] shadow-[0_18px_50px_rgba(0,0,0,0.65)]"
              >
                {!hasFailed ? (
                  <img
                    src={frame.image}
                    alt={frame.imageAlt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setFailedImages((prev) => ({ ...prev, [frame.id]: true }))}
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#16101b] to-[#0a0a0f] text-zinc-500 text-sm">
                    {frame.title[language]}
                  </div>
                )}

                {/* Hover Duotone Overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-tr from-[#ff2d55]/55 via-[#7b2ff7]/30 to-[#00f0ff]/45 mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Contrast Scrim */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/35 to-transparent opacity-90"
                />

                {/* Expand Hint */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-[#0a0a0f]/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Expand className="w-4 h-4" aria-hidden="true" />
                </div>

                {/* Metadata & Caption */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6" lang={language}>
                  <div
                    className={`flex items-center gap-2 text-xs tracking-[0.14em] uppercase text-zinc-400 tabular-nums ${
                      language === 'bn' ? 'font-hind tracking-[0.04em]' : 'font-inter'
                    }`}
                  >
                    <span className="text-[#ff2d55] font-medium">{frame.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{frame.timestamp[language]}</span>
                  </div>
                  <h3
                    className={`mt-1.5 text-white ${
                      language === 'bn'
                        ? 'font-hind font-semibold text-xl'
                        : 'font-bebas text-2xl tracking-[0.06em]'
                    }`}
                  >
                    {frame.title[language]}
                  </h3>
                  <p className="mt-1.5 font-hind text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-2">
                    {frame.caption[language]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Scroll-Snap Carousel */}
      <div className="md:hidden w-full overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 flex gap-4">
        {GALLERY_FRAMES.map((frame) => {
          const hasFailed = Boolean(failedImages[frame.id]);
          return (
            <button
              key={frame.id}
              type="button"
              onClick={() => {
                audioEngine.playClickSfx();
                setSelectedFrame(frame);
              }}
              className="group relative w-[78vw] max-w-[310px] aspect-[3/4] shrink-0 snap-center rounded-2xl overflow-hidden bg-[#12121a] border border-white/10 text-left"
            >
              {!hasFailed ? (
                <img
                  src={frame.image}
                  alt={frame.imageAlt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setFailedImages((prev) => ({ ...prev, [frame.id]: true }))}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#16101b] to-[#0a0a0f] text-zinc-500 text-sm">
                  {frame.title[language]}
                </div>
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/30 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5" lang={language}>
                <div className="flex items-center gap-2 text-xs font-hind tracking-[0.06em] uppercase text-zinc-400 tabular-nums">
                  <span className="text-[#ff2d55] font-medium">{frame.index}</span>
                  <span aria-hidden="true">·</span>
                  <span>{frame.timestamp[language]}</span>
                </div>
                <h3
                  className={`mt-1 text-white ${
                    language === 'bn'
                      ? 'font-hind font-semibold text-xl'
                      : 'font-bebas text-2xl tracking-[0.06em]'
                  }`}
                >
                  {frame.title[language]}
                </h3>
                <p className="mt-1 font-hind text-xs text-zinc-300 leading-relaxed">
                  {frame.caption[language]}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedFrame && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedFrame.title[language]}
          onClick={() => setSelectedFrame(null)}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 bg-[#0a0a0f]/92 backdrop-blur-lg"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-[#12121a] border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.85)]"
          >
            <button
              type="button"
              onClick={() => {
                audioEngine.playClickSfx();
                setSelectedFrame(null);
              }}
              aria-label="Close photograph viewer"
              className="absolute top-4 right-4 z-10 w-11 h-11 rounded-xl bg-[#0a0a0f]/75 hover:bg-[#ff2d55] border border-white/15 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch" lang={language}>
              <div className="md:col-span-7 bg-[#07070b] max-h-[65vh] md:max-h-[75vh] overflow-hidden">
                <img
                  src={selectedFrame.image}
                  alt={selectedFrame.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-xs tracking-[0.14em] uppercase text-zinc-400 tabular-nums">
                    <span className="text-[#ff2d55] font-medium">#{selectedFrame.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedFrame.timestamp[language]}</span>
                  </div>
                  <h3
                    className={`mt-3 text-white ${
                      language === 'bn'
                        ? 'font-hind font-semibold text-2xl sm:text-3xl'
                        : 'font-bebas text-3xl sm:text-4xl tracking-[0.06em]'
                    }`}
                  >
                    {selectedFrame.title[language]}
                  </h3>
                  <p className="mt-4 font-hind text-base leading-relaxed text-zinc-300">
                    {selectedFrame.caption[language]}
                  </p>
                </div>
                <p
                  className={`text-xs text-zinc-500 ${
                    language === 'bn' ? 'font-hind' : 'font-playfair italic'
                  }`}
                >
                  {UI_COPY.galleryModalHint[language]}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
