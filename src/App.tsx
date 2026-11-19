import { useCallback, useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AtmosphericCanvas from './components/AtmosphericCanvas';
import AudioControl from './components/AudioControl';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import GallerySection from './components/GallerySection';
import Hero from './components/Hero';
import LanguageToggle from './components/LanguageToggle';
import LoopEasterEgg from './components/LoopEasterEgg';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import StorySection from './components/StorySection';
import { Language, UI_COPY } from './data/storyData';
import { audioEngine } from './utils/audioEngine';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('sams_story_lang');
      if (saved === 'bn' || saved === 'en') return saved;
    }
    return 'bn';
  });

  const [audioPlaying, setAudioPlaying] = useState(false);
  const [loopCount, setLoopCount] = useState(1);
  const [hasLooped, setHasLooped] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleLanguageChange = useCallback((next: Language) => {
    setLanguage(next);
    try {
      window.localStorage.setItem('sams_story_lang', next);
    } catch {
      // ignore storage quota errors
    }
    window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 60);
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, scrollTop / docHeight)));
      }
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  // Subscribe to Web Audio engine state
  useEffect(() => {
    const unsubscribe = audioEngine.subscribe(setAudioPlaying);
    return () => {
      unsubscribe();
      audioEngine.dispose();
    };
  }, []);

  // Auto-fade in ambient cinematic score on first meaningful user interaction (starts muted initially)
  useEffect(() => {
    let triggered = false;
    const handleFirstInteraction = () => {
      if (triggered) return;
      triggered = true;
      audioEngine.startAmbientOnFirstInteraction();
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2600);
  }, []);

  const handleToggleAudio = useCallback(() => {
    audioEngine.toggleAmbient();
  }, []);

  const handleEnterLoop = useCallback(() => {
    const storyEl = document.getElementById('story');
    if (storyEl) {
      storyEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleRestart = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleTriggerLoopEasterEgg = useCallback(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      setIsGlitching(true);
    }

    window.setTimeout(
      () => {
        setHasLooped(true);
        setLoopCount((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
      },
      prefersReduced ? 0 : 280
    );

    window.setTimeout(() => {
      setIsGlitching(false);
      ScrollTrigger.refresh();
    }, 900);
  }, []);

  const handleShare = useCallback(async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: 'Write Made by Sams Sanian',
      text:
        language === 'bn'
          ? 'রাত ০৩:১৪-এর অনন্ত সময়চক্র নিয়ে একটি বাংলা সাইকোলজিক্যাল থ্রিলার।'
          : 'A psychological thriller about an endless 03:14 AM time loop.',
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showToast(UI_COPY.sharedToast[language]);
        return;
      }
    } catch {
      // Fallback to clipboard copy
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast(UI_COPY.copiedToast[language]);
    } catch {
      showToast('Copy URL from your browser address bar.');
    }
  }, [language, showToast]);

  return (
    <div className={`relative min-h-screen bg-[#0a0a0f] text-[#f3f4f6] ${isGlitching ? 'page-glitch-active' : ''}`}>
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-[#0a0a0f] focus:text-white focus:border focus:border-[#00f0ff] focus:text-sm"
      >
        Skip to content
      </a>

      {/* Scroll Progress Hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 right-0 z-[60] h-[2px] bg-white/5"
      >
        <div
          style={{ transform: `scaleX(${scrollProgress})` }}
          className="h-full origin-left bg-gradient-to-r from-[#ff2d55] via-[#7b2ff7] to-[#00f0ff] transition-transform duration-75"
        />
      </div>

      {/* Preloader */}
      <Preloader />

      {/* Custom Lagging Desktop Cursor */}
      <CustomCursor />

      {/* Desktop 60fps Atmospheric Midnight Rain Canvas */}
      <AtmosphericCanvas />

      {/* Atmospheric Film Grain & Vignette */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] film-grain" />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[65] vignette-overlay" />

      {/* Fixed Header */}
      <Navbar
        language={language}
        onRestart={handleRestart}
        onToggleAudio={handleToggleAudio}
        audioPlaying={audioPlaying}
      />

      {/* Main Content */}
      <main id="main-content">
        <Hero
          language={language}
          onChangeLanguage={handleLanguageChange}
          loopCount={loopCount}
          hasLooped={hasLooped}
          onEnterLoop={handleEnterLoop}
        />
        <StorySection language={language} />
        <GallerySection language={language} />
        <LoopEasterEgg
          language={language}
          loopCount={loopCount}
          onTriggerLoop={handleTriggerLoopEasterEgg}
        />
      </main>

      {/* Footer */}
      <Footer language={language} onRestart={handleRestart} onShare={handleShare} />

      {/* Persistent Floating Bottom-Left Language Switcher */}
      <div className="fixed bottom-4 left-4 sm:bottom-5 sm:left-5 z-50">
        <LanguageToggle
          language={language}
          onChange={handleLanguageChange}
          variant="floating"
        />
      </div>

      {/* Fixed Glass Audio Play/Pause */}
      <AudioControl
        language={language}
        isPlaying={audioPlaying}
        onToggle={handleToggleAudio}
      />

      {/* Toast Notification on Share */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 right-5 z-[95] px-4 py-2.5 rounded-xl bg-[#12121a]/90 backdrop-blur-md border border-[#00f0ff]/45 text-xs font-medium tracking-wide text-zinc-100 shadow-[0_12px_30px_rgba(0,0,0,0.65)]"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
