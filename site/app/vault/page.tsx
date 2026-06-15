import type { Metadata } from "next";
import { GradientButton, GhostButton } from "@/components/Primitives";

export const metadata: Metadata = {
  title: "Customer Resource Vault",
  description:
    "The Customer Resource Vault is a gated area for Successfulbob and Production Ready clients with templates, frameworks, worksheets, and tools.",
  robots: { index: false, follow: false },
};

const VAULT_ITEMS = [
  "Messaging worksheets",
  "Demo planning tools",
  "Partner enablement guides",
  "Readiness checklists",
  "Feature-to-value exercises",
];

export default function VaultPage() {
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
        <div
          className="w-16 h-16 rounded-2xl mx-auto mb-8 flex items-center justify-center"
          style={{
            background: "rgba(63,107,255,0.10)",
            border: "1px solid rgba(63,107,255,0.25)",
          }}
        >
          <svg className="w-7 h-7 text-[#9db4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4" />
          </svg>
        </div>

        <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff] mb-4">
          Client access
        </p>
        <h1 className="text-[32px] md:text-[44px] font-bold leading-[1.1] tracking-[-0.02em] mb-5">
          The Customer Resource Vault is{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, #3f6bff 0%, #8b5cf6 100%)" }}
          >
            opening soon.
          </span>
        </h1>
        <p className="text-white/60 text-[16px] md:text-[17px] leading-[1.75] mb-9 max-w-xl mx-auto">
          The Vault is a gated library for Successfulbob and Production Ready clients:{" "}
          {VAULT_ITEMS.join(", ").toLowerCase()}, and the other working materials behind the public Insights.
          Client logins are being set up now. If you're a current client and need a resource in the meantime, email me directly.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <GradientButton href="mailto:bob@successfulbob.com" external>
            Email Bob for Access
          </GradientButton>
          <GhostButton href="/insights">Browse Public Insights</GhostButton>
        </div>
      </div>
    </section>
  );
}
