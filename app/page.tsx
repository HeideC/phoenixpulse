"use client";

import { useEffect, useMemo, useState } from "react";

type Pulse = {
  quote: string;
  author?: string;
  tag?: string;
};

const LS_KEY = "phoenixpulse_mostfelt";

export default function Home() {
  const pulses = useMemo<Pulse[]>(
    () => [
      {
        quote: "Rise from every fall. Rebuild with purpose. Repeat until strength becomes who you are.",
        author: "PhoenixPulse",
        tag: "Resilience",
      },
      {
        quote: "You are allowed to restart — as many times as it takes.",
        author: "PhoenixPulse",
        tag: "Rebuild",
      },
      {
        quote: "Discipline is choosing what you want most over what you want now.",
        author: "Unknown",
        tag: "Discipline",
      },
      {
        quote: "Small steps, repeated daily, become unstoppable momentum.",
        author: "PhoenixPulse",
        tag: "Momentum",
      },
      {
        quote: "You don’t need more time — you need more intention.",
        author: "PhoenixPulse",
        tag: "Focus",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const active = pulses[index % pulses.length];

  // Auto-rotate
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % pulses.length);
    }, 8000);
    return () => clearInterval(id);
  }, [pulses.length]);

  // “Most Felt” (local)
  const [mostFelt, setMostFelt] = useState<number | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw !== null) setMostFelt(Number(raw));
    } catch {}
  }, []);

  function setMostFeltNow() {
    try {
      localStorage.setItem(LS_KEY, String(index));
    } catch {}
    setMostFelt(index);
  }

  function next() {
    setIndex((i) => (i + 1) % pulses.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + pulses.length) % pulses.length);
  }

  // Year without hydration warnings
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background glow + watermark */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
        <img
          src="/phoenixpulse-logo.png"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.src = "/Phoenix rising with a golden pulse.png";
          }}
          alt=""
          className="absolute left-1/2 top-1/2 w-[820px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
      </div>

      {/* Header */}
      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <img
            src="/phoenixpulse-logo.png"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.src = "/Phoenix rising with a golden pulse.png";
            }}
            alt="PhoenixPulse"
            className="h-10 w-auto"
          />
          <div className="text-sm text-white/70">PhoenixPulse</div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <a href="#about" className="hover:text-white">
            About
          </a>
          <a href="#pulse" className="hover:text-white">
            Daily Pulse
          </a>
          <a href="#contact" className="hover:text-white">
            Contact
          </a>
        </nav>
      </header>

      {/* Main */}
      <main className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-16 pt-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Rise. Rebuild. Repeat.
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-7 text-white/75 md:text-lg">
          A curated collection of words to inspire and motivate. From timeless wisdom to modern
          insights, find your next inspiration here.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#pulse"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black hover:opacity-90"
          >
            Ignite Your Pulse
          </a>
          <a
            href="mailto:hello@phoenixpulse.com"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-black/20 px-6 py-3 text-sm text-white/80 hover:bg-white/5"
          >
            hello@phoenixpulse.com
          </a>
        </div>

        {/* About */}
        <section id="about" className="mt-16 w-full max-w-3xl">
          <h2 className="text-xl font-semibold text-white/90">About</h2>
          <p className="mt-4 text-sm leading-7 text-white/70">
            PhoenixPulse is built for the moments you need a reset — a spark — a steady push
            forward. Words that bring you back to yourself.
          </p>
        </section>

        {/* Daily Pulse (rotating engine) */}
        <section
          id="pulse"
          className="mt-12 w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur"
        >
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/60">
            <span className="h-2 w-2 rounded-full bg-white/50" />
            Daily Pulse
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-white/50">
            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
              {active.tag ?? "Pulse"}
            </span>
            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
              {index + 1} / {pulses.length}
            </span>
            {mostFelt === index ? (
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                Most Felt ❤️
              </span>
            ) : null}
          </div>

          <p className="mt-6 text-xl font-semibold leading-snug md:text-2xl">
            “{active.quote}”
          </p>

          <p className="mt-5 text-sm text-white/55">
            {active.author ? `— ${active.author}` : ""}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={prev}
              className="rounded-xl border border-white/15 bg-black/20 px-5 py-2.5 text-sm text-white/80 hover:bg-white/5"
            >
              Prev
            </button>
            <button
              onClick={next}
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90"
            >
              Next
            </button>
            <button
              onClick={setMostFeltNow}
              className="rounded-xl border border-white/15 bg-black/20 px-5 py-2.5 text-sm text-white/80 hover:bg-white/5"
            >
              Most Felt ❤️
            </button>
          </div>

          <p className="mt-8 text-xs tracking-[0.2em] text-white/35">
            — PHOENIXPULSE
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-16 w-full max-w-3xl">
          <h2 className="text-xl font-semibold text-white/90">Contact</h2>
          <p className="mt-4 text-sm leading-7 text-white/70">
            Want to collaborate or submit a quote idea? Reach out anytime.
          </p>
          <a
            href="mailto:hello@phoenixpulse.com"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black hover:opacity-90"
          >
            Email PhoenixPulse
          </a>
        </section>

        <p className="mt-14 text-xs tracking-[0.2em] text-white/35">
          — PhoenixPulse • Rise. Rebuild. Repeat.
        </p>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-xs text-white/45">
        © <span suppressHydrationWarning>{year ?? ""}</span> PhoenixPulse. All rights reserved.
      </footer>
    </div>
  );
}
