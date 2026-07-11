"use client";

import { motion } from "framer-motion";
import WorldClock from "./WorldClock";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-background px-5 pt-6 sm:px-10">
      <div
        aria-hidden
        className="grain pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,255,92,0.06),transparent_60%)]"
      />

      {/* Top bar: dossier meta + world clock */}
      <div className="relative z-10 flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="text-[10px] tracking-[0.3em] text-accent">
            CASE NO. 4471-MC
          </span>
          <span className="hidden text-[10px] tracking-[0.3em] text-muted sm:inline">
            CLASSIFICATION: RESTRICTED
          </span>
        </div>
        <WorldClock />
      </div>

      {/* Headline */}
      <div className="relative z-10 flex flex-1 flex-col justify-center py-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-3 font-mono text-[11px] tracking-[0.35em] text-muted"
        >
          FIG. 01 — SUBJECT PROFILE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="font-sans text-[16vw] font-semibold uppercase leading-[0.82] tracking-tight text-foreground sm:text-[12vw] lg:text-[10rem]"
        >
          MATCHA
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="mt-3 font-sans text-[7vw] font-medium uppercase leading-[0.9] tracking-tight text-stroke sm:mt-4 sm:text-[4.5vw] lg:text-[3.5rem]"
        >
          Is a controlled substance.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 max-w-md font-mono text-[13px] leading-relaxed text-muted"
        >
          Ceremonial grade. Unregulated. Global demand has outpaced
          verified supply since 2015. This dossier documents the trade,
          the route, and the ritual — restricted access only.
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-10 flex items-center justify-between border-t border-line py-4 text-[10px] tracking-[0.3em] text-muted"
      >
        <span>ORIGIN: UJI, KYOTO PREFECTURE</span>
        <span className="flex items-center gap-2">
          SCROLL TO CONTINUE
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block text-accent"
          >
            ↓
          </motion.span>
        </span>
      </motion.div>
    </section>
  );
}
