import gal1 from "@/assets/gal-1.jpg";
import gal2 from "@/assets/gal-2.jpg";
import gal3 from "@/assets/gal-3.jpg";
import storyVilla from "@/assets/story-villa.jpg";
import { RevealText } from "./RevealText";

const slides = [
  { image: gal1, caption: "Гостиная, Villa Serein", place: "Бодрум" },
  { image: gal2, caption: "Дворик с вековой оливой", place: "Калкан" },
  { image: storyVilla, caption: "Вечерняя терраса", place: "Кирения" },
  { image: gal3, caption: "Крыша, после заката", place: "Дубай" },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative py-32 md:py-48">
      <div className="mx-auto mb-16 max-w-[1600px] px-6 md:mb-24 md:px-12">
        <p className="eyebrow mb-8">Галерея</p>
        <h2 className="display-lg max-w-3xl">
          <RevealText text="Смотрите медленно. Листайте вбок." stagger={0.12} />
        </h2>
      </div>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 md:gap-10 md:px-12">
        {slides.map((s) => (
          <figure
            key={s.caption}
            className="group relative w-[86vw] shrink-0 snap-center md:w-[74vw]"
          >
            <div className="overflow-hidden rounded-sm">
              <img
                src={s.image}
                alt={s.caption}
                loading="lazy"
                width={1600}
                height={1000}
                className="aspect-[16/10] w-full object-cover transition-transform duration-[1600ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-[1.04]"
              />
            </div>
            <figcaption className="mt-5 flex items-baseline justify-between">
              <span className="text-sm text-foreground/80">{s.caption}</span>
              <span className="text-[0.62rem] uppercase tracking-[0.28em] text-primary">
                {s.place}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
