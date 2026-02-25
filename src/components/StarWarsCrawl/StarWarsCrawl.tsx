import { type ReactNode, useCallback, useEffect, useRef } from 'react';

interface StarWarsCrawlProps {
  children: ReactNode;
  /** Pixels per second auto-scroll speed */
  speed?: number;
  className?: string;
}

// Star Wars opening crawl — fixed overlay, wheel-driven
export const StarWarsCrawl = ({ children, speed = 50, className = '' }: StarWarsCrawlProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const autoPlayRef = useRef(true);

  // Max travel: stop when bottom of content reaches top of container
  const getMaxTravel = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return 0;
    return container.clientHeight + content.scrollHeight;
  }, []);

  const applyPosition = useCallback(() => {
    const content = contentRef.current;
    const container = containerRef.current;
    if (!content || !container) return;
    content.style.top = `${container.clientHeight - posRef.current}px`;
  }, []);

  // Auto-play loop
  const tick = useCallback(
    (time: number) => {
      if (!autoPlayRef.current) return;
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;
      posRef.current += speed * dt;
      const max = getMaxTravel();
      if (max > 0 && posRef.current >= max) {
        posRef.current = max;
        applyPosition();
        autoPlayRef.current = false;
        return;
      }
      applyPosition();
      rafRef.current = requestAnimationFrame(tick);
    },
    [speed, getMaxTravel, applyPosition],
  );

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (autoPlayRef.current) {
        autoPlayRef.current = false;
        cancelAnimationFrame(rafRef.current);
      }

      posRef.current += e.deltaY;
      const max = getMaxTravel();
      posRef.current = Math.max(0, Math.min(posRef.current, max));
      applyPosition();
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [getMaxTravel, applyPosition]);

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${className}`}>
      {/* Gradient fade at top */}
      <div className='absolute top-0 left-0 right-0 z-10 pointer-events-none' style={{ bottom: '50%', backgroundImage: 'linear-gradient(0deg, transparent, black 75%)' }} />
      {/* Perspective parent */}
      <div
        style={{
          perspective: '800px',
          perspectiveOrigin: '50% 100%',
          position: 'absolute',
          bottom: 0,
          left: '10%',
          right: '10%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Tilted plane */}
        <div
          ref={containerRef}
          style={{
            transform: 'rotateX(15deg)',
            transformOrigin: '50% 100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100%',
          }}
        >
          <div ref={contentRef} style={{ position: 'absolute', top: '100%', left: 0, right: 0 }} className='text-left font-bold leading-[1.8] text-xl'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
