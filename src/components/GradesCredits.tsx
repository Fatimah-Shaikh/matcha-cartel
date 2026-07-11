"use client";

import Image from "next/image";

const GRADES = [
  {
    tag: "LOT 01 — FIRST FLUSH",
    name: "CEREMONIAL GRADE",
    photo: "/matcha/grade-ceremonial.jpg",
    props: [
      ["ORIGIN", "Uji, Kyoto Prefecture — shade-grown, first flush"],
      ["COLOR", "Vivid jade, near-fluorescent green"],
      ["TEXTURE", "Ultra-fine, silk-like, no bitterness on the tongue"],
      ["STIMULANT PROFILE", "Moderate caffeine, buffered by L-theanine for a slow release"],
      ["PRIMARY USE", "Whisked straight — usucha and koicha preparations"],
      ["STATUS", "HELD — reserved stock, verified lineage only"],
    ],
  },
  {
    tag: "LOT 02 — LATE FLUSH",
    name: "CULINARY GRADE",
    photo: "/matcha/grade-culinary.jpg",
    props: [
      ["ORIGIN", "Later flush, broader growing regions"],
      ["COLOR", "Deeper olive-green, less luminous"],
      ["TEXTURE", "Coarser grind, built to survive milk and heat"],
      ["STIMULANT PROFILE", "Higher concentration per gram, blends well"],
      ["PRIMARY USE", "Lattes, baking, mixed preparations"],
      ["STATUS", "PENDING — in circulation, lower scrutiny"],
    ],
  },
];

const CLASSIFICATION = [
  { code: "HELD", desc: "Verified, in restricted storage" },
  { code: "PENDING", desc: "Awaiting grading, unconfirmed lineage" },
  { code: "FLAGGED", desc: "Irregular route, under review" },
];

export default function GradesCredits() {
  return (
    <section
      className="relative overflow-hidden font-mono text-[#111]"
      style={{ background: "#cfe000" }}
    >
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply" />

      <div className="relative border-b border-black/20 px-5 pb-8 pt-10 sm:px-10 sm:pt-14">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="font-sans text-[15vw] font-black leading-[0.85] tracking-tight sm:text-[8vw]">
              MatchaCartel
            </h2>
            <p className="mt-2 font-sans text-[9vw] font-black leading-[0.85] tracking-tight sm:text-[4vw]">
              抹茶カルテル
            </p>
          </div>
          <p className="hidden max-w-[220px] text-right text-[10px] font-semibold uppercase leading-relaxed tracking-[0.1em] sm:block">
            © {new Date().getFullYear()} Matcha Cartel.<br />
            All rights reserved.<br />
            Distributed under strict control.<br />
            Non-transferable.
          </p>
        </div>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-3">
        <div className="border-b border-black/20 px-5 py-8 sm:px-10 sm:py-10 lg:border-b-0 lg:border-r">
          <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.15em]">
            Behind the Cartel
          </p>
          <p className="text-[13px] leading-relaxed">
            Matcha Cartel began as an observation: ceremonial-grade matcha&rsquo;s rapid
            rise from ritual ingredient to high-value, high-scarcity commodity. As
            demand grew, scarcity followed — shifting matcha from tea shelf to
            controlled asset.
          </p>
          <p className="mt-4 text-[13px] leading-relaxed">
            This dossier reframes it through a darker visual language, presenting it
            as something controlled, traded, and desired rather than purely
            ceremonial. Familiar wellness aesthetics are replaced with systems of
            restriction, grading, and quiet excess.
          </p>
        </div>

        <div className="border-b border-black/20 px-5 py-8 sm:px-10 sm:py-10 lg:border-b-0 lg:border-r">
          <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.15em]">
            The Grades
          </p>
          <div className="flex flex-col gap-8">
            {GRADES.map((g) => (
              <div key={g.name} className="flex gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-black/30">
                  <Image
                    src={g.photo}
                    alt={g.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.15em] opacity-60">
                    {g.tag}
                  </p>
                  <p className="text-[15px] font-bold uppercase tracking-tight">
                    {g.name}
                  </p>
                  <ul className="mt-2 flex flex-col gap-1">
                    {g.props.map(([k, v]) => (
                      <li key={k} className="text-[11.5px] leading-snug">
                        <span className="font-bold">{k}: </span>
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-8 sm:px-10 sm:py-10">
          <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.15em]">
            Classification
          </p>
          <ul className="flex flex-col gap-4">
            {CLASSIFICATION.map((c) => (
              <li key={c.code}>
                <p className="border border-black/40 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.15em]">
                  {c.code}
                </p>
                <p className="mt-1.5 text-[12px] leading-snug">{c.desc}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-1 text-[10px] font-semibold uppercase tracking-[0.15em] opacity-70">
            <span>(instagram)</span>
            <span>(sourced.direct)</span>
            <span>(matcha-cartel.dossier)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
