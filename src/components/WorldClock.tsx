"use client";

import { useEffect, useState } from "react";

const CITIES = [
  { label: "TOKYO", zone: "Asia/Tokyo" },
  { label: "LOS ANGELES", zone: "America/Los_Angeles" },
  { label: "LONDON", zone: "Europe/London" },
];

function formatTime(zone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

export default function WorldClock() {
  const [times, setTimes] = useState<string[] | null>(null);

  useEffect(() => {
    const tick = () => setTimes(CITIES.map((c) => formatTime(c.zone)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
      {CITIES.map((c, i) => (
        <div key={c.label} className="flex items-baseline gap-2">
          <span className="text-[10px] tracking-[0.25em] text-muted">
            {c.label}
          </span>
          <span
            className="text-[11px] tabular-nums tracking-[0.1em] text-foreground/90"
            suppressHydrationWarning
          >
            {times ? times[i] : "--:--:--"}
          </span>
          <span className="text-[10px] tracking-[0.1em] text-muted-2">GMT</span>
        </div>
      ))}
    </div>
  );
}
