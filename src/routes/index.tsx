import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/experience/Nav";
import { Hero } from "@/components/experience/Hero";
import { StoryScroll } from "@/components/experience/StoryScroll";
import { Trust } from "@/components/experience/Trust";
import { Residences } from "@/components/experience/Residences";
import { Locations } from "@/components/experience/Locations";
import { Gallery } from "@/components/experience/Gallery";
import { Concierge } from "@/components/experience/Concierge";
import { Footer } from "@/components/experience/Footer";
import { Seam } from "@/components/experience/Seam";
import { ChapterBar } from "@/components/experience/ChapterRail";
import { useLenis } from "@/components/experience/useLenis";
import ogHome from "@/assets/og-home.jpg.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "СТМ Реал Эстейт — элитная недвижимость у моря" },
      {
        name: "description",
        content:
          "Частный офис недвижимости: виллы и пентхаусы у моря в Аланье, Кирении и Дубае. Выбор резиденции, сопровождение сделки и консьерж-сервис.",
      },
      { property: "og:title", content: "СТМ Реал Эстейт — элитная недвижимость у моря" },
      {
        property: "og:description",
        content:
          "Виллы и пентхаусы у моря в Турции, Северном Кипре и ОАЭ, отобранные вручную.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:site_name", content: "СТМ Реал Эстейт" },
      { property: "og:url", content: "https://golden-scroll-villas.lovable.app/" },
      { property: "og:image", content: `https://golden-scroll-villas.lovable.app${ogHome.url}` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Вилла у Средиземного моря на закате" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "СТМ Реал Эстейт — элитная недвижимость у моря" },
      {
        name: "twitter:description",
        content: "Виллы и пентхаусы у моря в Аланье, Кирении и Дубае.",
      },
      { name: "twitter:image", content: `https://golden-scroll-villas.lovable.app${ogHome.url}` },
    ],
    links: [{ rel: "canonical", href: "https://golden-scroll-villas.lovable.app/" }],

    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: "СТМ Реал Эстейт",
          url: "https://golden-scroll-villas.lovable.app/",
          email: "info@stmrealestate.ru",
          telephone: "+7 905 681 40 08",
          areaServed: ["Аланья", "Киренья", "Дубай"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();

  return (
    <main className="relative bg-background">
      {/* One continuous atmosphere behind every scene — the film never cuts to black */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(120%_80%_at_50%_0%,oklch(0.83_0.083_87/0.05),transparent_55%),radial-gradient(90%_70%_at_50%_100%,oklch(0.83_0.083_87/0.04),transparent_60%)]"
      />
      <div className="relative z-10">
        <Nav />
        <ChapterBar />
        <Hero />
        <StoryScroll />
        <Seam line="Но прежде чем выбрать место для жизни, выбирают тех, кто будет рядом." />
        <Trust />
        <Seam line="Сначала место. Дом приходит следом." />
        <Locations />
        <Seam line="Из этих миров и рождается коллекция." />
        <Residences />
        <Seam line="Дальше только свет, вода и тишина." />
        <Gallery />
        <Seam line="Дальше — личная встреча и разговор о вашем следующем доме." />
        <Concierge />
        <Footer />
      </div>
    </main>
  );
}
