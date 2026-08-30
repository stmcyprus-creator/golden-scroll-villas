import { Link } from "@tanstack/react-router";
import logo from "@/assets/stm-logo-transparent.webp.asset.json";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 py-16">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 md:flex-row md:items-end md:justify-between md:px-12">
        <div>
          <div className="flex items-center gap-3">
            <Link to="/" aria-label="На главную" className="shrink-0">
              <img
                src={logo.url}
                alt="Логотип СТМ Реал Эстейт"
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
                className="logo-mark h-10 w-10 object-contain"
              />
            </Link>
            <p className="font-display text-base tracking-[0.22em] uppercase">СТМ Реал Эстейт</p>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Частный офис недвижимости на Средиземноморье и в Персидском заливе.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>info@stmrealestate.ru</p>
          <p className="mt-1">
            <a href="tel:+79056814008">+7 905 681 40 08</a>
          </p>
          <p className="mt-1">
            <a href="https://wa.me/79056814008" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </p>
          <p className="mt-1">Аланья · Киренья · Дубай</p>
          <p className="mt-4">
            <Link to="/privacy" className="transition-colors hover:text-primary">
              Политика обработки персональных данных
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
