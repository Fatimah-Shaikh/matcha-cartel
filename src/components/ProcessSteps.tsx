"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { fig: "01", label: "SIFT", detail: "Break every clump. Aeration determines the foam." },
  { fig: "02", label: "MEASURE", detail: "2 grams. One chashaku scoop, level, no more." },
  { fig: "03", label: "ADD WATER", detail: "80°C. Boiling water burns the compound out." },
  { fig: "04", label: "WHISK", detail: "W-motion, wrist only, 15 seconds to a fine foam." },
  { fig: "05", label: "SERVE", detail: "Immediately. This product does not wait." },
];

export default function ProcessSteps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reduced) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2600",
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
      className="relative h-[100svh] overflow-hidden border-t border-line bg-background"
    >
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col px-5 py-10 sm:px-10 sm:py-14">
        <div className="flex items-start justify-between border-b border-line pb-4">
          <div>
            <p className="text-[11px] tracking-[0.35em] text-accent">
              FIG. 07 — STANDARD PROCEDURE
            </p>
            <h2 className="mt-2 font-sans text-3xl font-semibold uppercase tracking-tight text-foreground sm:text-5xl">
              Preparation Protocol
            </h2>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-8 py-8 sm:grid-cols-[220px_1fr] sm:py-12">
          {/* Step index */}
          <ol className="flex flex-row gap-4 overflow-x-auto sm:flex-col sm:gap-3 sm:overflow-visible">
            {STEPS.map((s, i) => (
              <li
                key={s.fig}
                className={
                  "flex shrink-0 items-center gap-3 border-l-2 py-1.5 pl-3 font-mono text-[12px] tracking-[0.15em] transition-colors duration-400 " +
                  (i === active
                    ? "border-accent text-foreground"
                    : "border-line text-muted-2")
                }
              >
                <span>{s.fig}</span>
                <span>{s.label}</span>
              </li>
            ))}
          </ol>

          {/* Active step display */}
          <div className="flex flex-col justify-center">
            <div className="flex items-end gap-6">
              <span className="font-sans text-[26vw] font-semibold leading-[0.8] text-transparent [-webkit-text-stroke:2px_var(--color-accent)] sm:text-[10rem]">
                {STEPS[active].fig}
              </span>
              <h3 className="mb-3 font-sans text-3xl font-semibold uppercase tracking-tight text-foreground sm:text-6xl">
                {STEPS[active].label}
              </h3>
            </div>
            <p className="mt-6 max-w-md font-mono text-[13px] leading-relaxed text-muted">
              {STEPS[active].detail}
            </p>

            <div className="mt-10 h-px w-full max-w-md bg-line">
              <div
                className="h-full bg-accent transition-all duration-500"
                style={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
