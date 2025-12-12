import { useEffect, useRef, useState, memo } from "react";

interface CounterProps {
  to: number;
  duration?: number;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const Counter = ({ to, duration = 1600 }: CounterProps) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const animate = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = easeOutCubic(progress);
              setValue(Math.floor(eased * to));
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <div ref={ref} aria-live="polite" className="text-4xl font-bold leading-none">
      {value.toLocaleString("es-ES")}
    </div>
  );
};

export default memo(Counter);
