import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const links = [
  { label: "История", href: "#story" },
  { label: "Резиденции", href: "#residences" },
  { label: "Локации", href: "#locations" },
  { label: "Галерея", href: "#gallery" },
  { label: "Консьерж", href: "#concierge" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 2.4, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 md:px-12 md:py-8">
          <a href="#top" className="font-display text-xl tracking-[0.22em] uppercase">
            Эс тэ эм риал эстейт
          </a>
          <nav className="hidden items-center gap-10 lg:flex">
            {links.slice(0, 4).map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[0.7rem] uppercase tracking-[0.24em] text-foreground/70 transition-colors duration-500 hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => setOpen(true)}
            className="glass flex items-center gap-3 rounded-full px-5 py-2.5 text-[0.68rem] uppercase tracking-[0.24em] transition-colors duration-500 hover:text-primary"
            aria-label="Открыть меню"
          >
            Меню
            <span className="flex flex-col gap-[3px]">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60]"
            initial={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(10,14,20,0)" }}
            animate={{ backdropFilter: "blur(28px)", backgroundColor: "rgba(10,14,20,0.55)" }}
            exit={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(10,14,20,0)" }}
            transition={{ duration: 0.9, ease: EASE }}
            onClick={() => setOpen(false)}
          >
            <motion.aside
              className="glass absolute inset-y-0 right-0 flex w-full max-w-xl flex-col justify-between p-10 md:p-16"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.05, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="text-[0.68rem] uppercase tracking-[0.28em] text-foreground/60 transition-colors hover:text-primary"
                >
                  Закрыть
                </button>
              </div>

              <nav className="flex flex-col gap-3">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1, delay: 0.35 + i * 0.11, ease: EASE }}
                    className="font-display text-4xl font-light tracking-tight text-foreground/85 transition-colors duration-500 hover:text-primary md:text-5xl"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 1, ease: EASE }}
                className="space-y-1 text-sm text-muted-foreground"
              >
                <p className="eyebrow">Частный офис</p>
                <p>Бодрум · Кирения · Дубай</p>
                <p>concierge@stm.realestate</p>
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
