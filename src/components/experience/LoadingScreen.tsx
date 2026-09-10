import { useEffect, useState } from "react";
import stmLogo from "@/assets/stm-logo-transparent.webp.asset.json";

const VISIBLE_MS = 700;
const EXIT_MS = 900;

export function LoadingScreen() {
  const [phase, setPhase] = useState<"visible" | "leaving" | "hidden">("visible");

  useEffect(() => {
    // Hydration means the page is already interactive. Do not wait for every
    // large photograph to finish downloading before revealing it.
    const revealTimer = window.setTimeout(() => setPhase("leaving"), VISIBLE_MS);
    return () => window.clearTimeout(revealTimer);
  }, []);

  useEffect(() => {
    if (phase !== "leaving") return;
    const exitTimer = window.setTimeout(() => setPhase("hidden"), EXIT_MS);
    return () => window.clearTimeout(exitTimer);
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div
      className={`loading-screen ${phase === "leaving" ? "loading-screen--leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Загрузка страницы"
    >
      <div className="loading-screen__content">
        <img
          src={stmLogo.url}
          alt=""
          width={72}
          height={72}
          className="logo-mark h-[4.5rem] w-[4.5rem] object-contain"
        />
        <p className="loading-screen__brand">СТМ Реал Эстейт</p>
        <div className="loading-screen__track" aria-hidden="true">
          <span className="loading-screen__progress" />
        </div>
        <p className="loading-screen__label">Открываем вашу коллекцию</p>
      </div>
    </div>
  );
}