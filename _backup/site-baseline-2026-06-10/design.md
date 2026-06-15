# Successfulbob.com — Design System

Premium GTM consulting site for technical startup founders and GTM leaders.
Tone: credible, direct, senior — and **fun**. Feels like a high-end B2B SaaS product site that a human actually built.

---

## Design Philosophy (read this first)

Every page should feel **interactive and alive**. If a section is just text on a background, it is not done yet. Ask: what happens when the user hovers, scrolls, or engages? Default to motion, not stillness.

### Mandatory interactive patterns
- **Hover-reveal cards**: show the base state, reveal the "so what" on hover (contrast pairs, before/after, claim + implication). See "What I Tend to Notice" on the About page for a live reference.
- **Staggered entrance animations**: every list, card grid, or multi-item section uses `Stagger` + `StaggerItem` with 60–100ms stagger. Nothing should appear all at once.
- **Lift-on-hover cards**: all cards use `whileHover={{ y: -3 }}` + a shadow transition. Cards feel physical.
- **Decorative section numerals**: large faded numbers (01, 02, 03…) positioned top-right of sections add depth without noise. Use `text-[160px] font-bold` at ~2–4% opacity.
- **Animated credential/tag chips**: role tags and category pills animate in with `scale: 0.88 → 1` staggered per chip.
- **Pull quotes with gradient left-bar**: key statements get the left-bordered callout treatment with a gradient bar and soft background wash.
- **Icon badges on dark backgrounds**: list items on dark sections use a small gradient-bg rounded badge for the bullet instead of a plain dot.
- **Floating stat cards**: sections that mention numbers (years, disciplines, etc.) should surface 2–3 key stats in a compact grid card, gradient text on dark.

### What makes a section "done"
- [ ] It has at least one interactive or animated element beyond fade-in
- [ ] Cards lift on hover
- [ ] Long copy is broken into staggered paragraphs, not a wall of text
- [ ] Section has a decorative accent (numeral, glow orb, or grain)
- [ ] Mobile layout is tested

### What to avoid
- Static sections with zero interaction
- Walls of text with no visual anchors
- Animations just for decoration with no relationship to content
- Generic "hero image" placeholders with no personality

