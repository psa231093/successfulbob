import Link from "next/link";
import { GradientButton, GhostButton } from "@/components/Primitives";

export default function NotFound() {
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
        className="absolute -top-24 left-1/3 w-[600px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.12) 0%, transparent 65%)" }}
      />

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <p
          className="text-[80px] md:text-[110px] font-bold leading-none mb-6 bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}
        >
          404
        </p>
        <h1 className="text-[28px] md:text-[40px] font-bold leading-[1.12] tracking-[-0.02em] mb-5">
          This page got lost in translation.
        </h1>
        <p className="text-white/60 text-[16px] md:text-[17px] leading-[1.75] mb-9 max-w-lg mx-auto">
          The page you're looking for doesn't exist or has moved. The story you actually need is probably
          one of these:
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <GradientButton href="/">Back to Home</GradientButton>
          <GhostButton href="/insights">Browse Insights</GhostButton>
        </div>

        <p className="text-[13px] text-white/35">
          Looking for something specific?{" "}
          <Link href="/contact" className="text-white/55 hover:text-white transition-colors underline underline-offset-2">
            Get in touch
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
