import { useEffect, useRef, useState } from "react";
import gal1 from "@/assets/gal-1.jpg";
import gal2 from "@/assets/gal-2.jpg";
import gal3 from "@/assets/gal-3.jpg";
import storyVilla from "@/assets/story-villa.jpg";
import { RevealText } from "./RevealText";
import { useCinematics } from "./orchestrator";

/** Inertial horizontal scrolling — the rail keeps gliding after you let go. */
function useRailInertia<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let velocity = 0;
    let raf = 0;
    let running = false;

    const glide = () => {
      velocity *= 0.945;
      if (Math.abs(velocity) < 0.06) {
        running = false;
        return;
      }
      el.scrollLeft += velocity;
      raf = requestAnimationFrame(glide);
    };

    const onWheel = (e: WheelEvent) => {
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      const dx = e.deltaX * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      // Only hijack when the gesture is vertical — trackpad swipes stay native.
      if (Math.abs(dx) > Math.abs(dy)) return;
      const atStart = el.scrollLeft <= 0 && dy < 0;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1 && dy > 0;
      if (atStart || atEnd) return;
      e.preventDefault();
      velocity += dy * 0.2;
      velocity = Math.max(-38, Math.min(38, velocity));
      if (!running) {
        running = true;
        raf = requestAnimationFrame(glide);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}

/**
 * Each plate drifts at its own speed as the rail moves — the exhibition has
 * depth, so nothing reads as a slider.
 */
function useRailProgress(ref: React.RefObject<HTMLDivElement | null>, on: boolean) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !on) return;
    let raf = 0;
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(() => {
        queued = false;
        setTick((t) => t + 1);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, on]);

  return tick;
}

const slides = [
  { image: gal1, caption: "Гостиная, Villa Serein", place: "Бодрум", depth: 0.9, tall: false },
  { image: gal2, caption: "Дворик с вековой оливой", place: "Калкан", depth: 0.45, tall: true },
  { image: storyVilla, caption: "Вечерняя терраса", place: "Кирения", depth: 1.15, tall: false },
  { image: gal3, caption: "Крыша, после заката", place: "Дубай", depth: 0.65, tall: true },
];

export function Gallery() {
  const railRef = useRailInertia<HTMLDivElement>();
  const { enabled, lowPower } = useCinematics();
  const parallax = enabled && !lowPower;
  useRailProgress(railRef, parallax);

  const offsetFor = (el: HTMLElement | null, depth: number) => {
    if (!parallax || !el) return 0;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const delta = (center - window.innerWidth / 2) / window.innerWidth;
    return Math.max(-70, Math.min(70, delta * depth * 90));
  };

  return (
    <section id="gallery" className="relative scroll-mt-28 pt-6 pb-32 md:scroll-mt-32 md:pt-10 md:pb-48">
      <div className="mx-auto mb-20 flex max-w-[1600px] flex-col gap-8 px-6 md:mb-32 md:flex-row md:items-end md:justify-between md:px-12">
        <div>
          <p className="eyebrow mb-8">Галерея</p>
          <h2 className="display-lg max-w-3xl">
            <RevealText text="Пройдитесь по комнатам не спеша." />
          </h2>
        </div>
        <p className="text-[0.62rem] uppercase tracking-[0.32em] text-muted-foreground">
          Скролл · вбок
        </p>
      </div>

      <div className="relative">
        <div
          ref={railRef}
          className="no-scrollbar flex items-center gap-10 overflow-x-auto px-6 pb-6 md:gap-24 md:px-12"
          style={{ scrollBehavior: "auto" }}
        >
          {slides.map((s) => (
            <Plate key={s.caption} slide={s} offsetFor={offsetFor} />
          ))}
          <div aria-hidden className="w-2 shrink-0 md:w-16" />
        </div>
        {/* Cinematic edge falloff */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent md:w-32" />
      </div>
    </section>
  );
}

function Plate({
  slide,
  offsetFor,
}: {
  slide: (typeof slides)[number];
  offsetFor: (el: HTMLElement | null, depth: number) => number;
}) {
  const ref = useRef<HTMLElement>(null);
  const x = offsetFor(ref.current, slide.depth);

  return (
    <figure
      ref={ref}
      className={`group relative shrink-0 ${
        slide.tall ? "w-[74vw] md:w-[42vw]" : "w-[86vw] md:w-[58vw]"
      }`}
    >
      <div className="overflow-hidden rounded-sm">
        <img
          src={slide.image}
          alt={slide.caption}
          loading="lazy"
          decoding="async"
          width={1600}
          height={1000}
          style={{ transform: `translate3d(${x}px,0,0) scale(1.12)` }}
          className={`w-full object-cover will-change-transform ${
            slide.tall ? "aspect-[3/4]" : "aspect-[16/10]"
          }`}
        />
      </div>
      <figcaption className="mt-7 flex items-baseline justify-between">
        <span className="text-sm text-foreground/75">{slide.caption}</span>
        <span className="text-[0.6rem] uppercase tracking-[0.32em] text-primary/80">
          {slide.place}
        </span>
      </figcaption>
    </figure>
  );
}
