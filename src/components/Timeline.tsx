"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const EVENTS = [
  {
    fig: "01",
    year: "1191",
    title: "INTRODUCTION",
    body: "Monk Eisai carries powdered tea seeds out of China. First recorded crossing of the product into Japanese territory.",
  },
  {
    fig: "02",
    year: "1500s",
    title: "THE UJI PROTOCOL",
    body: "Growers in Uji perfect shade-cultivation. Leaves are starved of light for weeks before harvest — the birth of tencha.",
  },
  {
    fig: "03",
    year: "1738",
    title: "THE CUT",
    body: "Nagatani Soen's processing breakthrough reshapes the trade, splitting the market into ceremonial and bulk grades.",
  },
  {
    fig: "04",
    year: "1990s",
    title: "WESTERN CROSSING",
    body: "Product crosses the Pacific. Cafés in Los Angeles and London begin moving small, unregulated quantities.",
  },
  {
    fig: "05",
    year: "2015 — NOW",
    title: "SUPPLY LOCKDOWN",
    body: "Global demand triples. Ceremonial-grade stock is rationed. Verified suppliers go quiet. The shortage is permanent.",
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [constraint, setConstraint] = useState(0);
  const [dragged, setDragged] = useState(false);
  const reduced = useReducedMotion();
  const progress = useTransform(x, [-constraint || -1, 0], [1, 0]);
  const barScale = useTransform(progress, (v) => Math.max(0.06, v));

  const measure = () => {
    if (!containerRef.current || !trackRef.current) return;
    const c = containerRef.current.offsetWidth;
    const t = trackRef.current.scrollWidth;
    setConstraint(Math.max(0, t - c));
  };

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (reduced || dragged) return;
    // Auto-peek: nudges the track to demonstrate it's draggable, then settles back.
    const controls = animate(x, [0, -70, 0], {
      duration: 1.6,
      delay: 0.9,
      ease: "easeInOut",
      times: [0, 0.6, 1],
    });
    return () => controls.stop();
  }, [reduced, dragged, x]);

  return (
    <section className="relative overflow-hidden border-t border-line bg-background py-16 sm:py-24">
      <div className="mb-10 flex items-end justify-between px-5 sm:px-10">
        <div>
          <p className="text-[11px] tracking-[0.35em] text-accent">
            FIG. 02 — EXHIBIT LOG
          </p>
          <h2 className="mt-2 font-sans text-3xl font-semibold uppercase tracking-tight text-foreground sm:text-5xl">
            Chain of Custody
          </h2>
        </div>
        <p
          className={
            dragged
              ? "text-left text-[11px] leading-relaxed tracking-[0.2em] text-muted sm:text-right"
              : "animate-pulse text-left text-[12px] font-semibold tracking-[0.2em] text-accent sm:text-right"
          }
        >
          ⟵ DRAG TO VIEW ⟶<br />5 RECORDS ON FILE
        </p>
      </div>

      <div
        ref={containerRef}
        className="cursor-grab overflow-hidden px-5 active:cursor-grabbing sm:px-10"
      >
        <motion.div
          ref={trackRef}
          className="flex gap-4 sm:gap-6"
          drag="x"
          dragConstraints={{ left: -constraint, right: 0 }}
          dragElastic={0.08}
          onDragStart={() => setDragged(true)}
          style={{ x }}
        >
          {EVENTS.map((ev) => (
            <article
              key={ev.fig}
              className="w-[76vw] shrink-0 select-none border border-line bg-surface p-6 sm:w-[360px] sm:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] tracking-[0.25em] text-muted">
                  FIG.{ev.fig}
                </span>
                <span className="font-mono text-[11px] tracking-[0.2em] text-accent">
                  {ev.year}
                </span>
              </div>
              <h3 className="mt-8 font-sans text-2xl font-semibold uppercase tracking-tight text-foreground sm:text-3xl">
                {ev.title}
              </h3>
              <p className="mt-4 font-mono text-[12.5px] leading-relaxed text-muted">
                {ev.body}
              </p>
            </article>
          ))}
        </motion.div>
      </div>

      {/* Progress rail */}
      <div className="mx-5 mt-8 h-px bg-line sm:mx-10">
        <motion.div
          className="h-full origin-left bg-accent"
          style={{ scaleX: barScale }}
        />
      </div>
    </section>
  );
}
