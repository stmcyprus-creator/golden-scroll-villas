import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import stmLogo from "../assets/stm-logo-transparent.webp.asset.json";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CookieNotice } from "../components/experience/CookieNotice";

function NotFoundComponent() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      {/* Атмосфера лендинга: мягкое золотое свечение и виньетка */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,oklch(0.83_0.083_87/0.06),transparent_55%),radial-gradient(90%_70%_at_50%_100%,oklch(0.83_0.083_87/0.05),transparent_60%)]"
      />
      <div className="relative z-10 max-w-2xl text-center">
        <img
          src={stmLogo.url}
          alt="Логотип СТМ Реал Эстейт"
          width={56}
          height={56}
          className="logo-mark mx-auto h-14 w-14 object-contain"
        />
        <p className="eyebrow mt-10">Страница не найдена</p>
        <h1 className="display-xl mt-4">
          <span className="gold-text">404</span>
        </h1>
        <p className="display-lg mt-6">Этой страницы нет в нашей коллекции</p>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
          Возможно, адрес изменился или страница была перемещена. Вернёмся туда, где начинается
          путешествие.
        </p>
        <div className="hairline mx-auto mt-10 max-w-xs" />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="rounded-full bg-primary px-8 py-3 text-xs font-medium tracking-[0.18em] uppercase text-primary-foreground transition-all duration-500 hover:brightness-110"
          >
            На главную
          </Link>
          <a
            href="https://wa.me/79056814008"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.14em] uppercase text-muted-foreground transition-colors hover:text-primary"
          >
            Написать в WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Страница не загрузилась
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Что-то пошло не так на нашей стороне. Попробуйте обновить страницу или вернуться на главную.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Попробовать снова
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            На главную
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "СТМ Реал Эстейт" },
      { name: "description", content: "Элитная недвижимость у Средиземного моря и в ОАЭ" },
      { name: "author", content: "СТМ Реал Эстейт" },
      { property: "og:title", content: "СТМ Реал Эстейт" },
      { property: "og:description", content: "Элитная недвижимость у Средиземного моря и в ОАЭ" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@stmrealestate" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      {
        rel: "preload",
        as: "image",
        type: "image/webp",
        href: stmLogo.url,
        fetchPriority: "high",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <CookieNotice />
    </QueryClientProvider>
  );
}
