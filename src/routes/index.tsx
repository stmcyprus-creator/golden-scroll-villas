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
      { title: "Meraki — Luxury Residences by the Mediterranean" },
      {
        name: "description",
        content:
          "A private property office curating seafront villas and penthouses in Türkiye, North Cyprus and the UAE.",
      },
      { property: "og:title", content: "Meraki — Luxury Residences by the Mediterranean" },
      {
        property: "og:description",
        content:
          "Seafront villas and penthouses in Türkiye, North Cyprus and the UAE, selected by hand.",
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
