import prop1 from "@/assets/prop-1.jpg";
import prop2 from "@/assets/prop-2.jpg";
import prop3 from "@/assets/prop-3.jpg";
import { GlowSurface } from "./GlowSurface";
import { Rise, RevealText } from "./RevealText";

const residences = [
  {
    image: prop1,
    alt: "White stone seafront villa with a long pool in Bodrum",
    name: "Villa Serein",
    place: "Bodrum, Türkiye",
    meta: "5 bed · 620 m² · private beach",
    price: "€ 4 250 000",
  },
  {
    image: prop2,
    alt: "Penthouse terrace overlooking the Dubai skyline at dusk",
    name: "Sky Residence 78",
    place: "Downtown, Dubai",
    meta: "3 bed · 340 m² · skyline terrace",
    price: "$ 3 900 000",
  },
  {
    image: prop3,
    alt: "Beachfront residence with wooden pergola in Northern Cyprus",
    name: "Maison Kyrenia",
    place: "Kyrenia, North Cyprus",
    meta: "4 bed · 410 m² · marina access",
    price: "£ 1 780 000",
  },
];

export function Residences() {
  return (
    <section id="residences" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-20 flex flex-col gap-8 md:mb-28 md:flex-row md:items-end md:justify-between">
          <h2 className="display-lg max-w-2xl">
            <RevealText text="Only then, the residences." stagger={0.12} />
          </h2>
          <Rise delay={0.3}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Each address is visited, photographed and negotiated by us. We show
              three at a time — never a catalogue.
            </p>
          </Rise>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {residences.map((r, i) => (
            <Rise key={r.name} delay={i * 0.14}>
              <GlowSurface
                as="article"
                className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-border/60 bg-card/40 transition-all duration-[900ms] [transition-timing-function:var(--ease-silk)] hover:-translate-y-3 hover:border-primary/25 hover:shadow-[var(--shadow-showcase)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={r.image}
                    alt={r.alt}
                    loading="lazy"
                    width={1280}
                    height={1600}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <p className="absolute left-6 top-6 z-10 text-[0.65rem] uppercase tracking-[0.28em] text-foreground/70">
                    {r.place}
                  </p>
                </div>

                <div className="relative z-10 flex flex-1 flex-col p-7">
                  <h3 className="font-display text-3xl">{r.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.meta}</p>

                  <div className="mt-8 flex items-end justify-between">
                    <span className="font-display text-2xl text-foreground/80 transition-all duration-[900ms] [transition-timing-function:var(--ease-silk)] group-hover:text-primary group-hover:[text-shadow:0_0_28px_oklch(0.83_0.083_87/0.45)]">
                      {r.price}
                    </span>
                  </div>

                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[900ms] [transition-timing-function:var(--ease-silk)] group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <button className="mt-6 w-full rounded-full border border-primary/30 px-6 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-primary transition-colors duration-700 hover:bg-primary/10">
                        Request the dossier
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
