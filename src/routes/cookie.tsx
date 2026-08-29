import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/experience/Nav";
import { Footer } from "@/components/experience/Footer";

export const Route = createFileRoute("/cookie")({
  head: () => ({
    meta: [
      { title: "Политика использования файлов cookie — СТМ Реал Эстейт" },
      {
        name: "description",
        content:
          "Политика использования файлов cookie на сайте СТМ Реал Эстейт: какие cookie мы используем, зачем они нужны и как ими управлять.",
      },
      {
        property: "og:title",
        content: "Политика использования файлов cookie — СТМ Реал Эстейт",
      },
      {
        property: "og:description",
        content:
          "Какие cookie использует сайт СТМ Реал Эстейт, цели их обработки и способы управления.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:site_name", content: "СТМ Реал Эстейт" },
      { property: "og:url", content: "https://golden-scroll-villas.lovable.app/cookie" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Политика использования файлов cookie — СТМ Реал Эстейт",
      },
      {
        name: "twitter:description",
        content: "Какие cookie использует сайт, цели обработки и способы управления.",
      },
    ],
    links: [{ rel: "canonical", href: "https://golden-scroll-villas.lovable.app/cookie" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Политика использования файлов cookie",
          url: "https://golden-scroll-villas.lovable.app/cookie",
          inLanguage: "ru-RU",
          isPartOf: {
            "@type": "WebSite",
            name: "СТМ Реал Эстейт",
            url: "https://golden-scroll-villas.lovable.app/",
          },
          publisher: {
            "@type": "RealEstateAgent",
            name: "СТМ Реал Эстейт",
            email: "info@stmrealestate.ru",
            telephone: "+79056814008",
          },
        }),
      },
    ],
  }),
  component: CookiePolicyPage,
});

const sections: { title: string; body: string[] }[] = [
  {
    title: "1. Что такое cookie",
    body: [
      "Cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении сайта. Они помогают сайту запоминать ваши действия и настройки, чтобы впечатление от каждого визита оставалось безупречным.",
    ],
  },
  {
    title: "2. Какие cookie мы используем",
    body: [
      "Технические (необходимые) cookie — обеспечивают корректную работу сайта: запоминают ваш выбор в уведомлении о cookie и настройки отображения. Без них сайт не сможет функционировать должным образом.",
      "Аналитические cookie — помогают нам понимать, как посетители взаимодействуют с сайтом, какие разделы вызывают наибольший интерес, и улучшать структуру коллекции. Данные собираются в обезличенном виде.",
    ],
  },
  {
    title: "3. Цели использования",
    body: [
      "Мы используем cookie исключительно для стабильной работы сайта, сохранения ваших предпочтений и улучшения качества сервиса. Cookie не используются для передачи данных третьим лицам в рекламных целях.",
    ],
  },
  {
    title: "4. Как управлять cookie",
    body: [
      "Вы можете в любой момент ограничить или отключить cookie в настройках вашего браузера. Обратите внимание: отключение технических cookie может повлиять на корректность отображения отдельных элементов сайта.",
      "Согласие на использование cookie, данное в уведомлении на сайте, можно отозвать, очистив данные сайта в настройках браузера — при следующем визите уведомление появится снова.",
    ],
  },
  {
    title: "5. Связь с другими документами",
    body: [
      "Настоящая Политика использования файлов cookie дополняет Политику в отношении обработки персональных данных, размещённую на странице /privacy.",
    ],
  },
  {
    title: "6. Контакты",
    body: [
      "По всем вопросам, связанным с использованием cookie, вы можете обратиться по адресу info@stmrealestate.ru или по телефону +7 905 681 40 08.",
      "Мы вправе вносить изменения в настоящую Политику; актуальная редакция размещается на этой странице.",
    ],
  },
];

function CookiePolicyPage() {
  return (
    <main className="relative bg-background">
      <div className="relative z-10">
        <Nav />
        <section className="mx-auto max-w-[900px] px-6 pt-40 pb-28 md:px-12 md:pt-52 md:pb-40">
          <p className="eyebrow mb-8">Правовая информация</p>
          <h1 className="display-lg">Политика использования файлов cookie</h1>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            Редакция от 29 августа 2026 года.
          </p>

          <div className="mt-16 space-y-12">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-2xl md:text-3xl">{s.title}</h2>
                <div className="mt-4 space-y-4">
                  {s.body.map((p) => (
                    <p key={p} className="text-sm leading-relaxed text-foreground/75">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-8">
            <Link
              to="/privacy"
              className="text-[0.65rem] uppercase tracking-[0.28em] text-primary transition-colors hover:text-primary/80"
            >
              Политика персональных данных
            </Link>
            <Link
              to="/"
              className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-primary"
            >
              На главную
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
}
