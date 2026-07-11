"use client";

import { motion } from "framer-motion";

const DEALERS = [
  {
    fig: "01",
    alias: "UJI",
    role: "THE GROWER",
    region: "Kyoto Prefecture, JP",
    note: "Controls shade timing and first-flush harvest windows.",
  },
  {
    fig: "02",
    alias: "STONE",
    role: "THE GRINDER",
    region: "Uji, JP",
    note: "40 grams an hour. Refuses to run the wheels any faster.",
  },
  {
    fig: "03",
    alias: "ROUTE 9",
    role: "THE COURIER",
    region: "Pacific corridor",
    note: "Cold-chain logistics. Nobody has seen the face on the manifest.",
  },
  {
    fig: "04",
    alias: "PALATE",
    role: "THE TASTER",
    region: "Los Angeles, US",
    note: "Grades every lot before it clears. Final word on ceremonial status.",
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-[#050607] px-5 py-16 sm:px-10 sm:py-24">
      <div
        aria-hidden
        className="grain pointer-events-none absolute inset-0 opacity-[0.03]"
      />

      <div className="relative mb-12 flex items-end justify-between border-b border-line pb-4">
        <div>
          <p className="text-[11px] tracking-[0.35em] text-accent">
            FIG. 08 — PERSONS OF INTEREST
          </p>
          <h2 className="mt-2 font-sans text-3xl font-semibold uppercase tracking-tight text-foreground sm:text-5xl">
            The Dealers
          </h2>
        </div>
        <p className="hidden text-right text-[11px] leading-relaxed tracking-[0.2em] text-muted sm:block">
          4 SUBJECTS ON FILE<br />IDENTITIES WITHHELD
        </p>
      </div>

      <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {DEALERS.map((d, i) => (
          <motion.article
            key={d.fig}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            className="border border-line bg-surface p-5"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] tracking-[0.25em] text-muted-2">
                FIG.{d.fig}
              </span>
              <span className="border border-line px-1.5 py-0.5 font-mono text-[9px] tracking-[0.2em] text-muted">
                UNIDENTIFIED
              </span>
            </div>

            <div className="mt-4 flex h-28 items-center justify-center border border-dashed border-line bg-background/60">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent/20 to-transparent ring-1 ring-white/10" />
            </div>

            <p className="mt-4 font-mono text-[11px] tracking-[0.2em] text-accent">
              {d.role}
            </p>
            <p className="mt-1 font-sans text-xl font-semibold uppercase tracking-tight text-foreground">
              &ldquo;{d.alias}&rdquo;
            </p>
            <p className="mt-1 font-mono text-[11px] tracking-[0.1em] text-muted-2">
              {d.region}
            </p>
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted">
              {d.note}
            </p>
          </motion.article>
        ))}
      </div>

      <div className="relative mt-16 flex flex-col gap-6 border-t border-line pt-8 font-mono text-[11px] tracking-[0.2em] text-muted-2 sm:flex-row sm:items-center sm:justify-between">
        <span>MATCHA CARTEL © {new Date().getFullYear()}</span>
        <span>CASE NO. 4471-MC — STATUS: OPEN</span>
        <span className="text-accent/70">END OF DOSSIER</span>
      </div>
    </footer>
  );
}
