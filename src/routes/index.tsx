import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/experience/Nav";
import { Hero } from "@/components/experience/Hero";
import { StoryScroll } from "@/components/experience/StoryScroll";
import { Residences } from "@/components/experience/Residences";
import { Locations } from "@/components/experience/Locations";
import { Gallery } from "@/components/experience/Gallery";
import { Concierge } from "@/components/experience/Concierge";
import { Footer } from "@/components/experience/Footer";
import { useLenis } from "@/components/experience/useLenis";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Эс тэ эм риал эстейт — элитная недвижимость у Средиземного моря" },
      {
        name: "description",
        content:
          "Частный офис недвижимости: виллы и пентхаусы у моря в Турции, Северном Кипре и ОАЭ.",
      },
      { property: "og:title", content: "Эс тэ эм риал эстейт — элитная недвижимость у Средиземного моря" },
      {
        property: "og:description",
        content:
          "Виллы и пентхаусы у моря в Турции, Северном Кипре и ОАЭ, отобранные вручную.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
