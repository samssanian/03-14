import { Pause, Play } from 'lucide-react';
import { Language, UI_COPY } from '../data/storyData';
import { audioEngine } from '../utils/audioEngine';

interface AudioControlProps {
  language: Language;
  isPlaying: boolean;
  onToggle: () => void;
}

export default function AudioControl({
  language,
  isPlaying,
  onToggle,
}: AudioControlProps) {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50">
      <button
        type="button"
        onMouseEnter={() => audioEngine.playHoverSfx()}
        onClick={() => {
          audioEngine.playClickSfx();
          onToggle();
        }}
        aria-label={isPlaying ? 'Pause cinematic thriller score' : 'Play cinematic thriller score'}
        aria-pressed={isPlaying}
        className="inline-flex items-center gap-3 min-h-[44px] px-4 py-2 rounded-xl bg-[#0a0a0f]/82 hover:bg-[#14141f]/95 backdrop-blur-md border border-white/15 hover:border-[#ff2d55]/65 text-xs font-medium tracking-wider uppercase text-zinc-200 shadow-[0_10px_30px_rgba(0,0,0,0.65)] transition-all duration-200"
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 text-[#ff2d55] shrink-0" aria-hidden="true" />
        ) : (
          <Play className="w-3.5 h-3.5 text-[#00f0ff] shrink-0" aria-hidden="true" />
        )}

        {/* Animated 5-bar Soundwave Equalizer */}
        <span className="flex items-end gap-[2.5px] h-3.5 w-6 justify-center" aria-hidden="true">
          {[0.62, 0.92, 0.54, 0.78, 0.68].map((dur, idx) => (
            <span
              key={idx}
              style={{
                '--bar-dur': `${dur}s`,
                animationDelay: `${idx * 110}ms`,
              } as React.CSSProperties}
              className={`w-[2px] rounded-full transition-all duration-200 ${
                isPlaying
                  ? 'h-full bg-gradient-to-t from-[#ff2d55] to-[#00f0ff] animate-sound-bar'
                  : 'h-1.5 bg-zinc-500'
              }`}
            />
          ))}
        </span>

        <span className={`whitespace-nowrap ${language === 'bn' ? 'font-hind tracking-normal' : 'font-inter'}`}>
          {isPlaying ? UI_COPY.audioOn[language] : UI_COPY.audioMuted[language]}
        </span>
      </button>
    </div>
  );
}
