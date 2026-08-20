import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import destMediterranean from "@/assets/dest-mediterranean.jpg";
import destCyprus from "@/assets/dest-cyprus.jpg";
import destDubai from "@/assets/dest-dubai.jpg";
import { RevealText } from "./RevealText";
import { EASE, TIMING, useCinematics } from "./orchestrator";

type Destination = {
  id: string;
  index: string;
  /** The name we say out loud — a world, not a country. */
  name: string;
  /** One line of atmosphere. Nothing explained. */
  line: string;
  image: string;
  alt: string;
  /** The quality of light in this world — tints the whole scene. */
  light: string;
  notes: string[];
};

const destinations: Destination[] = [
  {
    id: "mediterranean",
    index: "01",
    name: "Восточное Средиземноморье",
    line: "Сосны спускаются к воде, и день начинается медленно.",
    image: destMediterranean,
    alt: "Бухта Восточного Средиземноморья на закате с виллой на скале",
    light:
      "radial-gradient(90% 70% at 20% 20%, oklch(0.83 0.083 87 / 0.16), transparent 60%)",
    notes: ["Бухты и сосновые склоны", "Частные причалы", "Дом круглый год"],
  },
  {
    id: "cyprus",
    index: "02",
    name: "Северный Кипр",
    line: "Здесь утро начинается с моря.",
    image: destCyprus,
    alt: "Гавань Кирении на рассвете, горы в мягкой дымке",
    light:
      "radial-gradient(90% 70% at 70% 15%, oklch(0.88 0.03 220 / 0.14), transparent 62%)",
    notes: ["Между горами и водой", "Тихие гавани", "Неспешный ритм"],
  },
  {
    id: "dubai",
    index: "03",
    name: "Дубай",
    line: "Там, где архитектура встречается с амбицией.",
    image: destDubai,
    alt: "Панорама Дубая на закате с террасы пентхауса",
    light:
      "radial-gradient(90% 80% at 80% 70%, oklch(0.83 0.083 87 / 0.2), transparent 58%)",
    notes: ["Высота и свет", "Сервис уровня резорта", "Город, который не спит"],
  },
];

export function Locations() {
  const [activeId, setActiveId] = useState(destinations[0]!.id);
  const active = destinations.find((d) => d.id === activeId) ?? destinations[0]!;
  const stageRef = useRef<HTMLDivElement>(null);
  const { useBlur, d, p } = useCinematics();

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [`${-6 * p}%`, `${6 * p}%`]);
  const copyY = useTransform(scrollYProgress, [0, 1], [`${3 * p}%`, `${-3 * p}%`]);

  const blurIn = useBlur ? { filter: "blur(14px)" } : {};
  const blurOut = useBlur ? { filter: "blur(0px)" } : {};

  return (
    <section id="locations" className="relative pt-6 pb-32 md:pt-10 md:pb-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-20 max-w-2xl md:mb-28">
          <p className="eyebrow mb-8">Направления</p>
          <h2 className="display-lg">
            <RevealText text="Три мира, между которыми можно жить." />
          </h2>
        </div>
      </div>

      {/* The stage — one world at a time, full bleed */}
      <div
        ref={stageRef}
        className="grain vignette relative h-[74svh] min-h-[30rem] w-full overflow-hidden md:h-[86svh]"
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 1.08, ...blurIn }}
            animate={{ opacity: 1, scale: 1, ...blurOut }}
            exit={{ opacity: 0, scale: 1.03, ...blurIn }}
            transition={{ duration: d(TIMING.seam), ease: EASE }}
            className="absolute inset-0"
          >
            <motion.img
              src={active.image}
              alt={active.alt}
              loading="lazy"
              decoding="async"
              width={1920}
              height={1280}
              style={{ y: imageY }}
              className="absolute inset-0 h-[112%] w-full -translate-y-[6%] object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Light of this world */}
        <motion.div
          key={`${active.id}-light`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: d(TIMING.seam * 1.2), ease: EASE }}
          className="pointer-events-none absolute inset-0"
          style={{ background: active.light }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/55" />

        {/* Copy */}
        <motion.div
          style={{ y: copyY }}
          className="absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-[1600px] flex-col gap-12 px-6 pb-12 md:flex-row md:items-end md:justify-between md:px-12 md:pb-20"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 26, ...blurIn }}
              animate={{ opacity: 1, y: 0, ...blurOut }}
              exit={{ opacity: 0, y: -16, ...blurIn }}
              transition={{ duration: d(TIMING.reveal), ease: EASE }}
              className="max-w-xl"
            >
              <p className="text-[0.62rem] uppercase tracking-[0.38em] text-primary/85">
                {active.index}
              </p>
              <h3 className="mt-6 font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.05] tracking-[-0.025em]">
                {active.name}
              </h3>
              <p className="mt-5 max-w-md font-display text-xl italic leading-relaxed text-foreground/70 md:text-2xl">
                {active.line}
              </p>
              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3">
                {active.notes.map((n, i) => (
                  <motion.span
                    key={n}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: d(TIMING.rise),
                      delay: d(TIMING.handover + i * TIMING.stagger),
                      ease: EASE,
                    }}
                    className="text-[0.62rem] uppercase tracking-[0.3em] text-foreground/50"
                  >
                    {n}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* The selector — a quiet index, not a control panel */}
          <nav
            aria-label="Направления"
            className="flex shrink-0 flex-col gap-1 md:min-w-[19rem]"
          >
            {destinations.map((dst) => {
              const on = dst.id === active.id;
              return (
                <button
                  key={dst.id}
                  onClick={() => setActiveId(dst.id)}
                  aria-current={on}
                  className="group relative flex items-baseline justify-between gap-6 border-t border-border/50 py-4 text-left"
                >
                  <motion.span
                    aria-hidden
                    initial={false}
                    animate={{ scaleX: on ? 1 : 0 }}
                    transition={{ duration: d(TIMING.reveal), ease: EASE }}
                    className="absolute inset-x-0 top-0 h-px origin-left bg-primary/70"
                  />
                  <span
                    className={`font-display text-lg transition-colors duration-[1200ms] [transition-timing-function:var(--ease-silk)] md:text-xl ${
                      on ? "text-primary" : "text-foreground/55 group-hover:text-foreground/85"
                    }`}
                  >
                    {dst.name}
                  </span>
                  <span
                    className={`text-[0.58rem] tracking-[0.3em] transition-colors duration-[1200ms] ${
                      on ? "text-primary/80" : "text-muted-foreground/70"
                    }`}
                  >
                    {dst.index}
                  </span>
                </button>
              );
            })}
          </nav>
        </motion.div>
      </div>
    </section>
  );
}
