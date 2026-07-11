"use client";

import WordmarkDistort from "./WordmarkDistort";

const CELLS = Array.from({ length: 15 }, (_, i) => {
  const n = i + 1;
  return {
    fig: String(n).padStart(2, "0"),
    lot: "LOT-" + String((n * 37) % 90 + 10).padStart(2, "0"),
    angle: (n * 53) % 360,
    hue: 78 + ((n * 17) % 30),
  };
});

export default function Archive() {
  return (
    <section className="relative border-t border-line bg-[#050607] px-5 py-16 font-mono sm:px-10 sm:py-24">
      <div className="mb-10 flex items-end justify-between border-b border-line pb-4">
        <div>
          <p className="text-[11px] tracking-[0.35em] text-accent">FIG. 09 — SPECIMEN ARCHIVE</p>
          <h2 className="mt-2 font-sans text-3xl font-semibold uppercase tracking-tight text-foreground sm:text-5xl">
            The Archive
          </h2>
        </div>
        <p className="hidden text-right text-[11px] leading-relaxed tracking-[0.2em] text-muted sm:block">
          HOVER TO DECLASSIFY<br />15 SPECIMENS ON FILE
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_220px]">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3">
          {CELLS.map((c) => (
            <div
              key={c.fig}
              className="group relative aspect-square cursor-crosshair overflow-hidden border border-line"
            >
              <div
                aria-hidden
                className="absolute inset-0 grayscale transition-[filter,transform] duration-500 ease-out group-hover:scale-110 group-hover:grayscale-0"
                style={{
                  background: `linear-gradient(${c.angle}deg, hsl(${c.hue} 65% 22%), hsl(${c.hue} 70% 12%) 60%, #0b0d0a)`,
                }}
              />
              <div
                aria-hidden
                className="grain absolute inset-0 opacity-30 mix-blend-overlay"
              />
              <span className="absolute left-1.5 top-1.5 text-[9px] tracking-[0.2em] text-muted-2 transition-colors duration-300 group-hover:text-background/70">
                ({c.fig})
              </span>
              <span className="absolute bottom-1.5 left-1.5 translate-y-1 text-[9px] font-semibold tracking-[0.15em] text-accent opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {c.lot}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden flex-col justify-between lg:flex">
          <p className="text-[13px] font-semibold uppercase leading-snug tracking-[0.05em] text-foreground">
            The world&rsquo;s most desired green powder.
          </p>
          <div className="flex flex-col items-end gap-1.5">
            {Array.from({ length: 8 }, (_, i) => (
              <span
                key={i}
                className={
                  "h-1.5 w-1.5 " + (i === 0 ? "bg-accent" : "bg-line")
                }
              />
            ))}
          </div>
          <p className="text-[11px] leading-relaxed tracking-[0.1em] text-muted">
            Tracked. Graded. Distributed. What looks like tea moves like a commodity.
          </p>
        </div>
      </div>

      <WordmarkDistort
        lines={["MATCHA CARTEL", "抹茶カルテル"]}
        className="mt-16 h-[22vw] max-h-[260px] min-h-[140px] w-full sm:h-[16vw]"
      />

      <p className="mt-4 text-right text-[11px] tracking-[0.3em] text-muted">
        (MOVE TO DISTORT)
      </p>
    </section>
  );
}
