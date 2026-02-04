"use client";

import { useEffect, useState } from "react";
import QuoteCard from "./components/QuoteCard";
import { pulses } from "./lib/pulses";
function useLocalStorageNumber(key: string, initial: number) {
  const [value, setValue] = useState<number>(() => {
    if (typeof window === "undefined") return initial;
    const raw = localStorage.getItem(key);
    const n = raw == null ? NaN : Number(raw);
    return Number.isFinite(n) ? n : initial;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, String(value));
    } catch {}
  }, [key, value]);

  return [value, setValue] as const;
}

export default function Page() {
  
  const total = pulses.length;
  if (total === 0) return null;

const [index, setIndex] = useLocalStorageNumber("pp:index", 0);
const safeIndex = ((index % total) + total) % total;
const [mostFelt, setMostFelt] = useLocalStorageNumber("pp:mostFelt", -1);
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);
  const toggleMostFelt = () => {
  setMostFelt((m) => (m === safeIndex ? -1 : safeIndex));
};

  return (
    <main className="min-h-screen bg-black text-white flex items-start justify-center px-6 py-10">
      <div className="w-full max-w-2xl">
    {/* Header */}
+ <div className="w-full max-w-2xl pt-12 mb-6">
  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
    PhoenixPulse
  </h1>
  <p className="mt-1 text-sm md:text-base text-white/55">
    Daily pulses for resilience, focus, and inner power.
  </p>
</div>    
    {/* Controls */}
<div className="mb-4 flex items-center justify-between text-white/70">
  <button
    type="button"
    onClick={prev}
    className="rounded-full border border-white/10 bg-black/20 px-4 py-2 hover:border-white/20 hover:text-white transition"
    aria-label="Previous quote"
  >
    Prev
  </button>

  <div className="text-xs tracking-widest text-white/45">
    {safeIndex + 1} / {total}
  </div>

  <button
    type="button"
    onClick={next}
    className="rounded-full border border-white/10 bg-black/20 px-4 py-2 hover:border-white/20 hover:text-white transition"
    aria-label="Next quote"
  >
    Next
  </button>
</div>

<div className="mt-3 flex items-center justify-center">
  <button
    type="button"
    onClick={toggleMostFelt}
    className={[
      "rounded-full border px-4 py-2 text-sm transition",
      mostFelt === safeIndex
        ? "border-white/30 bg-white/10 text-white"
        : "border-white/10 bg-black/20 text-white/70 hover:border-white/20 hover:text-white",
    ].join(" ")}
  >
    {mostFelt === safeIndex ? "❤️ Most Felt" : "🤍 Mark as Most Felt"}
  </button>
</div>    

      {/* Card */}
<div key={safeIndex} className="w-full">
 <QuoteCard
  quote={pulses[safeIndex]}
  instagramUrl="https://www.instagram.com/phoenixpul_se/"
  facebookUrl="https://www.facebook.com/profile.php?id=61576879443136"
/>
</div>  
      </div>
    </main>
  );
}
