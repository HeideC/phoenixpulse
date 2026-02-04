import QuoteCard from "@/components/QuoteCard";

export const metadata = {
  title: "Inspirational Quotes | PhoenixPulse",
  description:
    "A collection of inspirational quotes on resilience, healing, self-love, and inner strength by PhoenixPulse.",
};

const quotes = [
  {
    quote: "Rise. Rebuild. Repeat.",
    author: "PhoenixPulse",
    tag: "Resilience",
  },
  {
    quote: "Healing is not linear — and that’s okay.",
    author: "PhoenixPulse",
    tag: "Healing",
  },
  {
    quote: "You are allowed to grow at your own pace.",
    author: "PhoenixPulse",
    tag: "Self-Love",
  },
  {
    quote: "Strength isn’t loud. Sometimes it’s simply staying.",
    author: "PhoenixPulse",
    tag: "Inner Strength",
  },
];

export default function InspirationalQuotesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-4 text-center text-3xl font-semibold text-white">
        Inspirational Quotes
      </h1>

      <p className="mb-10 text-center text-white/60">
        Daily reminders for resilience, healing, and inner power.
      </p>

      <div className="space-y-6">
        {quotes.map((q, i) => (
          <QuoteCard key={i} quote={q.quote} author={q.author} tag={q.tag} />
        ))}
      </div>
    </main>
  );
}