import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import storyVilla from "@/assets/story-villa.jpg";
import storyPool from "@/assets/story-pool.jpg";
import gal1 from "@/assets/gal-1.jpg";
import { RevealText } from "./RevealText";

const chapters = [
  {
    image: storyVilla,
    line: "Некоторые объекты меняют ваш адрес.",
    chapter: "Глава I",
    alt: "Минималистичная каменная вилла с инфинити-бассейном над морем в сумерках",
  },
  {
    image: gal1,
    line: "Некоторые меняют ваш образ жизни.",
    chapter: "Глава II",
    alt: "Тихая гостиная из травертина с видом на яркий морской горизонт",
  },
  {
    image: storyPool,
    line: "Некоторые меняют ваше будущее.",
    chapter: "Глава III",
    alt: "Вид из инфинити-бассейна на закат над морем",
  },
];

function Chapter({
  image,
  line,
  chapter,
  alt,
  index,
  last,
}: {
  image: string;
  line: string;
  chapter: string;
  alt: string;
  index: number;
  last: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.02, 1.14]);
  const veil = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 0.4, 0.92]);
  // The words breathe with the frame — arriving, holding, then letting go.
  const textOpacity = useTransform(scrollYProgress, [0.12, 0.34, 0.66, 0.88], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["24px", "-24px"]);
  const threadScale = useTransform(scrollYProgress, [0.55, 0.95], [0, 1]);

  return (
    <section ref={ref} className="grain vignette relative h-[110svh] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          width={1920}
          height={1088}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <motion.div style={{ opacity: veil }} className="absolute inset-0 z-[1] bg-ink" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-ink via-transparent to-ink/60" />

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col items-center justify-center px-6 text-center"
      >
        <p className="eyebrow mb-12">{chapter}</p>
        <h2 className="display-lg max-w-4xl [text-shadow:0_2px_44px_oklch(0.17_0.012_250/0.55)]">
          <RevealText text={line} stagger={0.16} duration={2.2} />
        </h2>
      </motion.div>

      {/* A thread of light carrying you into the next chapter — and out of the last one */}
      <motion.div
        style={{ scaleY: threadScale }}
        className="absolute bottom-0 left-1/2 z-10 h-24 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/45 to-primary/70"
        aria-hidden
      />
      {last ? null : null}
      <span className="absolute bottom-10 right-6 z-10 font-display text-sm tracking-[0.3em] text-foreground/25 md:right-12">
        0{index + 1} / 0{chaptersCount}
      </span>
    </section>
  );
}

const chaptersCount = chapters.length;

export function StoryScroll() {
  return (
    <div id="story" className="relative">
      {chapters.map((c, i) => (
        <Chapter key={c.line} {...c} index={i} last={i === chapters.length - 1} />
      ))}
    </div>
  );
}
