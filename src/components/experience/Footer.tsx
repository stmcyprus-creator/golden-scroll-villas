import logo from "@/assets/stm-logo-transparent.webp.asset.json";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 py-16">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 md:flex-row md:items-end md:justify-between md:px-12">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo.url}
              alt="Логотип Эс тэ эм риал эстейт"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <p className="font-display text-base tracking-[0.22em] uppercase">Эс тэ эм риал эстейт</p>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Частный офис недвижимости на Средиземноморье и в Персидском заливе.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>vip@stmrealestate.ru</p>
          <p className="mt-1">Аланья · Киренья · Дубай</p>
        </div>
      </div>
    </footer>
  );
}
