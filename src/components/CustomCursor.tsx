import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const checkEligible = () => {
      const finePointer = window.matchMedia('(pointer: fine)').matches;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const wideScreen = window.innerWidth >= 1024;
      setEnabled(finePointer && !reducedMotion && wideScreen);
    };

    checkEligible();
    window.addEventListener('resize', checkEligible);
    return () => window.removeEventListener('resize', checkEligible);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = 0;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);

      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest('a, button, [role="button"], [data-cursor="expand"]')
      );
      setExpanded(isInteractive);
    };

    const handleLeave = () => {
      setVisible(false);
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${
          expanded ? 1.65 : 1
        })`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      window.cancelAnimationFrame(rafId);
    };
  }, [enabled, expanded]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-9 h-9 rounded-full border transition-opacity duration-200 will-change-transform ${
          expanded
            ? 'border-[#00f0ff]/80 bg-[#ff2d55]/10 shadow-[0_0_18px_rgba(0,240,255,0.35)]'
            : 'border-[#ff2d55]/65 bg-transparent shadow-[0_0_12px_rgba(255,45,85,0.25)]'
        } ${visible ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#ff2d55] shadow-[0_0_8px_#ff2d55] transition-opacity duration-150 will-change-transform ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
