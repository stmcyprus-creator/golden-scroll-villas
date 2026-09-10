import { useEffect, useState } from "react";
import stmLogo from "@/assets/stm-logo-transparent.webp.asset.json";

const MIN_VISIBLE_MS = 650;
const MAX_VISIBLE_MS = 5000;
const EXIT_MS = 900;

export function LoadingScreen() {
  const [phase, setPhase] = useState<"visible" | "leaving" | "hidden">("visible");

  useEffect(() => {
    const startedAt = performance.now();
    let minimumTimer: number | undefined;

    const finish = () => {
      const remaining = Math.max(0, MIN_VISIBLE_MS - (performance.now() - startedAt));
      minimumTimer = window.setTimeout(() => setPhase("leaving"), remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const safetyTimer = window.setTimeout(() => setPhase("leaving"), MAX_VISIBLE_MS);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(safetyTimer);
      if (minimumTimer !== undefined) window.clearTimeout(minimumTimer);
    };
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