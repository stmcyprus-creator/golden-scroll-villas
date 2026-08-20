import prop1 from "@/assets/prop-1.jpg";
import prop2 from "@/assets/prop-2.jpg";
import prop3 from "@/assets/prop-3.jpg";
import { GlowSurface } from "./GlowSurface";
import { Rise, RevealText } from "./RevealText";

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
  return (
    <section id="residences" className="relative pt-6 pb-32 md:pt-10 md:pb-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-20 flex flex-col gap-8 md:mb-28 md:flex-row md:items-end md:justify-between">
          <h2 className="display-lg max-w-2xl">
            <RevealText text="И только тогда — резиденции." stagger={0.12} />
          </h2>
          <Rise delay={0.3}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Каждый адрес мы посещаем, снимаем и обсуждаем лично. Показываем по три — никогда не каталог.
            </p>
          </Rise>
        </div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {residences.map((r, i) => (
            <Rise key={r.name} delay={i * 0.16}>
              <GlowSurface
                as="article"
                className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-border/50 bg-card/30 transition-all duration-[1200ms] [transition-timing-function:var(--ease-silk)] hover:-translate-y-2 hover:border-primary/20 hover:bg-card/50 hover:shadow-[var(--shadow-showcase)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={r.image}
                    alt={r.alt}
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={1600}
                    className="h-full w-full object-cover transition-transform duration-[2000ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_100%,oklch(0.83_0.083_87/0.16),transparent_60%)] opacity-0 transition-opacity duration-[1400ms] [transition-timing-function:var(--ease-silk)] group-hover:opacity-100" />
                  <p className="absolute left-7 top-7 z-10 text-[0.62rem] uppercase tracking-[0.32em] text-foreground/65">
                    {r.place}
                  </p>
                </div>

                <div className="relative z-10 flex flex-1 flex-col p-8 md:p-9">
                  <h3 className="font-display text-[2rem] leading-tight tracking-[-0.02em]">
                    {r.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.meta}</p>

                  <div className="mt-10 flex items-end justify-between">
                    <span className="font-display text-[1.6rem] tracking-tight text-foreground/80 transition-all duration-[1200ms] [transition-timing-function:var(--ease-silk)] group-hover:text-primary group-hover:[text-shadow:0_0_32px_oklch(0.83_0.083_87/0.35)]">
                      {r.price}
                    </span>
                  </div>

                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[1200ms] [transition-timing-function:var(--ease-silk)] group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <button className="mt-7 w-full rounded-full border border-primary/25 px-6 py-3.5 text-[0.62rem] uppercase tracking-[0.32em] text-primary/90 opacity-0 transition-all duration-[1100ms] [transition-timing-function:var(--ease-silk)] group-hover:opacity-100 hover:border-primary/45 hover:bg-primary/[0.07] hover:text-primary">
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
