import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#061126] text-white/60 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        <p className="font-medium text-white/80">Successfulbob LLC</p>

        <nav className="flex flex-wrap justify-center gap-6">
          <Link href="/production-ready" className="hover:text-white transition-colors">Production Ready</Link>
          <Link href="/advisory-work" className="hover:text-white transition-colors">Advisory Work</Link>
          <Link href="/insights" className="hover:text-white transition-colors">Insights</Link>
          <Link href="/about" className="hover:text-white transition-colors">About Bob</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </nav>

        <a
          href="mailto:bob@successfulbob.com"
          className="hover:text-white transition-colors"
        >
          bob@successfulbob.com
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 pt-6 border-t border-white/10 text-xs text-white/30 text-center">
        © {new Date().getFullYear()} Successfulbob LLC. All rights reserved.
      </div>
    </footer>
  );
}
