import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "./orchestrator";

const STORAGE_KEY = "stm-cookie-consent";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let t: number | undefined;
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        t = window.setTimeout(() => setVisible(true), 1800);
      }
    } catch {
      /* приватный режим — просто не показываем повторно в рамках сессии */
    }
    return () => {
      if (t !== undefined) window.clearTimeout(t);
    };
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-xl md:inset-x-6 md:bottom-6"
          role="dialog"
          aria-live="polite"
          aria-label="Уведомление об использовании cookie"
        >
          <div className="glass rounded-2xl p-5 shadow-[0_24px_60px_-20px_oklch(0_0_0/0.7)] md:p-6">
            <p className="eyebrow mb-2">Конфиденциальность</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Мы используем файлы cookie, чтобы сайт работал стабильно, а впечатление от него
              оставалось безупречным. Продолжая пользоваться сайтом, вы соглашаетесь с{" "}
              <Link
                to="/privacy"
                className="text-primary underline-offset-4 transition-colors hover:underline"
              >
                политикой обработки персональных данных
              </Link>
              .
            </p>
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={accept}
                className="rounded-full bg-primary px-6 py-2.5 text-xs font-medium tracking-[0.14em] uppercase text-primary-foreground transition-all duration-500 hover:brightness-110"
              >
                Принять
              </button>
              <Link
                to="/privacy"
                className="text-xs tracking-[0.1em] uppercase text-muted-foreground transition-colors hover:text-primary"
              >
                Подробнее
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
