export function Footer() {
  return (
    <footer className="relative border-t border-border/60 py-16">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 md:flex-row md:items-end md:justify-between md:px-12">
        <div>
          <p className="font-display text-2xl tracking-[0.22em] uppercase">Meraki</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            A private property office for the Mediterranean and the Gulf.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>concierge@meraki.estate</p>
          <p className="mt-1">Bodrum · Kyrenia · Dubai</p>
        </div>
      </div>
    </footer>
  );
}
