"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BENEFITS = [
  {
    fig: "01",
    title: "SUSTAINED FOCUS",
    body: "L-theanine and caffeine work in tandem. Alertness without the crash the market keeps promising and failing to deliver.",
  },
  {
    fig: "02",
    title: "METABOLIC EDGE",
    body: "Highest EGCG antioxidant concentration of any tea on record — a compound no regulator has found a way to legislate away.",
  },
  {
    fig: "03",
    title: "CLEAN ENERGY",
    body: "A four-to-six hour release window. No spike, no crash, no comedown. Just a slow, deliberate burn.",
  },
  {
    fig: "04",
    title: "RITUAL CONTROL",
    body: "The whisking is the point. This was never built to be a shortcut product — that's exactly why it holds value.",
  },
];

export default function Benefits() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="relative border-t border-line bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Sticky panel */}
        <div className="top-0 flex h-[50vh] flex-col justify-center border-b border-line px-5 sm:px-10 lg:sticky lg:h-screen lg:border-b-0 lg:border-r">
          <p className="mb-6 text-[11px] tracking-[0.35em] text-accent">
            FIG. 04 — EFFECTS ON FILE
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <span className="font-mono text-[13px] tracking-[0.2em] text-muted-2">
                {BENEFITS[active].fig} / 0{BENEFITS.length}
              </span>
              <h3 className="mt-4 font-sans text-4xl font-semibold uppercase leading-[0.95] tracking-tight text-foreground sm:text-6xl">
                {BENEFITS[active].title}
              </h3>
              <p className="mt-6 max-w-sm font-mono text-[13px] leading-relaxed text-muted">
                {BENEFITS[active].body}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex gap-2">
            {BENEFITS.map((_, i) => (
              <div
                key={i}
                className={
                  "h-[2px] flex-1 transition-colors duration-500 " +
                  (i === active ? "bg-accent" : "bg-line")
                }
              />
            ))}
          </div>
        </div>

        {/* Scroll targets */}
        <div className="flex flex-col">
          {BENEFITS.map((b, i) => (
            <div
              key={b.fig}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="flex min-h-[70vh] items-center border-b border-line px-5 py-16 last:border-b-0 sm:px-10 lg:min-h-screen"
            >
              <div
                className={
                  "transition-opacity duration-500 " +
                  (active === i ? "opacity-100" : "opacity-30")
                }
              >
                <span className="font-mono text-[80px] font-light leading-none text-muted-2 sm:text-[120px]">
                  {b.fig}
                </span>
                <p className="mt-4 font-mono text-[11px] tracking-[0.3em] text-muted">
                  {b.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
