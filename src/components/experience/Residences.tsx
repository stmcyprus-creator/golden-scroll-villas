import prop1 from "@/assets/prop-1.jpg";
import prop2 from "@/assets/prop-2.jpg";
import prop3 from "@/assets/prop-3.jpg";
import { useState, type KeyboardEvent } from "react";
import { motion } from "motion/react";
import { GlowSurface } from "./GlowSurface";
import { Rise, RevealText } from "./RevealText";
import { EASE, useCinematics } from "./orchestrator";

const residences = [
  {
    image: prop1,
    alt: "Белая каменная вилла у моря с длинным бассейном в Бодруме",
    name: "Villa Serein",
    place: "Бодрум, Турция",
    meta: "5 спален · 620 м² · частный пляж",
    price: "€ 4 250 000",
  },
  {
    image: prop2,
    alt: "Терраса пентхауса с видом на дубайский небоскрёб в сумерках",
    name: "Sky Residence 78",
    place: "Даунтаун, Дубай",
    meta: "3 спальни · 340 м² · терраса с панорамой",
    price: "$ 3 900 000",
  },
  {
    image: prop3,
    alt: "Резиденция у пляжа с деревянной перголой на Северном Кипре",
    name: "Maison Kyrenia",
    place: "Кирения, Северный Кипр",
    meta: "4 спальни · 410 м² · выход к марине",
    price: "£ 1 780 000",
  },
];

type Residence = (typeof residences)[number];

/**
 * One residence.
 * Desktop: unfolds on hover. Touch: unfolds on scroll (soft staggered
 * intervals) and deepens on tap — no hover states are ever attached.
 */
function ResidenceCard({ r, i }: { r: Residence; i: number }) {
  const { enabled, coarse, lowPower, d, s: st } = useCinematics();
  const [open, setOpen] = useState(false);

  const surface = coarse
    ? `relative flex h-full flex-col overflow-hidden rounded-sm border bg-card/30 outline-none transition-[border-color,background-color,transform] duration-700 [transition-timing-function:var(--ease-silk)] ${
        open ? "-translate-y-1 border-primary/30 bg-card/55" : "border-border/50"
      }`
    : "group relative flex h-full flex-col overflow-hidden rounded-sm border border-border/50 bg-card/30 outline-none transition-all duration-[1600ms] [transition-timing-function:var(--ease-silk)] focus-visible:border-primary/30 hover:-translate-y-2.5 hover:border-primary/25 hover:bg-card/55 hover:shadow-[var(--shadow-showcase)]";

  return (
    <Rise delay={i * (coarse ? 0.12 : 0.26)} y={coarse ? 24 : 44} duration={coarse ? 1.1 : 1.8}>
      <GlowSurface
        as="article"
        className={surface}
        {...(coarse
          ? {
              role: "button" as const,
              tabIndex: 0,
              onClick: () => setOpen((v) => !v),
              onKeyDown: (e: KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpen((v) => !v);
                }
              },
            }
          : {})}
      >
        <div className="relative aspect-[3/4] overflow-hidden md:aspect-[4/5]">
          {/* Slow image reveal — driven by scroll, so touch devices get it too */}
          <motion.img
            src={r.image}
            alt={r.alt}
            loading="lazy"
            decoding="async"
            width={1280}
            height={1600}
            initial={{ scale: enabled ? (lowPower ? 1.07 : 1.14) : 1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{
              duration: d(2.6),
              delay: st(0.12 + i * 0.22),
              ease: EASE,
            }}
            className={
              coarse
                ? `h-full w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-silk)] ${
                    open ? "scale-[1.04]" : "scale-100"
                  }`
                : "h-full w-full object-cover transition-transform duration-[3400ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-[1.06] group-hover:brightness-[1.04]"
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
          <div
            className={
              coarse
                ? "absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_100%,oklch(0.83_0.083_87/0.16),transparent_60%)]"
                : "absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_100%,oklch(0.83_0.083_87/0.16),transparent_60%)] opacity-0 transition-opacity duration-[1800ms] [transition-timing-function:var(--ease-silk)] group-hover:opacity-100"
            }
          />
          <p className="absolute left-6 top-6 z-10 text-[0.6rem] uppercase tracking-[0.26em] text-foreground/65 md:left-8 md:top-8 md:text-[0.62rem] md:tracking-[0.32em]">
            {r.place}
          </p>
        </div>

        <div className="relative z-10 flex flex-1 flex-col p-7 md:p-11">
          <h3 className="text-balance font-display text-[1.55rem] leading-tight tracking-[-0.02em] sm:text-[1.75rem] md:text-[2rem]">
            {r.name}
          </h3>
          <p className="mt-4 text-pretty text-[0.92rem] leading-relaxed text-muted-foreground md:text-sm">
            {r.meta}
          </p>

          <div className="mt-8 flex items-end justify-between md:mt-10">
            <span
              className={
                coarse
                  ? `font-display text-[1.35rem] tracking-tight transition-colors duration-700 sm:text-[1.45rem] ${
                      open ? "text-primary" : "text-foreground/80"
                    }`
                  : "font-display text-[1.45rem] tracking-tight text-foreground/80 transition-all duration-[1200ms] [transition-timing-function:var(--ease-silk)] group-hover:text-primary group-hover:[text-shadow:0_0_32px_oklch(0.83_0.083_87/0.35)] md:text-[1.6rem]"
              }
            >
              {r.price}
            </span>
          </div>

          {/* Desktop: unfolds on hover. Touch: unfolds on tap. */}
          <div
            className={
              coarse
                ? `grid transition-[grid-template-rows] duration-700 [transition-timing-function:var(--ease-silk)] ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`
                : "grid grid-rows-[0fr] transition-[grid-template-rows] duration-[1200ms] [transition-timing-function:var(--ease-silk)] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] motion-reduce:grid-rows-[1fr]"
            }
          >
            <div className="overflow-hidden">
              <button
                className={
                  coarse
                    ? `mt-6 w-full rounded-full border border-primary/25 px-6 py-3.5 text-[0.6rem] uppercase tracking-[0.26em] text-primary/90 transition-opacity duration-700 ${
                        open ? "opacity-100" : "opacity-0"
                      }`
                    : "mt-6 w-full rounded-full border border-primary/25 px-6 py-3.5 text-[0.62rem] uppercase tracking-[0.3em] text-primary/90 opacity-0 transition-all delay-[220ms] duration-[1300ms] [transition-timing-function:var(--ease-silk)] group-hover:opacity-100 group-focus-within:opacity-100 hover:border-primary/45 hover:bg-primary/[0.07] hover:text-primary md:mt-7"
                }
              >
                Запросить досье
              </button>
            </div>
          </div>

          {coarse ? (
            <span
              className={`mt-4 text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground/70 transition-opacity duration-500 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            >
              Коснитесь, чтобы раскрыть
            </span>
          ) : null}
        </div>
      </GlowSurface>
    </Rise>
  );
}

export function Residences() {
  return (
    <section id="residences" className="relative scroll-mt-36 pt-6 pb-32 md:scroll-mt-40 md:pt-10 md:pb-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-20 flex flex-col gap-10 md:mb-36 md:flex-row md:items-end md:justify-between">
          <h2 className="display-lg max-w-2xl text-balance">
            <RevealText text="И теперь — сами резиденции." />
          </h2>
          <Rise delay={0.3}>
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              Каждый адрес мы видели сами: свет в комнатах, дорогу к морю,
              тишину вечером. Мы собираем вашу коллекцию мест для жизни.
            </p>
          </Rise>
        </div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-10">
          {residences.map((r, i) => (
            <ResidenceCard key={r.name} r={r} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
