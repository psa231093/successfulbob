"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimateIn } from "@/components/AnimateIn";
import { useConsent } from "@/components/ConsentProvider";

/* Content mirrors Privacy_Policy_Draft.md, which is with the client for review.
   The LAST_UPDATED string is authored rather than computed: a date formatted in
   the browser renders differently from the server and causes a hydration
   mismatch, and it would also silently change itself. */

const LAST_UPDATED = "30 July 2026";

const SERVICES: [string, string][] = [
  ["Formspree", "Delivers contact form submissions to our inbox."],
  ["Google Calendar", "Powers the call scheduler."],
  ["Google Analytics", "Measures site traffic and which campaigns bring visitors."],
  ["LinkedIn", "Measures advertising performance, only if you accept."],
  ["Luma", "Handles workshop and preview registration."],
  ["Stripe", "Processes payment, through Luma. We never see your card details."],
  ["Sanity", "Stores the content of this site. It does not process visitor data."],
];

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-[16px] text-[#526078] leading-[1.8] mb-5 last:mb-0">{children}</p>;
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mt-12 mb-4 leading-[1.3] tracking-[-0.01em]">
      {children}
    </h2>
  );
}

export default function PrivacyPage() {
  const { choice, ready, reopen } = useConsent();

  return (
    <>
      <section className="relative bg-[#061126] text-white pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.45] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 60% 70% at 50% 30%, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 50% 30%, black 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[30px] md:text-[42px] font-bold leading-[1.12] tracking-[-0.02em] mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[14px] text-white/45"
          >
            Last updated: {LAST_UPDATED}
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <AnimateIn>
            <Body>
              Successfulbob LLC operates successfulbob.com. This policy explains what information we
              collect when you visit the site, register for an event, or get in touch, and how we use
              it.
            </Body>

            <H2>Information you provide</H2>
            <Body>
              <strong className="text-[#111827] font-semibold">Contact form.</strong> If you reach out
              through our contact form we collect your name, email, company, website, the reason for
              your enquiry, and your message. This is processed by Formspree and delivered to our
              inbox. We use it only to reply to you.
            </Body>
            <Body>
              <strong className="text-[#111827] font-semibold">Scheduling a call.</strong> Booking a
              fit call uses Google Calendar&apos;s scheduling tool, which collects your name, email,
              and anything you choose to tell us about your business.
            </Body>
            <Body>
              <strong className="text-[#111827] font-semibold">Workshop registration.</strong>{" "}
              Registration happens on Luma, not on this site. Luma collects your name, email, company
              and role, and for paid registrations processes payment through Stripe. We receive your
              registration details as the host so we can run the session and follow up. We never see
              your card details.
            </Body>

            <H2>Information collected automatically</H2>
            <Body>
              <strong className="text-[#111827] font-semibold">Analytics.</strong> We use Google
              Analytics to understand which pages are viewed and how visitors arrived, including from
              advertising campaigns. Until you accept cookies this runs in a restricted mode that sets
              no identifying cookie.
            </Body>
            <Body>
              <strong className="text-[#111827] font-semibold">Advertising measurement.</strong> If
              you accept, the LinkedIn Insight Tag records visits that arrive from LinkedIn campaigns
              so we can tell which advertising works. If you decline, it is not loaded at all.
            </Body>
            <Body>
              <strong className="text-[#111827] font-semibold">Cookies.</strong> Essential cookies
              keep the site working. Analytics and advertising cookies are only set once you accept.
              You can change your choice at any time using the button below.
            </Body>

            <H2>How we use it</H2>
            <Body>
              To reply to enquiries, to schedule and run calls and workshops, to understand how people
              find and use the site, and to judge whether our marketing is working. We do not sell
              your information, and we do not share it beyond the service providers listed below, who
              process it on our behalf.
            </Body>

            <H2>Third-party services</H2>
            <div className="space-y-3 mb-5">
              {SERVICES.map(([name, what]) => (
                <div key={name} className="flex gap-3 items-start">
                  <span
                    aria-hidden="true"
                    className="mt-[9px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}
                  />
                  <p className="text-[16px] text-[#526078] leading-[1.7]">
                    <strong className="text-[#111827] font-semibold">{name}.</strong> {what}
                  </p>
                </div>
              ))}
            </div>

            <H2>How long we keep it</H2>
            <Body>
              Contact form submissions and workshop registration records are kept as long as needed to
              reply to you or deliver the event, and for a reasonable period afterwards for our own
              records. Analytics data follows Google Analytics&apos; own retention settings.
            </Body>

            <H2>Your choices</H2>
            <Body>
              You can accept or decline non-essential cookies at any time. You can also ask what
              information we hold about you, or ask us to delete it, by emailing{" "}
              <a
                href="mailto:bob@successfulbob.com"
                className="text-[#3f6bff] underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                bob@successfulbob.com
              </a>
              .
            </Body>

            <div className="mt-6 mb-2 p-5 rounded-xl bg-[#f5f7fb] border border-[#e5e7eb]">
              <p className="text-[14px] text-[#526078] mb-3">
                {ready && choice === "granted"
                  ? "You have accepted analytics and advertising cookies."
                  : ready && choice === "denied"
                    ? "You have declined analytics and advertising cookies."
                    : "You have not made a cookie choice yet."}
              </p>
              <button
                type="button"
                onClick={reopen}
                className="text-[14px] font-semibold text-[#3f6bff] underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                Change my cookie preferences
              </button>
            </div>

            <H2>Children</H2>
            <Body>
              This site is intended for business professionals and is not directed at children. We do
              not knowingly collect information from anyone under 16.
            </Body>

            <H2>Changes</H2>
            <Body>
              We may update this policy as the site changes. The date at the top reflects the most
              recent update.
            </Body>

            <H2>Contact</H2>
            <Body>
              Questions about this policy can be sent to{" "}
              <a
                href="mailto:bob@successfulbob.com"
                className="text-[#3f6bff] underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                bob@successfulbob.com
              </a>
              . You can also{" "}
              <Link
                href="/contact"
                className="text-[#3f6bff] underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                use the contact form
              </Link>
              .
            </Body>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
