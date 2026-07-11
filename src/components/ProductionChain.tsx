"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { fig: "01", label: "HARVEST", note: "First flush leaves, hand-picked at dawn" },
  { fig: "02", label: "SHADE", note: "Tarped for 20+ days to spike chlorophyll" },
  { fig: "03", label: "STEAM", note: "Fixed within hours to halt oxidation" },
  { fig: "04", label: "STONE-GRIND", note: "Granite wheels, 40g per hour, no shortcuts" },
  { fig: "05", label: "PACKAGE", note: "Nitrogen-sealed, sealed, and moved same night" },
];

export default function ProductionChain() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reduced) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2400",
        pin: true,
        scrub: 0.4,
        onUpdate: (self) => {
          const idx = Math.min(
            STEPS.length - 1,
            Math.floor(self.progress * STEPS.length)
          );
          setActive(idx);
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden border-t border-line bg-[#050607]"
    >
      {/* Synthesized looping "process feed" background in place of source footage */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#060807_0%,#0a0d0a_60%,#050607_100%)]" />
        <div className="absolute inset-0 opacity-[0.55] [background-size:220px_2px] [background-image:repeating-linear-gradient(90deg,rgba(200,255,92,0.09)_0px,rgba(200,255,92,0.09)_1px,transparent_1px,transparent_220px)] animate-marquee" />
        <div className="absolute inset-0 opacity-40 [background-size:3px_60px] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_60px)]" />
        <div className="grain absolute inset-0 opacity-[0.05]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_20%,rgba(5,6,7,0.85)_85%)]" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between px-5 py-10 sm:px-10 sm:py-14">
        <div className="flex items-start justify-between border-b border-line pb-4">
          <div>
            <p className="text-[11px] tracking-[0.35em] text-accent">
              FIG. 03 — PROCESSING FEED
            </p>
            <h2 className="mt-2 font-sans text-3xl font-semibold uppercase tracking-tight text-foreground sm:text-5xl">
              Production Chain
            </h2>
          </div>
          <span className="hidden font-mono text-[11px] tracking-[0.2em] text-muted sm:block">
            LIVE FEED · CAM 04
          </span>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-baseline gap-4 font-mono text-[11px] tracking-[0.25em] text-muted">
            <span>STEP {String(active + 1).padStart(2, "0")} / 05</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            {STEPS.map((s, i) => (
              <div
                key={s.fig}
                className={
                  "flex-1 min-w-[140px] border p-4 transition-colors duration-500 sm:p-5 " +
                  (i === active
                    ? "border-accent/50 bg-accent-dim"
                    : "border-line bg-surface/60")
                }
              >
                <p
                  className={
                    "font-mono text-[10px] tracking-[0.25em] " +
                    (i === active ? "text-accent" : "text-muted-2")
                  }
                >
                  FIG.{s.fig}
                </p>
                <p
                  className={
                    "mt-3 font-sans text-lg font-semibold uppercase tracking-tight sm:text-xl " +
                    (i === active ? "text-foreground" : "text-muted")
                  }
                >
                  {s.label}
                </p>
                <p
                  className={
                    "mt-2 font-mono text-[11px] leading-relaxed transition-opacity duration-500 " +
                    (i === active ? "opacity-100 text-muted" : "opacity-0 sm:opacity-40")
                  }
                >
                  {s.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
