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
}: {
  image: string;
  line: string;
  chapter: string;
  alt: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.02, 1.12]);
  const veil = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 0.45, 0.85]);

  return (
    <section ref={ref} className="relative h-[110svh] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          width={1920}
          height={1088}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <motion.div style={{ opacity: veil }} className="absolute inset-0 bg-ink" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />

      <div className="relative mx-auto flex h-full max-w-[1600px] flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow mb-10">{chapter}</p>
        <h2 className="display-lg max-w-4xl">
          <RevealText text={line} stagger={0.14} duration={1.9} />
        </h2>
      </div>
    </section>
  );
}

export function StoryScroll() {
  return (
    <div id="story" className="relative">
      {chapters.map((c) => (
        <Chapter key={c.line} {...c} />
      ))}
    </div>
  );
}
