import { Language } from '../data/storyData';
import { audioEngine } from '../utils/audioEngine';

interface LanguageToggleProps {
  language: Language;
  onChange: (lang: Language) => void;
  variant?: 'inline' | 'floating';
}

export default function LanguageToggle({
  language,
  onChange,
  variant = 'inline',
}: LanguageToggleProps) {
  const handleSelect = (next: Language) => {
    if (next === language) return;
    audioEngine.playClickSfx();
    audioEngine.startAmbientOnFirstInteraction();
    onChange(next);
  };

  return (
    <div
      role="group"
      aria-label="Select story language"
      className={`inline-flex items-center p-1 rounded-xl border border-white/15 backdrop-blur-md ${
        variant === 'floating'
          ? 'bg-[#0a0a0f]/82 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
          : 'bg-white/6'
      }`}
    >
      <button
        type="button"
        onMouseEnter={() => audioEngine.playHoverSfx()}
        onClick={() => handleSelect('bn')}
        aria-pressed={language === 'bn'}
        lang="bn"
        className={`min-h-[36px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-hind font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
          language === 'bn'
            ? 'bg-[#ff2d55] text-white shadow-[0_0_16px_rgba(255,45,85,0.5)]'
            : 'text-zinc-300 hover:text-white'
        }`}
      >
        বাংলা
      </button>
      <button
        type="button"
        onMouseEnter={() => audioEngine.playHoverSfx()}
        onClick={() => handleSelect('en')}
        aria-pressed={language === 'en'}
        lang="en"
        className={`min-h-[36px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-inter font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
          language === 'en'
            ? 'bg-[#00f0ff] text-[#0a0a0f] font-semibold shadow-[0_0_16px_rgba(0,240,255,0.45)]'
            : 'text-zinc-300 hover:text-white'
        }`}
      >
        English
      </button>
    </div>
  );
}
