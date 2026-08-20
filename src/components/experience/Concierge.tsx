import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { RevealText } from "./RevealText";
import { EASE, TIMING, useCinematics } from "./orchestrator";

type Step = {
  key: "place" | "purpose" | "budget" | "contact";
  question: string;
  hint: string;
  options?: string[];
  placeholder?: string;
};

const steps: Step[] = [
  {
    key: "place",
    question: "Где вы представляете себе пробуждение?",
    hint: "Выберите один вариант — передумать можно позже.",
    options: ["Турция", "Северный Кипр", "ОАЭ", "Ещё думаю"],
  },
  {
    key: "purpose",
    question: "Для чего вам этот дом?",
    hint: "От этого зависит всё, что мы покажем.",
    options: ["Для жизни", "Сезоны у моря", "Инвестиции", "Резидентство"],
  },
  {
    key: "budget",
    question: "Комфортный бюджет?",
    hint: "Честный диапазон сэкономит время нам обоим.",
    options: ["до € 500K", "€ 500K – 1,5M", "€ 1,5M – 4M", "€ 4M +"],
  },
  {
    key: "contact",
    question: "И как с вами связаться?",
    hint: "Одно сообщение от реального человека. Никаких рассылок.",
    placeholder: "Email или телефон",
  },
];

/** A quiet, hand-picked answer — one address, never a list. */
function suggest(answers: Record<string, string>) {
  const place = answers.place ?? "";
  const purpose = answers.purpose ?? "";

  const byPlace: Record<string, { name: string; where: string; note: string }> = {
    "Турция": {
      name: "Villa Mare",
      where: "Аланья, Каргыджак",
      note: "Дом на склоне над морем: терраса длиной во весь фасад и тишина вечером.",
    },
    "Северный Кипр": {
      name: "Kyrenia Cliff House",
      where: "Киренья, Эсентепе",
      note: "Между горами и водой. Свет здесь меняется медленно и весь день.",
    },
    "ОАЭ": {
      name: "Palm Sky Penthouse",
      where: "Дубай, Palm Jumeirah",
      note: "Верхний уровень, панорама залива, сервис уровня резорта.",
    },
  };

  const base = byPlace[place] ?? {
    name: "Личная подборка",
    where: "Три побережья",
    note: "Мы соберём три адреса под ваш сценарий — по одному на каждое побережье.",
  };

  const angle =
    purpose === "Инвестиции"
      ? "Покажем расчёт доходности и реальные сроки выхода."
      : purpose === "Резидентство"
        ? "Объект проходит по требованиям для ВНЖ — документы подготовим мы."
        : purpose === "Сезоны у моря"
          ? "Сезонный сценарий: управление и аренда в ваше отсутствие."
          : "Под постоянную жизнь: школы, врачи, дорога до моря.";

  return { ...base, angle };
}

export function Concierge() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<{ key: string; value: string }[]>([]);
  const [value, setValue] = useState("");
  const { useBlur, d } = useCinematics();
  const done = index >= steps.length;
  const step = steps[index];

  const blurIn = useBlur ? { filter: "blur(10px)" } : {};
  const blurOut = useBlur ? { filter: "blur(0px)" } : {};

  const commit = (answer: string) => {
    if (!answer.trim() || !step) return;
    setAnswers((a) => [...a, { key: step.key, value: answer }]);
    setValue("");
    setIndex((i) => i + 1);
  };

  const picked = suggest(Object.fromEntries(answers.map((a) => [a.key, a.value])));

  return (
    <section id="concierge" className="relative pt-6 pb-32 md:pt-10 md:pb-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <p className="eyebrow mb-8">Частный консьерж</p>
            <h2 className="display-lg">
              <RevealText text="Найдём ваш идеальный объект." />
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Четыре ненавязчивых вопроса вместо формы. В конце — один адрес,
              выбранный под ваш сценарий, и живой ответ от нас.
            </p>
          </div>

          <div className="glass relative min-h-[26rem] rounded-sm p-8 md:p-14">
            <div className="mb-12 flex gap-2">
              {steps.map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: i <= index ? 1 : 0.2 }}
                  transition={{ duration: d(TIMING.surface), ease: EASE }}
                  className="h-px flex-1 bg-primary"
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {!done && step ? (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 26, ...blurIn }}
                  animate={{ opacity: 1, y: 0, ...blurOut }}
                  exit={{ opacity: 0, y: -18, ...blurIn }}
                  transition={{ duration: d(TIMING.rise), ease: EASE }}
                >
                  <h3 className="font-display text-3xl md:text-4xl">{step.question}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{step.hint}</p>

                  {step.options ? (
                    <div className="mt-10 flex flex-wrap gap-3">
                      {step.options.map((o, i) => (
                        <motion.button
                          key={o}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: d(TIMING.rise),
                            delay: d(TIMING.handover + i * TIMING.stagger),
                            ease: EASE,
                          }}
                          onClick={() => commit(o)}
                          className="rounded-full border border-border px-6 py-3 text-sm text-foreground/85 transition-all duration-700 hover:border-primary/45 hover:text-primary"
                        >
                          {o}
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <form
                      className="mt-10 flex items-center gap-4 border-b border-border pb-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        commit(value);
                      }}
                    >
                      <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={step.placeholder}
                        className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground/60"
                      />
                      <button
                        type="submit"
                        className="shrink-0 text-[0.65rem] uppercase tracking-[0.28em] text-primary"
                      >
                        Отправить
                      </button>
                    </form>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 24, ...blurIn }}
                  animate={{ opacity: 1, y: 0, ...blurOut }}
                  transition={{ duration: d(TIMING.reveal), ease: EASE }}
                >
                  <p className="eyebrow mb-6">Подобрано для вас</p>
                  <h3 className="font-display text-4xl gold-text">{picked.name}</h3>
                  <p className="mt-2 text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
                    {picked.where}
                  </p>
                  <p className="mt-6 max-w-sm text-sm leading-relaxed text-foreground/75">
                    {picked.note}
                  </p>
                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: d(TIMING.rise),
                      delay: d(TIMING.handover),
                      ease: EASE,
                    }}
                    className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground"
                  >
                    {picked.angle} Подборка готовится вручную — мы скоро свяжемся.
                  </motion.p>

                  <div className="mt-10 space-y-3 border-t border-border/60 pt-8">
                    {answers.map((a, i) => (
                      <motion.p
                        key={a.key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: d(TIMING.rise),
                          delay: d(TIMING.handover + (i + 1) * TIMING.stagger),
                          ease: EASE,
                        }}
                        className="text-sm text-foreground/70"
                      >
                        <span className="mr-3 text-primary/70">0{i + 1}</span>
                        {a.value}
                      </motion.p>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setAnswers([]);
                      setIndex(0);
                    }}
                    className="mt-10 text-[0.62rem] uppercase tracking-[0.26em] text-muted-foreground transition-colors hover:text-primary"
                  >
                    Начать заново
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {index > 0 && !done && (
              <button
                onClick={() => {
                  setIndex((i) => i - 1);
                  setAnswers((a) => a.slice(0, -1));
                }}
                className="absolute bottom-8 left-8 text-[0.62rem] uppercase tracking-[0.26em] text-muted-foreground transition-colors hover:text-primary md:bottom-14 md:left-14"
              >
                Назад
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
