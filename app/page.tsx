export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        PhoenixPulse
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-white/80">
        Rise from every fall. Rebuild with purpose. Repeat until strength becomes who you are.
      </p>

      <div className="mt-10 rounded-2xl border border-white/20 bg-white/5 p-6 max-w-xl">
        <p className="text-xl font-semibold">
          “You are allowed to restart — as many times as it takes.”
        </p>
        <p className="mt-4 text-sm text-white/60">— PhoenixPulse</p>
      </div>

      <p className="mt-12 text-sm text-white/50">
        Rise. Rebuild. Repeat.
      </p>
    </div>
  );
}