### Each page gets its own hero
Every page shares the brand (navy `#061126`, gradient clip text, the same button system, glow orbs / dot-grid) but **the hero composition must be unique to the page** — never reuse the homepage's centered-text-over-`ParticleCanvas` layout elsewhere, or the visitor feels like they never left the homepage.
- Homepage hero = centered text + `ParticleCanvas` (its signature; don't copy it).
- About hero = photo-led asymmetric split (Bob's portrait + floating stat cards). Lead with the person.
- Advisory Work hero = asymmetric split with a live "Advisory access" panel (capacity meter + selectable cadence tiers showing prices). Lead with the offer's scarcity + tiered access model.
- Production Ready hero = asymmetric split with an animated "GTM readiness" status panel (CI/CD-style checks flipping from "Building" to a green "Ready" + a progress meter filling to 100%). Echoes the product↔GTM "production ready" metaphor.
- Insights hero = editorial/centered: oversized headline + a staggered row of category pills (no particle field). Reads like a publication masthead.
- Contact hero = centered, conversational: H1 "Let's figure out if there is a fit." + dual CTAs + response-time line. Warm and direct, not a product pitch.
- Future pages = pick a distinct hook (asymmetric split, oversized type, a live diagram, a stat band) that signals "this is a different page" within two seconds, while keeping the brand tokens.
- Use real, specific assets (Bob's photo, real numbers) over generic placeholders wherever the page is about a person or concrete offering.

---

## Brand Tokens

```
--navy:          #061126   ← page backgrounds, navbar, footer
--midnight:      #0B1734   ← dark section alt background
--electric-blue: #3F6BFF   ← primary CTA, links, accents
--signal-purple: #8B5CF6   ← secondary accent, gradient pair
--soft-section:  #F5F7FB   ← alternating light sections
--ink:           #111827   ← body headings
--muted:         #526078   ← body copy, subtext
--border:        #E5E7EB   ← card borders, dividers
--white:         #FFFFFF
```

### Gradient
```css
background: linear-gradient(135deg, #3F6BFF 0%, #8B5CF6 100%);
```
Use gradient only on: primary CTA buttons, hero text highlight spans, section accent bars.
Never use as a full section background (except the final CTA dark section).

---

## Typography

**Font:** Inter (Google Fonts) — single font, varied weight for hierarchy.

| Role            | Size      | Weight | Line Height | Color       |
|-----------------|-----------|--------|-------------|-------------|
| Display / H1    | 56–64px   | 700    | 1.1         | white / ink |
| H2 Section      | 36–44px   | 700    | 1.2         | ink         |
| H3 Card title   | 20–22px   | 600    | 1.3         | ink         |
| Body large      | 18–20px   | 400    | 1.7         | muted       |
| Body standard   | 16–17px   | 400    | 1.65        | muted       |
| Label / eyebrow | 11–12px   | 600    | 1.0         | electric-blue |
| Caption / fine  | 13–14px   | 400    | 1.5         | muted/50    |

**Eyebrow labels** (above every section headline):
```
font-size: 11px;
letter-spacing: 0.12em;
text-transform: uppercase;
font-weight: 600;
color: #3F6BFF;
```

**Hero headline treatment:** the key phrase gets a gradient clip:
```css
background: linear-gradient(90deg, #3F6BFF, #8B5CF6);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

---

## Spacing (8px Grid)

| Token   | Value | Use                           |
|---------|-------|-------------------------------|
| xs      | 8px   | icon gap, tight inline        |
| sm      | 16px  | between list items            |
| md      | 24px  | card padding, field gap       |
| lg      | 40px  | between components in section |
| xl      | 64px  | section top/bottom padding    |
| 2xl     | 96px  | hero top/bottom               |
| 3xl     | 128px | max hero on large screens     |

Section vertical rhythm: `py-20 md:py-28` (80px / 112px).

---

## Elevation & Shadows

```css
--shadow-sm:   0 1px 3px rgba(0,0,0,0.08);
--shadow-md:   0 4px 12px rgba(0,0,0,0.08);
--shadow-lg:   0 12px 32px rgba(0,0,0,0.10);
--shadow-card: 0 2px 8px rgba(63,107,255,0.08);  /* blue-tinted for hover */
```

Cards: border by default, `shadow-card` on hover. Never border + heavy shadow together.

---

## Component Specs

### Primary Button (Gradient CTA)
```css
padding: 14px 28px;
border-radius: 8px;
font-size: 15px;
font-weight: 600;
background: linear-gradient(135deg, #3F6BFF, #8B5CF6);
color: white;
box-shadow: 0 4px 14px rgba(63,107,255,0.30);
transition: opacity 0.2s, transform 0.15s;

/* Hover */
opacity: 0.92;
transform: translateY(-1px);
box-shadow: 0 6px 20px rgba(63,107,255,0.35);

/* Active */
transform: scale(0.98);
```

### Secondary Button (Outline)
```css
padding: 14px 28px;
border-radius: 8px;
font-size: 15px;
font-weight: 600;
background: transparent;
color: #3F6BFF;
border: 1.5px solid rgba(63,107,255,0.35);
transition: background 0.2s, border-color 0.2s;

/* Hover */
background: rgba(63,107,255,0.06);
border-color: rgba(63,107,255,0.6);
```

### Ghost Button (Dark backgrounds)
```css
color: white;
border: 1.5px solid rgba(255,255,255,0.25);
background: transparent;

/* Hover */
background: rgba(255,255,255,0.08);
border-color: rgba(255,255,255,0.45);
```

### Cards
```css
padding: 32px;
border-radius: 12px;
background: white;
border: 1px solid #E5E7EB;
transition: box-shadow 0.2s, transform 0.2s;

/* Hover */
box-shadow: 0 8px 24px rgba(63,107,255,0.10);
transform: translateY(-2px);
```

Feature cards on dark backgrounds:
```css
background: rgba(255,255,255,0.04);
border: 1px solid rgba(255,255,255,0.08);
border-radius: 12px;
padding: 32px;

/* Hover */
background: rgba(255,255,255,0.07);
border-color: rgba(63,107,255,0.30);
```

### Section Label (Eyebrow)
```jsx
<p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#3F6BFF] mb-3">
  Label Text
</p>
```

### Accent Divider Bar
A 3px × 40px pill in the gradient color, placed above section headlines for visual interest:
```jsx
<div className="w-10 h-[3px] rounded-full bg-gradient-to-r from-[#3F6BFF] to-[#8B5CF6] mb-5" />
```

### Callout / Pull Quote
```css
border-left: 3px solid #3F6BFF;
padding: 16px 24px;
background: rgba(63,107,255,0.04);
border-radius: 0 8px 8px 0;
font-size: 17px;
font-style: italic;
font-weight: 500;
color: #111827;
```

### Checklist Items (bullet lists)
Replace plain `•` with a custom dot:
```jsx
<span className="mt-2 h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#3F6BFF] to-[#8B5CF6] flex-shrink-0" />
```

---

## Section-by-Section Layout Direction

### Navbar
- Sticky, `bg-[#061126]/90 backdrop-blur-md`
- Logo left, nav links center (desktop), CTA button right
- Nav links: 13px, weight 500, `text-white/65` → `text-white` on hover
- Underline slide-in on hover: `after:` pseudo with gradient color
- On scroll: add `border-b border-white/10` (use IntersectionObserver or scroll listener)

### Hero
Layout: centered, full-bleed dark (`#061126`).

**Visual treatment ideas (pick one):**
1. **Dot-grid background**: subtle radial dot pattern in `rgba(255,255,255,0.04)` behind the text, fading out at edges via radial gradient mask.
2. **Noise texture overlay**: a 200×200 SVG noise pattern at 3% opacity adds tactile depth without looking busy.
3. **Glow orb**: a blurred radial gradient circle (`#3F6BFF` at 15% opacity, 600px diameter) centered behind the headline — creates a "light source" focal point.

Typography: H1 at 56px (mobile 36px), max-width 720px centered.
- Line 1: white
- Key phrase: gradient clip text

Below H1: two-paragraph body in `text-white/65`, max-width 600px.

CTA row: primary gradient button + ghost outline button, 12px gap.

Supporting fine print: `text-white/35`, 13px, centered below buttons.

### Problem Section
Layout: left-aligned single column, max-width 720px, centered on page. White background.

**Visual interest:** large decorative numeral "01" in `text-[#F5F7FB]` at 120px positioned absolute top-right of the container — creates asymmetric depth without distraction.

Callout block: left-bordered pull quote (see component spec above).

### What We Do Section
Layout: `#F5F7FB` background. Left column text + right column icon-list grid (2×4 or 1×7).

**Icon list treatment:** each bullet item gets a small gradient icon badge:
```jsx
<div className="flex items-start gap-4">
  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3F6BFF]/10 to-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
    <span className="w-1.5 h-1.5 rounded-full bg-[#3F6BFF]" />
  </div>
  <p className="text-[#526078]">{item}</p>
</div>
```

### Ways to Work Together (Cards)
Layout: 3-column card grid on desktop, stacked on mobile. White background.

**Card hierarchy:**
- Card 1 (Production Ready): top-left accent bar in gradient, slightly elevated with `shadow-md`
- Card 2 (Advisory): standard border treatment
- Card 3 (Fit Call): dashed border `border-dashed border-[#3F6BFF]/30`, background `rgba(63,107,255,0.02)` — feels like an invitation

Each card: icon badge (12×12 rounded, gradient bg) + title + body + bottom-aligned CTA link.

### Production Ready (Dark Feature) Section
Layout: full-bleed `#061126`. Max-width 900px centered.

**Visual treatment:** split layout — left is text + checklist, right is a "readiness checklist" visual card (dark glass card with checkmarks animating in on scroll).

Checklist items use `✓` icon in `#3F6BFF` instead of bullet dots.

CTA: primary gradient button.

### Why Bob Section
Layout: 50/50 grid. Left: text. Right: photo.

**Photo treatment:**
- Container: `border-radius: 16px`, overflow hidden
- Overlay: a subtle gradient `linear-gradient(to top, #061126 0%, transparent 40%)` at the bottom of the image
- Frame effect: a 2px gradient border ring using `box-shadow: 0 0 0 1px rgba(63,107,255,0.3), 0 0 0 4px rgba(63,107,255,0.08)`
- Floating badge: a small pill badge (`"Field CTO → GTM Consultant"`) positioned over the photo at bottom-left

Pull quote below body: left-bordered callout style.

### Audience Section
`#F5F7FB` background. Two-column on desktop: left column is the qualifier list, right column is a compact "not a fit" card in a muted style.

**"You may be a fit" list:** numbered `01` `02` `03`... in muted gray, with the item text beside each.

**"Probably not ready" block:** gray dashed border card, `text-[#526078]`, neutral framing — honest without being off-putting.

### Insights Preview
White background. Full-width section.

**Layout:** headline + subtext left-aligned, then 2×2 article card grid.

**Article cards:** horizontal layout — colored left edge (4px, gradient) + tag chip + title. No images needed (placeholder state). On hover: left edge brightens, title shifts `text-[#3F6BFF]`.

### FAQ Section
`#F5F7FB` background. Single column, max-width 720px.

**Accordion treatment:**
- Closed: question in `font-semibold text-[#111827]`, chevron right-aligned
- Open: question in `text-[#3F6BFF]`, answer slides down (CSS max-height transition), subtle `bg-white` behind the open item with `shadow-sm`
- Divider: `border-b border-[#E5E7EB]` between items

### Final CTA Section
Full-bleed dark gradient: `linear-gradient(135deg, #061126 0%, #0B1734 50%, #061126 100%)`.

**Visual treatment:** same glow orb as hero (purple, slightly shifted right) at 10% opacity.

H2: white, 40px, max-width 640px centered.
Body: `text-white/65`.
Button row: primary gradient + ghost outline.
Email fallback: `text-white/35`, 13px.

### Footer
`#061126`. Two rows:
- Row 1: logo left | nav links center | email right
- Row 2: copyright centered, `text-white/25`

Divider: `border-t border-white/8`.

---

## Motion & Animation

Keep motion purposeful and subtle. Nothing should animate just to animate.

### Principles
- Duration: 150ms (micro) / 200ms (standard) / 300ms (entrance)
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` for all transitions
- Never animate layout-triggering properties (width, height for layout) — use opacity + transform only

### Scroll Entrance (Framer Motion or CSS)
Elements enter from `translateY(16px)` + `opacity: 0` → `translateY(0)` + `opacity: 1`.
Stagger sibling elements by 60ms.

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
  animation: fadeUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
```

### FAQ Accordion
```css
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.faq-answer.open {
  max-height: 400px;
}
```

### Navbar scroll behavior
Add `border-b border-white/10` and slight background darkening after 40px scroll via a `useEffect` scroll listener.

### Button hover lift
```css
transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
```

---

## Responsive Breakpoints

| Breakpoint | Width   | Layout changes                              |
|------------|---------|---------------------------------------------|
| mobile     | < 640px | Single column, 24px horizontal padding      |
| sm         | 640px+  | Flex rows for button groups                 |
| md         | 768px+  | 2-col grid (Why Bob, some cards)            |
| lg         | 1024px+ | 3-col card grid, full nav visible           |
| xl         | 1280px+ | Max-width containers active (6xl = 1152px)  |

---

## Anti-Patterns for This Site

❌ Rainbow gradients on section backgrounds  
❌ Gradient-on-gradient (gradient text + gradient button in same line)  
❌ Drop shadows heavier than `0 12px 32px rgba(0,0,0,0.12)`  
❌ More than two accent colors in one section  
❌ Card borders AND heavy shadows together  
❌ Text below 14px anywhere (12px max for legal/fine print only)  
❌ Inconsistent corner radii (pick 8px or 12px and stick to it per component type)  
❌ Animations longer than 400ms  
❌ Moving background elements (parallax, floating shapes) — too distracting for a credibility-focused site  

---

## Quick Implementation Checklist

Before shipping any page section:
- [ ] Eyebrow label above section headline
- [ ] Headline uses correct type scale (H2 = 36–44px)
- [ ] Body text ≥ 16px, line-height ≥ 1.6
- [ ] Section padding: `py-20 md:py-28`
- [ ] Max-width container applied (`max-w-6xl` or `max-w-3xl` for prose)
- [ ] Card hover state defined (lift + shadow)
- [ ] Button shadow matches color (`rgba(63,107,255,0.30)` for blue, none for ghost)
- [ ] Sections alternate: white → soft-section → dark (never two dark in a row)
- [ ] Mobile layout tested at 375px
