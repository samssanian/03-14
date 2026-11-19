import { RotateCcw } from 'lucide-react';
import { Language, UI_COPY } from '../data/storyData';
import { audioEngine } from '../utils/audioEngine';

interface LoopEasterEggProps {
  language: Language;
  loopCount: number;
  onTriggerLoop: () => void;
}

export default function LoopEasterEgg({
  language,
  loopCount,
  onTriggerLoop,
}: LoopEasterEggProps) {
  return (
    <section
      id="loop-end"
      aria-label="Loop reset threshold"
      className="relative py-28 sm:py-36 px-4 sm:px-6 bg-[#0a0a0f] border-t border-white/10 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,45,85,0.14)_0%,rgba(123,47,247,0.08)_35%,transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center flex flex-col items-center" lang={language}>
        <div
          aria-hidden="true"
          className="font-inter text-7xl sm:text-8xl font-light text-[#ff2d55] animate-pulse-infinity select-none leading-none"
        >
          ∞
        </div>

        <p
          className={`mt-6 text-xs tracking-[0.2em] uppercase text-zinc-400 tabular-nums ${
            language === 'bn' ? 'font-hind tracking-[0.06em]' : 'font-inter'
          }`}
        >
          {UI_COPY.cycleComplete[language]} · #{loopCount} · 03:14 AM
        </p>

        <h2
          className={`mt-4 text-2xl sm:text-3xl md:text-4xl text-zinc-100 leading-snug text-balance ${
            language === 'bn' ? 'font-hind font-semibold' : 'font-playfair italic'
          }`}
        >
          {UI_COPY.loopEndHeading[language]}
        </h2>

        <button
          type="button"
          onMouseEnter={() => audioEngine.playHoverSfx()}
          onClick={() => {
            audioEngine.playGlitchSfx();
            onTriggerLoop();
          }}
          className={`mt-10 group inline-flex items-center gap-3 min-h-[48px] py-3.5 px-7 rounded-xl bg-white/6 hover:bg-[#ff2d55]/20 backdrop-blur-md border border-white/15 hover:border-[#ff2d55]/75 text-sm sm:text-base font-medium text-white shadow-[0_0_28px_rgba(255,45,85,0.18)] hover:shadow-[0_0_40px_rgba(255,45,85,0.45)] transition-all duration-200 ${
            language === 'bn' ? 'font-hind' : 'font-inter'
          }`}
        >
          <RotateCcw
            className="w-4 h-4 text-[#00f0ff] transition-transform duration-300 group-hover:-rotate-180"
            aria-hidden="true"
          />
          <span>{UI_COPY.loopEndButton[language]}</span>
        </button>
      </div>
    </section>
  );
}
