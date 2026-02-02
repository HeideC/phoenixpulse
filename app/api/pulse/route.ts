import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

// Your quotes live on the server (single source of truth)
const QUOTES = [
  {
    id: "rise-rebuild-repeat",
    tag: "Resilience",
    quote:
      "Rise from every fall. Rebuild with purpose. Repeat until strength becomes who you are.",
    author: "PhoenixPulse",
  },
  {
    id: "discipline-most",
    tag: "Discipline",
    quote: "Discipline is choosing what you want most over what you want now.",
    author: "Unknown",
  },
  {
    id: "more-intention",
    tag: "Focus",
    quote: "You don’t need more time — you need more intention.",
    author: "PhoenixPulse",
  },
  {
    id: "small-steps",
    tag: "Momentum",
    quote: "Small steps, repeated daily, become unstoppable momentum.",
    author: "PhoenixPulse",
  },
  {
    id: "allowed-to-restart",
    tag: "Rebuild",
    quote: "You are allowed to restart — as many times as it takes.",
    author: "PhoenixPulse",
  },
];

// Deterministic “daily” selection (global for all visitors)
// Uses UTC date so it’s consistent everywhere.
function todaysQuote() {
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(now.getUTCDate()).padStart(2, "0");
  const key = `${yyyy}-${mm}-${dd}`;

  // Simple hash-like selection
  let sum = 0;
  for (const c of key) sum += c.charCodeAt(0);
  const idx = sum % QUOTES.length;

  return { dateKey: key, item: QUOTES[idx] };
}

export async function GET() {
  const { dateKey, item } = todaysQuote();

  // Vote count stored in KV
  const votesKey = `pulse:votes:${item.id}`;
  const votes = (await kv.get<number>(votesKey)) ?? 0;

  return NextResponse.json({
    dateKey,
    ...item,
    votes,
  });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const id = String(body?.id ?? "");

  // Only allow voting for known IDs
  const ok = QUOTES.some((q) => q.id === id);
  if (!ok) {
    return NextResponse.json({ error: "Invalid quote id" }, { status: 400 });
  }

  const votesKey = `pulse:votes:${id}`;
  const votes = await kv.incr(votesKey);

  return NextResponse.json({ id, votes });
}

