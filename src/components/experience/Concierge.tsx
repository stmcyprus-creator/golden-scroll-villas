import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { RevealText } from "./RevealText";

const EASE = [0.16, 1, 0.3, 1] as const;

type Step = {
  question: string;
  hint: string;
  options?: string[];
  placeholder?: string;
};

const steps: Step[] = [
  {
    question: "Где вы представляете себе пробуждение?",
    hint: "Выберите один вариант — передумать можно позже.",
    options: ["Турция", "Северный Кипр", "ОАЭ", "Ещё думаю"],
  },
  {
    question: "Для чего вам этот дом?",
    hint: "От этого зависит всё, что мы покажем.",
    options: ["Для жизни", "Сезоны у моря", "Инвестиции", "Резидентство"],
  },
  {
    question: "Комфортный бюджет?",
    hint: "Честный диапазон сэкономит время нам обоим.",
    options: ["до € 500K", "€ 500K – 1,5M", "€ 1,5M – 4M", "€ 4M +"],
  },
  {
    question: "И как с вами связаться?",
    hint: "Одно сообщение от реального человека. Никаких рассылок.",
    placeholder: "Email или телефон",
  },
];

export function Concierge() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const done = index >= steps.length;
  const step = steps[index];

  const commit = (answer: string) => {
    if (!answer.trim()) return;
    setAnswers((a) => [...a, answer]);
    setValue("");
    setIndex((i) => i + 1);
  };

  return (
    <section id="concierge" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <p className="eyebrow mb-8">Частный консьерж</p>
            <h2 className="display-lg">
              <RevealText text="Найдём ваш идеальный объект." stagger={0.11} />
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Четыре ненавязчивых вопроса вместо формы. Отвечаем лично, обычно
              в течение нескольких часов.
            </p>
          </div>

          <div className="glass relative min-h-[26rem] rounded-sm p-8 md:p-14">
            <div className="mb-12 flex gap-2">
              {steps.map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: i <= index ? 1 : 0.2 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="h-px flex-1 bg-primary"
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {!done && step ? (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
                  transition={{ duration: 0.9, ease: EASE }}
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
                          transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: EASE }}
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
                  initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.2, ease: EASE }}
                >
                  <h3 className="font-display text-4xl gold-text">Спасибо.</h3>
                  <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                    Ваша подборка готовится вручную. Мы скоро свяжемся.
                  </p>
                  <div className="mt-10 space-y-3">
                    {answers.map((a, i) => (
                      <p key={i} className="text-sm text-foreground/70">
                        <span className="mr-3 text-primary/70">0{i + 1}</span>
                        {a}
                      </p>
                    ))}
                  </div>
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
