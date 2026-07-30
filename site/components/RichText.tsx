"use client";

import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

/* Renders the two Portable Text fields on the workshop page.

   Deliberately narrow: the schema only allows normal paragraphs, bullets, bold,
   italic and links, so there is no heading or image handling here. Anything the
   editor cannot produce is not worth rendering. */

type Tone = "light" | "dark";

function components(tone: Tone): PortableTextComponents {
  const body = tone === "dark" ? "text-white/65" : "text-[#526078]";
  const strong = tone === "dark" ? "text-white" : "text-[#111827]";
  const link = tone === "dark" ? "text-[#9db4ff]" : "text-[#3f6bff]";

  return {
    block: {
      normal: ({ children }) => (
        <p className={`text-[16px] md:text-[17px] leading-[1.8] mb-5 last:mb-0 ${body}`}>{children}</p>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="space-y-2.5 mb-5 last:mb-0">{children}</ul>,
    },
    listItem: {
      bullet: ({ children }) => (
        <li className={`flex gap-3 text-[16px] leading-[1.7] ${body}`}>
          <span
            aria-hidden="true"
            className="mt-[10px] w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}
          />
          <span>{children}</span>
        </li>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className={`font-semibold ${strong}`}>{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ value, children }) => {
        const href: string = value?.href ?? "#";
        const external = /^https?:\/\//i.test(href);
        const cls = `${link} underline underline-offset-2 hover:opacity-80 transition-opacity`;
        return external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
            {children}
          </a>
        ) : (
          <Link href={href} className={cls}>
            {children}
          </Link>
        );
      },
    },
  };
}

export default function RichText({ value, tone = "light" }: { value: unknown; tone?: Tone }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  // The renderer's own types are stricter than the opaque shape carried through
  // lib/workshop; the schema guarantees the blocks are valid.
  return <PortableText value={value as never} components={components(tone)} />;
}
