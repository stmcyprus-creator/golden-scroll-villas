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
import { useLenis } from "@/components/experience/useLenis";
import ogHome from "@/assets/og-home.jpg.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Эс тэ эм риал эстейт — элитная недвижимость у моря" },
      {
        name: "description",
        content:
          "Частный офис недвижимости: виллы и пентхаусы у моря в Аланье, Кирении и Дубае. Подбор, сопровождение сделки и консьерж-сервис.",
      },
      { property: "og:title", content: "Эс тэ эм риал эстейт — элитная недвижимость у моря" },
      {
        property: "og:description",
        content:
          "Виллы и пентхаусы у моря в Турции, Северном Кипре и ОАЭ, отобранные вручную.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:site_name", content: "Эс тэ эм риал эстейт" },
      { property: "og:url", content: "https://golden-scroll-villas.lovable.app/" },
      { property: "og:image", content: `https://golden-scroll-villas.lovable.app${ogHome.url}` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Вилла у Средиземного моря на закате" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Эс тэ эм риал эстейт — элитная недвижимость у моря" },
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
          name: "Эс тэ эм риал эстейт",
          url: "https://golden-scroll-villas.lovable.app/",
          email: "vip@stmrealestate.ru",
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
      <Nav />
      <Hero />
      <StoryScroll />
      <Residences />
      <Locations />
      <Gallery />
      <Concierge />
      <Footer />
    </main>
  );
}
