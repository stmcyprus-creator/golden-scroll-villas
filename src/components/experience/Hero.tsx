import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import heroSea from "@/assets/hero-sea.jpg";

const EASE = [0.16, 1, 0.3, 1] as const;

const lines = ["Откройте", "новую жизнь", "у Средиземного моря"];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Depth: background moves least, decorative elements most.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  const decoY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] overflow-hidden">
      {/* Slow camera flight over the sea */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <motion.img
          src={heroSea}
          alt="Вид с воздуха на средиземноморское побережье в золотой час"
          width={1920}
          height={1088}
          className="h-[112%] w-full object-cover"
          initial={{ scale: 1.18, x: "-2%" }}
          animate={{ scale: 1.02, x: "1%" }}
          transition={{ duration: 26, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/10 to-transparent" />
      </motion.div>

      <motion.div style={{ y: decoY }} className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute left-1/2 top-1/3 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/8 blur-[140px]" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-10 flex h-full max-w-[1600px] flex-col justify-end px-6 pb-24 md:px-12 md:pb-28"
      >
        <motion.p
          className="eyebrow mb-8"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.6, ease: EASE }}
        >
          Турция · Северный Кипр · ОАЭ
        </motion.p>

        <h1 className="display-xl max-w-5xl">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className={`inline-block ${i === 2 ? "gold-text italic" : ""}`}
                initial={{ opacity: 0, y: "0.6em", filter: "blur(14px)" }}
                animate={{ opacity: 1, y: "0em", filter: "blur(0px)" }}
                transition={{ duration: 2.1, delay: 0.9 + i * 0.55, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-12 flex flex-wrap items-center gap-6"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 3.1, ease: EASE }}
        >
          <a
            href="#story"
            className="glass group relative overflow-hidden rounded-full px-9 py-4 text-[0.7rem] uppercase tracking-[0.28em] transition-all duration-700 hover:border-primary/40"
          >
            <span className="relative z-10 transition-colors duration-700 group-hover:text-primary">
              Начать путешествие
            </span>
          </a>
          <span className="text-sm text-muted-foreground">
            Частная подборка из 84 резиденций
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 3.8 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <div className="h-14 w-px bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
      </motion.div>
    </section>
  );
}
