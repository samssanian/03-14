import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { HERO_BACKDROP, Language, UI_COPY } from '../data/storyData';
import { audioEngine } from '../utils/audioEngine';
import LanguageToggle from './LanguageToggle';

interface HeroProps {
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  loopCount: number;
  hasLooped: boolean;
  onEnterLoop: () => void;
}

function AnimatedLetters({
  text,
  baseDelay = 0,
  className = '',
}: {
  text: string;
  baseDelay?: number;
  className?: string;
}) {
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {text.split('').map((char, idx) => (
        <span
          key={`${text}-${idx}`}
          aria-hidden="true"
          style={{
            animationDelay: `${baseDelay + idx * 35}ms`,
          }}
          className="inline-block opacity-0 translate-y-4 animate-[letterRise_0.55s_cubic-bezier(0.16,1,0.3,1)_forwards]"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero({
  language,
  onChangeLanguage,
  loopCount,
  hasLooped,
  onEnterLoop,
}: HeroProps) {
  const fullSubtitle = hasLooped
    ? UI_COPY.heroSubtitleLooped[language]
    : UI_COPY.heroSubtitleDefault[language];

  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [imgError, setImgError] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${6 + ((i * 19) % 88)}%`,
        top: `${38 + ((i * 23) % 56)}%`,
        size: i % 3 === 0 ? 3 : 2,
        dur: `${9 + (i % 6) * 2}s`,
        delay: `${(i % 5) * 1.4}s`,
        driftX: `${(i % 2 === 0 ? 1 : -1) * (16 + (i % 4) * 10)}px`,
        color: i % 4 === 0 ? '#ff2d55' : i % 3 === 0 ? '#00f0ff' : '#d4d4d8',
      })),
    []
  );

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setTypedSubtitle(fullSubtitle);
      return;
    }

    setTypedSubtitle('');
    let idx = 0;
    let intervalId = 0;
    const startDelay = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        idx += 1;
        setTypedSubtitle(fullSubtitle.slice(0, idx));
        if (idx >= fullSubtitle.length) {
          window.clearInterval(intervalId);
        }
      }, 24);
    }, hasLooped ? 160 : 500);

    return () => {
      window.clearTimeout(startDelay);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [fullSubtitle, hasLooped]);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#0a0a0f] pt-24 pb-10 px-4 sm:px-6 lg:px-12"
    >
      <style>{`
        @keyframes letterRise {
          0% {
            opacity: 0;
            transform: translate3d(0, 18px, 0);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            filter: blur(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          span[style*="animationDelay"] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Background road with Ken Burns zoom + atmospheric color wash */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {!imgError ? (
          <img
            src={HERO_BACKDROP.image}
            alt={HERO_BACKDROP.alt}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center animate-ken-burns opacity-75"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0a0a0f] via-[#170914] to-[#08131a]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/82 via-[#0a0a0f]/45 to-[#0a0a0f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/90 via-[#0a0a0f]/40 to-[#0a0a0f]/60" />
        {/* Subtle crimson & cyan atmospheric glow orbs */}
        <div className="absolute -bottom-32 -left-20 w-[460px] h-[460px] rounded-full bg-[#ff2d55]/12 blur-[120px]" />
        <div className="absolute top-1/4 -right-24 w-[420px] h-[420px] rounded-full bg-[#00f0ff]/10 blur-[120px]" />
      </div>

      {/* Desktop-only floating particles */}
      <div
        className="hidden md:block absolute inset-0 z-10 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {particles.map((p) => (
          <span
            key={p.id}
            style={
              {
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                animationDelay: p.delay,
                '--dur': p.dur,
                '--drift-x': p.driftX,
              } as React.CSSProperties
            }
            className="absolute rounded-full opacity-0 animate-particle blur-[0.5px]"
          />
        ))}
      </div>

      <div className="h-4" aria-hidden="true" />

      {/* Center Hero Typography */}
      <div className="relative z-20 mx-auto w-full max-w-6xl my-auto py-8">
        <div className="max-w-4xl">
          <div
            className={`flex flex-wrap items-center gap-3 text-xs tracking-[0.18em] uppercase text-zinc-400 mb-5 tabular-nums ${
              language === 'bn' ? 'font-hind' : 'font-inter'
            }`}
          >
            <span>{UI_COPY.kicker[language]}</span>
            {loopCount > 1 && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#ff2d55] font-medium">
                  {language === 'bn' ? `চক্র #${loopCount}` : `Loop #${loopCount}`}
                </span>
              </>
            )}
          </div>

          <h1 className="flex flex-col gap-1 sm:gap-2 uppercase select-none">
            <span className="font-bebas text-[clamp(3.1rem,8.5vw,6.4rem)] leading-[0.88] tracking-[0.06em] text-zinc-100">
              <AnimatedLetters text="WRITE" baseDelay={180} />
            </span>
            <span className="font-bebas text-[clamp(2.6rem,7vw,5.2rem)] leading-[0.9] tracking-[0.08em] text-zinc-400">
              <AnimatedLetters text="MADE BY" baseDelay={380} />
            </span>
            <span className="font-anton text-[clamp(3.3rem,9.5vw,7.2rem)] leading-[0.92] tracking-[0.03em] text-white drop-shadow-[0_0_32px_rgba(255,45,85,0.32)]">
              <AnimatedLetters text="SAMS SANIAN" baseDelay={600} />
            </span>
          </h1>

          <p
            aria-live="polite"
            lang={language}
            className={`mt-6 max-w-xl text-lg sm:text-xl md:text-2xl leading-relaxed min-h-[2.5rem] ${
              language === 'bn' ? 'font-hind font-normal' : 'font-playfair italic'
            } ${hasLooped ? 'text-[#ff2d55]' : 'text-zinc-200'}`}
          >
            {typedSubtitle}
            <span
              className="inline-block w-[2px] h-5 ml-1.5 align-middle bg-[#00f0ff] animate-pulse"
              aria-hidden="true"
            />
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              type="button"
              onMouseEnter={() => audioEngine.playHoverSfx()}
              onClick={() => {
                audioEngine.playClickSfx();
                audioEngine.startAmbientOnFirstInteraction();
                onEnterLoop();
              }}
              className={`group inline-flex items-center gap-3 min-h-[44px] py-3 px-7 rounded-xl bg-white/8 hover:bg-[#ff2d55]/20 backdrop-blur-md border border-white/20 hover:border-[#ff2d55]/70 text-sm sm:text-base font-medium tracking-wide text-white shadow-[0_0_30px_rgba(255,45,85,0.2)] hover:shadow-[0_0_40px_rgba(255,45,85,0.45)] transition-all duration-200 ${
                language === 'bn' ? 'font-hind' : 'font-inter'
              }`}
            >
              <span>{UI_COPY.enterCta[language]}</span>
              <ArrowRight
                className="w-4 h-4 text-[#ff2d55] transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <LanguageToggle language={language} onChange={onChangeLanguage} variant="inline" />
          </div>
        </div>
      </div>

      {/* Bouncing Scroll Indicator */}
      <div className="relative z-20 mx-auto w-full max-w-6xl flex justify-center sm:justify-start">
        <a
          href="#story"
          onMouseEnter={() => audioEngine.playHoverSfx()}
          onClick={() => {
            audioEngine.playClickSfx();
            audioEngine.startAmbientOnFirstInteraction();
          }}
          aria-label="Scroll down to Chapter 1"
          className={`inline-flex items-center gap-2.5 py-2 text-xs tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors ${
            language === 'bn' ? 'font-hind tracking-[0.08em]' : 'font-inter'
          }`}
        >
          <ArrowDown className="w-4 h-4 text-[#00f0ff] animate-scroll-bounce" aria-hidden="true" />
          <span>{UI_COPY.scrollToBegin[language]}</span>
        </a>
      </div>
    </section>
  );
}
