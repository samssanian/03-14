import { useEffect, useState } from 'react';
import { Language, UI_COPY } from '../data/storyData';
import { audioEngine } from '../utils/audioEngine';

interface NavbarProps {
  language: Language;
  onRestart: () => void;
  onToggleAudio: () => void;
  audioPlaying: boolean;
}

export default function Navbar({
  language,
  onRestart,
  onToggleAudio,
  audioPlaying,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkHover = () => {
    audioEngine.playHoverSfx();
  };

  const handleLinkClick = () => {
    audioEngine.playClickSfx();
    audioEngine.startAmbientOnFirstInteraction();
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.55)]'
          : 'bg-gradient-to-b from-[#0a0a0f]/85 to-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-14 md:h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#hero"
          onMouseEnter={handleLinkHover}
          onClick={handleLinkClick}
          className="inline-flex items-center gap-2.5 text-white hover:text-[#ff2d55] transition-colors whitespace-nowrap shrink-0 py-2"
        >
          <span className="text-xl leading-none text-[#ff2d55]" aria-hidden="true">
            ∞
          </span>
          <span className="font-bebas text-xl sm:text-2xl tracking-[0.14em] leading-none">
            SAMS SANIAN
          </span>
        </a>

        {/* Zone 2: Clean single-line nav links */}
        <nav
          aria-label="Primary navigation"
          className={`hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300 ${
            language === 'bn' ? 'font-hind' : 'font-inter'
          }`}
        >
          <a
            href="#story"
            onMouseEnter={handleLinkHover}
            onClick={handleLinkClick}
            className="relative py-1 hover:text-white transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#ff2d55] hover:after:w-full after:transition-all after:duration-200"
          >
            {UI_COPY.navStory[language]}
          </a>
          <a
            href="#gallery"
            onMouseEnter={handleLinkHover}
            onClick={handleLinkClick}
            className="relative py-1 hover:text-white transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#00f0ff] hover:after:w-full after:transition-all after:duration-200"
          >
            {UI_COPY.navGallery[language]}
          </a>
          <button
            type="button"
            onMouseEnter={handleLinkHover}
            onClick={() => {
              audioEngine.playClickSfx();
              onToggleAudio();
            }}
            className="relative py-1 hover:text-white transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#7b2ff7] hover:after:w-full after:transition-all after:duration-200"
          >
            {audioPlaying ? UI_COPY.audioOn[language] : UI_COPY.audioMuted[language]}
          </button>
          <a
            href="#loop-end"
            onMouseEnter={handleLinkHover}
            onClick={handleLinkClick}
            className="relative py-1 hover:text-white transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#ff2d55] hover:after:w-full after:transition-all after:duration-200"
          >
            {UI_COPY.navLoop[language]}
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onMouseEnter={handleLinkHover}
            onClick={() => {
              audioEngine.playClickSfx();
              onRestart();
            }}
            className={`min-h-[40px] px-4 py-2 text-xs font-medium tracking-wider uppercase text-white bg-white/5 hover:bg-[#ff2d55]/20 border border-white/15 hover:border-[#ff2d55]/60 rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 ${
              language === 'bn' ? 'font-hind' : 'font-inter'
            }`}
          >
            {UI_COPY.restart[language]}
          </button>
        </div>
      </div>
    </header>
  );
}
