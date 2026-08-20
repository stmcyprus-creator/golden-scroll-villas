import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Rise, RevealText } from "./RevealText";

const EASE = [0.16, 1, 0.3, 1] as const;

type Region = {
  id: string;
  label: string;
  tagline: string;
  focus: { x: number; y: number; zoom: number };
  dot: { x: number; y: number };
  projects: { name: string; detail: string }[];
};

const regions: Region[] = [
  {
    id: "turkiye",
    label: "Турция",
    tagline: "Эгейские бухты, сосновые холмы, частные причалы.",
    focus: { x: 320, y: 200, zoom: 2.4 },
    dot: { x: 320, y: 200 },
    projects: [
      { name: "Yalıkavak Marina Villas", detail: "12 резиденций · от € 2,1M" },
      { name: "Kalkan Cliff Houses", detail: "7 резиденций · от € 1,4M" },
      { name: "Çeşme Dune Collection", detail: "18 резиденций · от € 980K" },
    ],
  },
  {
    id: "cyprus",
    label: "Северный Кипр",
    tagline: "Тихие утра между горами и морем.",
    focus: { x: 470, y: 300, zoom: 2.6 },
    dot: { x: 470, y: 300 },
    projects: [
      { name: "Kyrenia Harbour Lofts", detail: "24 резиденции · от £ 420K" },
      { name: "Esentepe Golf Estate", detail: "31 резиденция · от £ 310K" },
    ],
  },
  {
    id: "uae",
    label: "ОАЭ",
    tagline: "Высота, свет и безупречный сервис.",
    focus: { x: 760, y: 400, zoom: 2.7 },
    dot: { x: 760, y: 400 },
    projects: [
      { name: "Palm Bay Penthouses", detail: "9 резиденций · от $ 5,2M" },
      { name: "Marina Sky Collection", detail: "40 резиденций · от $ 1,6M" },
      { name: "Desert Ridge Mansions", detail: "5 резиденций · от $ 11M" },
    ],
  },
];

export function Locations() {
  const [active, setActive] = useState<Region>(regions[0]!);

  const { x, y, zoom } = active.focus;
  const tx = 500 - x * zoom;
  const ty = 300 - y * zoom;

  return (
    <section id="locations" className="relative overflow-hidden pt-6 pb-32 md:pt-10 md:pb-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow mb-8">Где мы работаем</p>
          <h2 className="display-lg">
            <RevealText text="Три побережья — один стандарт." stagger={0.12} />
          </h2>
        </div>

        <Rise delay={0.2}>
          <div className="glass relative overflow-hidden rounded-sm">
            <div className="grid lg:grid-cols-[1.35fr_1fr]">
              {/* Map */}
              <div className="relative h-[380px] overflow-hidden border-b border-border/50 lg:h-[560px] lg:border-b-0 lg:border-r">
                <svg viewBox="0 0 1000 600" className="h-full w-full">
                  <defs>
                    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="oklch(0.83 0.083 87)" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="oklch(0.83 0.083 87)" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <motion.g
                    animate={{ scale: zoom, x: tx, y: ty }}
                    transition={{ type: "spring", stiffness: 42, damping: 22, mass: 1.1 }}
                    style={{ originX: 0, originY: 0 }}
                  >
                    {/* Abstract coastline masses */}
                    <path
                      d="M120 150 C220 90 340 110 430 160 C520 210 600 190 690 220 C780 250 860 300 940 300 L940 60 L120 60 Z"
                      fill="oklch(1 0 0 / 0.05)"
                      stroke="oklch(1 0 0 / 0.14)"
                      strokeWidth="0.8"
                    />
                    <path
                      d="M380 330 C450 300 520 305 590 335 C540 375 460 380 380 330 Z"
                      fill="oklch(1 0 0 / 0.06)"
                      stroke="oklch(1 0 0 / 0.14)"
                      strokeWidth="0.8"
                    />
                    <path
                      d="M640 420 C720 370 820 360 940 390 L940 600 L620 600 C600 520 610 460 640 420 Z"
                      fill="oklch(1 0 0 / 0.05)"
                      stroke="oklch(1 0 0 / 0.14)"
                      strokeWidth="0.8"
                    />
                    {[...Array(9)].map((_, i) => (
                      <line
                        key={i}
                        x1="0"
                        y1={i * 70 + 40}
                        x2="1000"
                        y2={i * 70 + 40}
                        stroke="oklch(1 0 0 / 0.035)"
                        strokeWidth="0.5"
                      />
                    ))}

                    {regions.map((r) => {
                      const on = r.id === active.id;
                      return (
                        <g
                          key={r.id}
                          onClick={() => setActive(r)}
                          className="cursor-pointer"
                          role="button"
                          aria-label={r.label}
                        >
                          <motion.circle
                            cx={r.dot.x}
                            cy={r.dot.y}
                            r="60"
                            fill="url(#halo)"
                            animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.7 }}
                            style={{ originX: `${r.dot.x}px`, originY: `${r.dot.y}px` }}
                            transition={{ duration: 1.6, ease: EASE }}
                          />
                          {/* Slow sonar ring on the active region */}
                          {on && (
                            <motion.circle
                              cx={r.dot.x}
                              cy={r.dot.y}
                              fill="none"
                              stroke="oklch(0.83 0.083 87)"
                              strokeWidth="0.6"
                              initial={{ r: 6, opacity: 0.55 }}
                              animate={{ r: [6, 34], opacity: [0.55, 0] }}
                              transition={{ duration: 4.2, repeat: Infinity, ease: "easeOut" }}
                            />
                          )}
                          <motion.circle
                            cx={r.dot.x}
                            cy={r.dot.y}
                            animate={{
                              r: on ? 5.5 : 3.6,
                              fill: on ? "oklch(0.83 0.083 87)" : "oklch(1 0 0 / 0.45)",
                            }}
                            transition={{ duration: 1.3, ease: EASE }}
                          />
                          <circle cx={r.dot.x} cy={r.dot.y} r="26" fill="transparent" />
                          <motion.text
                            x={r.dot.x + 14}
                            y={r.dot.y + 4}
                            animate={{
                              fill: on ? "oklch(0.83 0.083 87)" : "oklch(1 0 0 / 0.5)",
                              opacity: on ? 1 : 0.75,
                            }}
                            transition={{ duration: 1.2, ease: EASE }}
                            fontSize="9"
                            letterSpacing="1.6"
                            style={{ textTransform: "uppercase" }}
                          >
                            {r.label}
                          </motion.text>
                        </g>
                      );
                    })}
                  </motion.g>
                </svg>
              </div>

              {/* Panel */}
              <div className="flex flex-col justify-between p-8 md:p-12">
                <div className="flex flex-wrap gap-2">
                  {regions.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setActive(r)}
                      className={`rounded-full border px-5 py-2 text-[0.62rem] uppercase tracking-[0.24em] transition-all duration-700 ${
                        r.id === active.id
                          ? "border-primary/45 text-primary"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="mt-12"
                  >
                    <h3 className="font-display text-4xl">{active.label}</h3>
                    <p className="mt-3 max-w-sm text-sm text-muted-foreground">{active.tagline}</p>

                    <div className="mt-10 space-y-0">
                      {active.projects.map((p, i) => (
                        <motion.div
                          key={p.name}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
                          className="flex items-baseline justify-between border-t border-border/60 py-4"
                        >
                          <span className="text-base">{p.name}</span>
                          <span className="text-xs text-muted-foreground">{p.detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Rise>
      </div>
    </section>
  );
}
