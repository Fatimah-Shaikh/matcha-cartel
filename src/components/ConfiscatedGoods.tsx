"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Status = "HELD" | "PENDING" | "FLAGGED";

const ITEMS: { fig: string; code: string; seized: string; note: string; status: Status }[] = [
  { fig: "01", code: "LOT — CEREMONIAL", seized: "LOT 4471", note: "grade: ceremonial, first flush", status: "HELD" },
  { fig: "02", code: "LOT — CEREMONIAL RESERVE", seized: "LOT 4472", note: "origin: undisclosed grower", status: "HELD" },
  { fig: "03", code: "LOT — PREMIUM CULINARY", seized: "LOT 4488", note: "purity: 98.2%", status: "PENDING" },
  { fig: "04", code: "LOT — COOKING GRADE", seized: "LOT 4501", note: "weight: 2.4kg, bulk seizure", status: "HELD" },
  { fig: "05", code: "LOT — HOUJICHA BLEND", seized: "LOT 4519", note: "route: coastal, unverified", status: "FLAGGED" },
  { fig: "06", code: "LOT — GENMAICHA BLEND", seized: "LOT 4523", note: "handler: unknown", status: "HELD" },
];

export default function ConfiscatedGoods() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0.5, y: 0.4 });
  const current = useRef({ x: 0.5, y: 0.4 });
  const raf = useRef<number | null>(null);
  const [moved, setMoved] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = sectionRef.current;
    if (!el) return;

    const setFromEvent = (clientX: number, clientY: number) => {
      const r = el.getBoundingClientRect();
      target.current.x = Math.min(Math.max((clientX - r.left) / r.width, 0), 1);
      target.current.y = Math.min(Math.max((clientY - r.top) / r.height, 0), 1);
    };

    const onMove = (e: MouseEvent) => {
      setFromEvent(e.clientX, e.clientY);
      if (!moved) setMoved(true);
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      setFromEvent(t.clientX, t.clientY);
      if (!moved) setMoved(true);
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.16;
      current.current.y += (target.current.y - current.current.y) * 0.16;
      el.style.setProperty("--mx", (current.current.x * 100).toFixed(2) + "%");
      el.style.setProperty("--my", (current.current.y * 100).toFixed(2) + "%");
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("touchmove", onTouch, { passive: true });
    el.addEventListener("touchstart", onTouch, { passive: true });
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("touchmove", onTouch);
      el.removeEventListener("touchstart", onTouch);
    };
  }, [moved, reduced]);

  const maskStyle: React.CSSProperties = reduced
    ? { background: "transparent" }
    : {
        background:
          "radial-gradient(circle 190px at var(--mx,50%) var(--my,40%)," +
          "transparent 0%, transparent 34%, rgba(0,0,0,0.55) 58%, rgba(5,6,7,0.97) 78%)",
      };

  const glowStyle: React.CSSProperties = reduced
    ? { opacity: 0 }
    : {
        background:
          "radial-gradient(circle 170px at var(--mx,50%) var(--my,40%)," +
          "rgba(200,255,92,0.22) 0%, rgba(200,255,92,0.10) 40%, transparent 70%)",
      };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden border-t border-line bg-[#050607] px-5 py-16 font-mono sm:px-10 sm:py-24 select-none"
    >
      <div className="relative z-30 mb-10 flex items-end justify-between border-b border-line pb-4">
        <div>
          <p className="text-[11px] tracking-[0.35em] text-accent">FIG. 06 — EXHIBIT</p>
          <h2 className="mt-2 font-sans text-3xl font-semibold uppercase tracking-tight text-foreground sm:text-5xl">
            Confiscated Goods
          </h2>
        </div>
        <p className="hidden text-right text-[11px] leading-relaxed tracking-[0.2em] text-muted sm:block">
          EVIDENCE ROOM<br />ACCESS: RESTRICTED
        </p>
      </div>

      <div className="relative">
        <div className="relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {ITEMS.map((it) => (
            <article
              key={it.fig}
              className="group relative aspect-[4/5] border border-line bg-gradient-to-b from-surface-2 to-surface p-3 sm:p-4"
            >
              <div className="flex items-start justify-between">
                <span className="text-[11px] tracking-[0.25em] text-muted">
                  FIG.{it.fig}
                </span>
                <span
                  className={
                    "text-[9px] tracking-[0.2em] px-1.5 py-0.5 border " +
                    (it.status === "FLAGGED"
                      ? "border-danger/40 text-danger/80"
                      : it.status === "PENDING"
                      ? "border-warn/40 text-warn/80"
                      : "border-white/15 text-muted")
                  }
                >
                  {it.status}
                </span>
              </div>

              <div className="mt-3 flex h-1/2 items-center justify-center border border-dashed border-line bg-background/60">
                <div className="h-10 w-10 rounded-sm bg-gradient-to-br from-accent/25 to-accent/5 ring-1 ring-white/10" />
              </div>

              <div className="mt-3">
                <p className="text-sm font-semibold tracking-[0.1em] text-foreground">
                  {it.code}
                </p>
                <p className="mt-1 text-[11px] tracking-[0.12em] text-muted">
                  {it.seized}
                </p>
                <p className="text-[11px] tracking-[0.12em] text-muted-2">
                  {it.note}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 mix-blend-screen transition-opacity duration-500"
          style={glowStyle}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20" style={maskStyle} />
      </div>

      {!reduced && (
        <p
          className={
            "relative z-30 mt-8 text-center text-[11px] tracking-[0.3em] text-muted transition-opacity duration-700 " +
            (moved ? "opacity-0" : "opacity-100")
          }
        >
          ⟵ MOVE THE LIGHT TO INSPECT ⟶
        </p>
      )}

      <div
        aria-hidden
        className="grain pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
      />
    </section>
  );
}
