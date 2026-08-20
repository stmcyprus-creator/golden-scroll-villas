import prop1 from "@/assets/prop-1.jpg";
import prop2 from "@/assets/prop-2.jpg";
import prop3 from "@/assets/prop-3.jpg";
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

export function Residences() {
  const { enabled, d } = useCinematics();
  return (
    <section id="residences" className="relative pt-6 pb-32 md:pt-10 md:pb-48">
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
            <Rise key={r.name} delay={i * 0.26} y={44} duration={1.8}>
              <GlowSurface
                as="article"
                className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-border/50 bg-card/30 outline-none transition-all duration-[1600ms] [transition-timing-function:var(--ease-silk)] focus-visible:border-primary/30 hover:-translate-y-2.5 hover:border-primary/25 hover:bg-card/55 hover:shadow-[var(--shadow-showcase)]"
              >
                <div className="relative aspect-[3/4] overflow-hidden md:aspect-[4/5]">
                  {/* Slow image reveal — works on scroll, so touch devices get it too */}
                  <motion.img
                    src={r.image}
                    alt={r.alt}
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={1600}
                    initial={{ scale: enabled ? 1.14 : 1, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{
                      duration: d(2.6),
                      delay: enabled ? 0.12 + i * 0.22 : 0,
                      ease: EASE,
                    }}
                    className="h-full w-full object-cover transition-transform duration-[3400ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-[1.06] group-hover:brightness-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_100%,oklch(0.83_0.083_87/0.16),transparent_60%)] opacity-0 transition-opacity duration-[1800ms] [transition-timing-function:var(--ease-silk)] group-hover:opacity-100 [@media(hover:none)]:opacity-100" />
                  <p className="absolute left-6 top-6 z-10 text-[0.6rem] uppercase tracking-[0.3em] text-foreground/65 md:left-8 md:top-8 md:text-[0.62rem] md:tracking-[0.32em]">
                    {r.place}
                  </p>
                </div>

                <div className="relative z-10 flex flex-1 flex-col p-7 md:p-11">
                  <h3 className="text-balance font-display text-[1.75rem] leading-tight tracking-[-0.02em] md:text-[2rem]">
                    {r.name}
                  </h3>
                  <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {r.meta}
                  </p>

                  <div className="mt-8 flex items-end justify-between md:mt-10">
                    <span className="font-display text-[1.45rem] tracking-tight text-foreground/80 transition-all duration-[1200ms] [transition-timing-function:var(--ease-silk)] group-hover:text-primary group-hover:[text-shadow:0_0_32px_oklch(0.83_0.083_87/0.35)] md:text-[1.6rem]">
                      {r.price}
                    </span>
                  </div>

                  {/* Desktop: the action unfolds on hover. Touch: always present. */}
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[1200ms] [transition-timing-function:var(--ease-silk)] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] motion-reduce:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <button className="mt-6 w-full rounded-full border border-primary/25 px-6 py-3.5 text-[0.62rem] uppercase tracking-[0.3em] text-primary/90 opacity-0 transition-all delay-[220ms] duration-[1300ms] [transition-timing-function:var(--ease-silk)] group-hover:opacity-100 group-focus-within:opacity-100 hover:border-primary/45 hover:bg-primary/[0.07] hover:text-primary md:mt-7 [@media(hover:none)]:opacity-100 [@media(hover:none)]:delay-0">
                        Запросить досье
                      </button>
                    </div>
                  </div>
                </div>
              </GlowSurface>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
