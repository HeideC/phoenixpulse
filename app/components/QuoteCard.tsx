"use client";

import { Instagram, Facebook } from "lucide-react";

type Quote = {
  quote: string;
  author?: string;
  tag?: string;
};

export default function QuoteCard({
  quote,
  instagramUrl = "https://www.instagram.com/phoenixpul_se/",
  facebookUrl,
}: {
  quote: Quote;
  instagramUrl?: string;
  facebookUrl?: string;
}) {
  if (!quote?.quote) {
    return (
      <div className="min-h-screen grid place-items-center text-white/60">
        Loading…
      </div>
    );
  }
  return (
  <div
  className={[
    "group relative mt-6 rounded-2xl",
    "border border-white/20 bg-black/50",
    "p-8 pb-14",
    "backdrop-blur-sm",
    "transition-all duration-300 ease-out",
    "hover:-translate-y-0.5 hover:border-white/40",
    "ring-1 ring-white/20 hover:ring-white/40",
  ].join(" ")}
>  
      {/* subtle overlay */}
    <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-black/10" />  

      <div
  
        className="relative z-10 animate-[ppQuoteIn_260ms_ease_out] motion-reduce:animate-none space-y-3"
      >
        <p className="text-xl font-semibold leading-snug text-white drop-shadow-sm md:text-2xl">
          {(() => {
           if (!quote?.quote) return null; 
            const parts = quote.quote.trim().split(/\s+/);
            const last = parts.pop() ?? "";
            const main = parts.join(" ");
            const m = last.match(/^(.+?)([.,!?;:”"]+)?$/);
            const word = m?.[1] ?? last;
            const punct = m?.[2] ?? "";
            return (
              <>
                {main}{" "}
                <span className="text-white/90 drop-shadow-md">{word}</span>
                {punct}
              </>
            );
          })()}
        </p>

        <p className="text-sm text-white/45">
       {quote?.author ? `— ${quote.author}` : ""}   
        </p>
      </div>

      {/* hover hint */}
      <div className="pointer-events-none absolute bottom-6 left-6 z-20 text-xs text-white/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Follow for daily pulses
      </div>

      {/* icons */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-4">
        {facebookUrl ? (
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="rounded-full border border-white/10 bg-black/20 p-2 transition hover:text-white hover:border-white/30"
          >
            <Facebook className="h-4 w-4" />
          </a>
        ) : null}

        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="rounded-full border border-white/10 bg-black/20 p-2 transition hover:text-white hover:border-white/30"
        >
          <Instagram className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}