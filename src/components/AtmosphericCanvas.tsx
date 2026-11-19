import { useEffect, useRef, useState } from 'react';

interface RainDrop {
  x: number;
  y: number;
  len: number;
  speed: number;
  opacity: number;
  tint: string;
}

export default function AtmosphericCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const check = () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const desktop = window.innerWidth >= 768;
      setActive(!reduced && desktop);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const drops: RainDrop[] = Array.from({ length: 58 }, (_, idx) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      len: 14 + Math.random() * 24,
      speed: 7 + Math.random() * 7,
      opacity: 0.06 + Math.random() * 0.14,
      tint: idx % 7 === 0 ? '255, 45, 85' : idx % 5 === 0 ? '0, 240, 255' : '228, 228, 231',
    }));

    let rafId = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        ctx.strokeStyle = `rgba(${d.tint}, ${d.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.len * 0.16, d.y + d.len);
        ctx.stroke();

        d.y += d.speed;
        d.x -= d.speed * 0.16;

        if (d.y > height + 30) {
          d.y = -30;
          d.x = Math.random() * (width + 120);
        }
        if (d.x < -30) {
          d.x = width + 20;
        }
      }

      rafId = window.requestAnimationFrame(render);
    };

    window.addEventListener('resize', handleResize);
    rafId = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(rafId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[15] opacity-75"
    />
  );
}
