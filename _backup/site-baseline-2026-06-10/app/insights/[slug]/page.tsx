import type { Metadata } from "next";
import { GradientButton, GhostButton } from "@/components/Primitives";

export const metadata: Metadata = {
  title: "Article Coming Soon",
  description:
    "This Successfulbob Insights article is being written. Subscribe to get practical technical GTM thinking when it publishes.",
  robots: { index: false, follow: true },
};

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = titleFromSlug(decodeURIComponent(slug));

  return (
    <section className="relative bg-[#061126] text-white min-h-[70vh] flex items-center overflow-hidden py-28">
      <div
        className="absolute inset-0 opacity-[0.55] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 0%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 0%, transparent 72%)",
        }}
      />
      <div
        className="absolute -top-24 right-1/4 w-[600px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 65%)" }}
      />

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <div
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-7"
          style={{ background: "rgba(63,107,255,0.10)", border: "1px solid rgba(63,107,255,0.22)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}
          />
          <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff]">
            Insights · Coming soon
          </span>
        </div>

        <h1 className="text-[30px] md:text-[42px] font-bold leading-[1.12] tracking-[-0.02em] mb-5">
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, #3f6bff 0%, #8b5cf6 100%)" }}
          >
            {title}
          </span>{" "}
          is being written.
        </h1>
        <p className="text-white/60 text-[16px] md:text-[17px] leading-[1.75] mb-9 max-w-xl mx-auto">
          This article isn't published yet. The Insights library is rolling out now — subscribe on the
          Insights page and you'll get it the moment it lands, along with practical notes on technical
          GTM, founder led sales, product messaging, demos, partner enablement, and executive narrative.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <GradientButton href="/insights#subscribe">Subscribe to Insights</GradientButton>
          <GhostButton href="/insights">Back to Insights</GhostButton>
        </div>
      </div>
    </section>
  );
}
