"use client";

import { GradientButton, GhostButton, OutlineButton, GhostButtonInline } from "@/components/Primitives";
import { useCalendarModal } from "@/components/CalendarModal";
import { useUtmSource } from "@/components/UtmProvider";
import { track } from "@/lib/analytics";
import { withCampaign, type Cta } from "@/lib/workshop";

type Variant = "gradient" | "ghost" | "outline" | "ghost-inline";

/* Renders a Cta from the workshop state machine.

   The three Cta shapes map onto three different renderings, which is what stops
   a button appearing with nowhere to go: an external CTA always carries an
   href, a fit-call CTA never does and opens the scheduler instead.

   Outbound links get the campaign tag appended and fire their analytics event.
   The href is the bare URL on the server and during the first paint, so the
   link works without JavaScript and is crawlable; the tag is added once the
   provider has read it, long before anyone can click. */
export default function TrackedCta({
  cta,
  variant = "gradient",
  fitCallIcon,
  children,
}: {
  cta: Cta;
  variant?: Variant;
  fitCallIcon?: boolean;
  children?: React.ReactNode;
}) {
  const { openModal } = useCalendarModal();
  const utmSource = useUtmSource();

  const label = children ?? cta.label;

  if (cta.kind === "fit-call") {
    switch (variant) {
      case "ghost":
      case "ghost-inline":
        return <GhostButton onClick={openModal}>{label}</GhostButton>;
      case "outline":
        return <OutlineButton onClick={openModal}>{label}</OutlineButton>;
      default:
        return (
          <GradientButton onClick={openModal} fitCall={fitCallIcon}>
            {label}
          </GradientButton>
        );
    }
  }

  if (cta.kind === "internal") {
    switch (variant) {
      case "ghost":
        return <GhostButton href={cta.href}>{label}</GhostButton>;
      case "ghost-inline":
        return <GhostButtonInline href={cta.href}>{label}</GhostButtonInline>;
      case "outline":
        return <OutlineButton href={cta.href}>{label}</OutlineButton>;
      default:
        return <GradientButton href={cta.href}>{label}</GradientButton>;
    }
  }

  const href = withCampaign(cta.href, utmSource);
  const onClick = () => track(cta.track, { destination: cta.href });

  switch (variant) {
    case "ghost":
      return (
        <GhostButton href={href} external onClick={onClick}>
          {label}
        </GhostButton>
      );
    case "ghost-inline":
      return (
        <GhostButtonInline href={href} external onClick={onClick}>
          {label}
        </GhostButtonInline>
      );
    case "outline":
      return (
        <OutlineButton href={href} external onClick={onClick}>
          {label}
        </OutlineButton>
      );
    default:
      return (
        <GradientButton href={href} external onClick={onClick}>
          {label}
        </GradientButton>
      );
  }
}
