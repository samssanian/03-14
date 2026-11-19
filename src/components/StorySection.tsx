import { Fragment, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language, STORY_CHAPTERS } from '../data/storyData';

gsap.registerPlugin(ScrollTrigger);

interface StorySectionProps {
  language: Language;
}

function renderHighlightedProse(text: string) {
  // Highlight both English ("loop", "himself") and Bangla ("লুপ", "নিজেকেই") motifs
  const tokens = text.split(/(\bloop\b|\bhimself\b|লুপ|নিজেকেই)/gi);
  return tokens.map((token, idx) => {
    const lower = token.toLowerCase();
    if (lower === 'loop' || token === 'লুপ') {
      return (
        <span key={idx} className="loop-word">
          {token}
        </span>
      );
    }
    if (lower === 'himself' || token === 'নিজেকেই') {
      return (
        <span key={idx} className="himself-word" data-text={token}>
          {token}
        </span>
      );
    }
    return <Fragment key={idx}>{token}</Fragment>;
  });
}

export default function StorySection({ language }: StorySectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        isMobileMotion: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { isDesktop } = context.conditions as {
          isDesktop: boolean;
          isMobileMotion: boolean;
        };

        if (isDesktop) {
          const parallaxBgs = gsap.utils.toArray<HTMLElement>('.chapter-parallax-bg', container);
          parallaxBgs.forEach((bg) => {
            const parentSection = bg.closest('.story-chapter-section');
            if (!parentSection) return;
            gsap.fromTo(
              bg,
              { yPercent: -10, scale: 1.12 },
              {
                yPercent: 10,
                scale: 1.12,
                ease: 'none',
                scrollTrigger: {
                  trigger: parentSection,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            );
          });
        }

        const revealItems = gsap.utils.toArray<HTMLElement>('.story-reveal-item', container);
        revealItems.forEach((el) => {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              y: 26,
              filter: isDesktop ? 'blur(7px)' : 'blur(0px)',
            },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 86%',
                end: 'top 58%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    );

    return () => {
      mm.revert();
    };
  }, [language]);

  return (
    <section
      id="story"
      ref={containerRef}
      aria-label={language === 'bn' ? 'পাঁচ অধ্যায়ের বাংলা থ্রিলার গল্প' : 'Five-chapter thriller story'}
      className="relative bg-[#0a0a0f]"
    >
      {STORY_CHAPTERS.map((chapter, chIdx) => {
        const hasFailed = Boolean(failedImages[chapter.id]);
        const accentColor =
          chIdx % 3 === 0
            ? 'from-[#ff2d55]/10'
            : chIdx % 3 === 1
              ? 'from-[#00f0ff]/10'
              : 'from-[#7b2ff7]/12';

        return (
          <article
            key={chapter.id}
            className="story-chapter-section relative min-h-[100svh] w-full overflow-hidden border-t border-white/8"
          >
            {/* Parallax Background Photo + Atmospheric Spotlight */}
            <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
              {!hasFailed ? (
                <img
                  src={chapter.image}
                  alt={chapter.imageAlt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() =>
                    setFailedImages((prev) => ({
                      ...prev,
                      [chapter.id]: true,
                    }))
                  }
                  className="chapter-parallax-bg w-full h-full object-cover object-center opacity-40 will-change-transform"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#0a0a0f] via-[#1a0b16] to-[#0a111a]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f]/72 to-[#0a0a0f]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/95 via-[#0a0a0f]/68 to-[#0a0a0f]/85" />
              <div
                className={`absolute inset-0 bg-radial ${accentColor} via-transparent to-transparent opacity-80`}
              />
            </div>

            {/* Chapter Content */}
            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-12 py-24 sm:py-32">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                {/* Sticky Chapter Number Column */}
                <div className="lg:col-span-4 lg:sticky lg:top-28">
                  <div className="flex items-baseline gap-4 lg:block">
                    <span className="font-bebas text-7xl sm:text-8xl lg:text-[7.5rem] leading-none tracking-tight text-[#ff2d55]/90 drop-shadow-[0_0_24px_rgba(255,45,85,0.28)] tabular-nums select-none">
                      {chapter.number}
                    </span>
                    <div className="lg:mt-4">
                      <div
                        className={`flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-zinc-400 tabular-nums ${
                          language === 'bn' ? 'font-hind tracking-[0.06em]' : 'font-inter'
                        }`}
                      >
                        <span>{chapter.timestamp}</span>
                        <span aria-hidden="true">·</span>
                        <span>{chapter.location[language]}</span>
                      </div>
                      <h2
                        lang={language}
                        className={`mt-2 text-white text-balance ${
                          language === 'bn'
                            ? 'font-hind font-semibold text-2xl sm:text-3xl leading-snug'
                            : 'font-bebas text-3xl sm:text-4xl tracking-[0.06em]'
                        }`}
                      >
                        {chapter.title[language]}
                      </h2>
                      <div className="hidden lg:block mt-5 h-[1px] w-16 bg-gradient-to-r from-[#ff2d55] via-[#7b2ff7] to-transparent" />
                    </div>
                  </div>
                </div>

                {/* Narrative Prose Column */}
                <div className="lg:col-span-8 space-y-8" lang={language}>
                  <blockquote
                    className={`story-reveal-item pb-6 border-b border-white/10 text-xl sm:text-2xl leading-relaxed text-[#00f0ff]/90 ${
                      language === 'bn' ? 'font-hind font-medium' : 'font-playfair italic'
                    }`}
                  >
                    {chapter.quote[language]}
                  </blockquote>

                  <div className="space-y-6">
                    {chapter.paragraphs[language].map((para, idx) => (
                      <p
                        key={idx}
                        className={`story-reveal-item font-hind text-[1.0625rem] sm:text-lg leading-[1.92] text-zinc-200 tracking-[0.01em] max-w-[68ch] will-change-transform`}
                      >
                        {renderHighlightedProse(para)}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
