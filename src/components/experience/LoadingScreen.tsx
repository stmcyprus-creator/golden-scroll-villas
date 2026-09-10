import stmLogo from "@/assets/stm-logo-transparent.webp.asset.json";

export function LoadingScreen() {
  return (
    <div
      className="loading-screen"
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