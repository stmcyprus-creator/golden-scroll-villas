import { GlowSurface } from "./GlowSurface";
import { Rise, RevealText } from "./RevealText";

const pillars = [
  {
    n: "01",
    title: "Персональный подбор",
    text: "Три адреса, тщательно подобранные для вас. Каждый — после личного выезда на объект.",
  },
  {
    n: "02",
    title: "Юридическое сопровождение",
    text: "Проверка титула, договор, расчёты — под контролем нашего юриста.",
  },
  {
    n: "03",
    title: "Инвестиционная экспертиза",
    text: "Честная доходность и сроки выхода. Без обещаний, которых не будет.",
  },
  {
    n: "04",
    title: "ВНЖ и резидентство",
    text: "Подготовка документов и сопровождение семьи на каждом этапе.",
  },
  {
    n: "05",
    title: "После покупки",
    text: "Меблировка, управление, аренда, обслуживание. Мы остаёмся рядом.",
  },
];

export function Trust() {
  return (
    <section id="trust" className="relative pt-6 pb-32 md:pt-10 md:pb-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-24 flex flex-col gap-10 md:mb-36 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-8">Как мы работаем</p>
            <h2 className="display-lg">
              <RevealText text="Выбор начинается задолго до первого показа." />
            </h2>
          </div>
          <Rise delay={0.3}>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Мы помогаем принимать решения, ценность которых не исчезает
              со временем. Наше участие продолжается и после сделки.
            </p>
          </Rise>
        </div>

        <div className="grid gap-px overflow-hidden rounded-sm border border-border/50 bg-border/40 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Rise key={p.n} delay={i * 0.1} y={20}>
              <GlowSurface className="group h-full bg-background/60 p-9 transition-colors duration-[1200ms] [transition-timing-function:var(--ease-silk)] hover:bg-card/50 md:p-12">
                <span className="relative z-10 block text-[0.62rem] tracking-[0.34em] text-primary/70 transition-colors duration-[1200ms] group-hover:text-primary">
                  {p.n}
                </span>
                <h3 className="relative z-10 mt-8 font-display text-2xl leading-snug md:text-[1.75rem]">
                  {p.title}
                </h3>
                <p className="relative z-10 mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {p.text}
                </p>
              </GlowSurface>
            </Rise>
          ))}
          <div className="hidden bg-background/60 md:block" />
        </div>
      </div>
    </section>
  );
}
