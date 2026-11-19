import { Language, UI_COPY } from '../data/storyData';
import { audioEngine } from '../utils/audioEngine';

interface FooterProps {
  language: Language;
  onRestart: () => void;
  onShare: () => void;
}

export default function Footer({ language, onRestart, onShare }: FooterProps) {
  return (
    <footer className="bg-[#0a0a0f] border-t border-white/10 pt-10 pb-24 sm:pb-12 px-4 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-400">
          <span className="text-[#ff2d55] text-base" aria-hidden="true">
            ∞
          </span>
          <span className="font-medium text-zinc-200">Write Made by Sams Sanian</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">03:14 AM</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onMouseEnter={() => audioEngine.playHoverSfx()}
            onClick={() => {
              audioEngine.playClickSfx();
              onRestart();
            }}
            className={`min-h-[44px] px-4 py-2 text-xs font-medium tracking-wider uppercase text-zinc-300 hover:text-white border border-white/10 hover:border-[#ff2d55]/50 rounded-lg transition-colors whitespace-nowrap ${
              language === 'bn' ? 'font-hind' : 'font-inter'
            }`}
          >
            {UI_COPY.restart[language]}
          </button>
          <button
            type="button"
            onMouseEnter={() => audioEngine.playHoverSfx()}
            onClick={() => {
              audioEngine.playClickSfx();
              onShare();
            }}
            className={`min-h-[44px] px-4 py-2 text-xs font-medium tracking-wider uppercase text-zinc-300 hover:text-white border border-white/10 hover:border-[#00f0ff]/50 rounded-lg transition-colors whitespace-nowrap ${
              language === 'bn' ? 'font-hind' : 'font-inter'
            }`}
          >
            {UI_COPY.share[language]}
          </button>
        </div>
      </div>
    </footer>
  );
}
