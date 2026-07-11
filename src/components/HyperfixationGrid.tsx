"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const ITEMS = [
  { fig: "01", code: "CHAWAN", note: "wide-mouth bowl, glazed interior", rot: -6 },
  { fig: "02", code: "CHASEN", note: "100-prong bamboo whisk", rot: 4 },
  { fig: "03", code: "CHASHAKU", note: "bamboo scoop, 1 = 1g dose", rot: -3 },
  { fig: "04", code: "CADDY", note: "tin, nitrogen-flushed, light-proof", rot: 7 },
  { fig: "05", code: "CHAKIN", note: "linen cloth, wipes the evidence", rot: -8 },
  { fig: "06", code: "SIFTER", note: "breaks clumps before the pour", rot: 5 },
];

export default function HyperfixationGrid() {
  const boundsRef = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<string | null>(null);
  const [dragged, setDragged] = useState(false);
  const reduced = useReducedMotion();

  return (
    <section className="relative border-t border-line bg-background px-5 py-16 sm:px-10 sm:py-24">
      <div className="mb-6 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] tracking-[0.35em] text-accent">
            FIG. 05 — PERSONAL EFFECTS
          </p>
          <h2 className="mt-2 font-sans text-3xl font-semibold uppercase tracking-tight text-foreground sm:text-5xl">
            Hyperfixation
          </h2>
        </div>
        <p
          className={
            dragged
              ? "text-left text-[11px] leading-relaxed tracking-[0.2em] text-muted sm:text-right"
              : "animate-pulse text-left text-[12px] font-semibold tracking-[0.2em] text-accent sm:text-right"
          }
        >
          ⟡ CLICK AND DRAG ANY CARD ⟡<br className="hidden sm:block" />
          <span className="sm:hidden"> </span>6 ITEMS CATALOGUED
        </p>
      </div>

      <div
        ref={boundsRef}
        className="relative h-[520px] overflow-hidden border border-dashed border-line bg-surface/40 sm:h-[620px]"
      >
        <div
          aria-hidden
          className="grain pointer-events-none absolute inset-0 opacity-[0.04]"
        />
        {ITEMS.map((it, i) => (
          <motion.article
            key={it.fig}
            drag
            dragConstraints={boundsRef}
            dragElastic={0.15}
            dragMomentum={false}
            onDragStart={() => {
              setTop(it.fig);
              setDragged(true);
            }}
            whileDrag={{ scale: 1.06, cursor: "grabbing" }}
            initial={{
              rotate: it.rot,
              x: 24 + (i % 3) * 200,
              y: 24 + Math.floor(i / 3) * 230,
            }}
            animate={
              i === 0 && !reduced && !dragged
                ? { rotate: [it.rot, it.rot - 12, it.rot + 9, it.rot - 5, it.rot] }
                : undefined
            }
            transition={
              i === 0 && !reduced && !dragged
                ? { duration: 1.6, delay: 0.9, ease: "easeInOut", times: [0, 0.25, 0.55, 0.8, 1] }
                : undefined
            }
            style={{ zIndex: top === it.fig ? 20 : 10 - i, touchAction: "none" }}
            className="absolute w-[150px] cursor-grab select-none border border-line bg-gradient-to-b from-surface-2 to-surface p-3 shadow-[0_8px_24px_rgba(0,0,0,0.4)] sm:w-[180px] sm:p-4"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-[9px] tracking-[0.2em] text-muted-2">
                FIG.{it.fig}
              </span>
            </div>
            <div className="mt-2 flex h-16 items-center justify-center border border-dashed border-line bg-background/60 sm:h-20">
              <div className="h-8 w-8 rounded-sm bg-gradient-to-br from-accent/25 to-accent/5 ring-1 ring-white/10" />
            </div>
            <p className="mt-2 font-mono text-[11px] font-medium tracking-[0.1em] text-foreground">
              {it.code}
            </p>
            <p className="mt-1 font-mono text-[9.5px] leading-snug tracking-[0.05em] text-muted">
              {it.note}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
