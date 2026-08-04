# How to Publish & Manage Content on Successfulbob.com

> **Your CMS is Sanity Studio** — a private web app where you write and edit content. Once you hit Publish, it goes live on the site automatically. No code, no deploys, no waiting.
>
> This guide covers **blog posts** (most of the document) and **workshops** (the section near the end).

---

## Accessing the Studio

Open your browser and go to:

```
https://successfulbob.sanity.studio
```

Log in with your Sanity account (the email address you used when you signed up). Bookmark this URL — it's your editorial home base.

---

## The Layout at a Glance

When you log in you'll see a sidebar on the left:

| Section | What it is |
|---|---|
| **Workshop Settings** | One single entry that decides *which* workshop is live at `/workshops`. See the workshops section below. |
| **Workshop** | Each workshop you have run or plan to run |
| **Post** | Your blog articles — this is where you'll spend most of your time |
| **Category** | The topic categories shown on the Insights page |
| **Author** | Author profiles (yours is already set up) |

Click any item in the sidebar to open a list of documents. Click a document to edit it. Simple.

---

## Writing a New Blog Post

### 1. Create the document

1. Click **Post** in the left sidebar.
2. Click the **pencil / compose icon** (top right of the list pane) or the **"+ New document"** button.
3. A blank post form opens on the right.

### 2. Fill in the required fields

These two fields are **required** before you can publish:

**Title**
Your article headline. Write it exactly as you want it to appear on the site. Keep it clear and direct — this is also what search engines read first.

**URL Slug**
This auto-generates from your title (e.g., "How to Hire a VP of Sales" becomes `how-to-hire-a-vp-of-sales`). You rarely need to edit it, but you can. Once a post is live, **don't change the slug** — it will break any links that exist to that article.

### 3. Set publication metadata

**Published At**
Pick the date and time you want the post to show as published. You can back-date or forward-date this — it's purely a display timestamp, not a scheduled release mechanism. If you leave it blank, the post won't appear on the site even after you hit Publish.

**Featured Post**
Toggle this **on** for the one article you want pinned to the hero slot on the Insights page. Only one post should be featured at a time — if you feature a second one, you should un-feature the old one.

**Author**
Select your author profile from the dropdown. This is already set up as "Bob Hart."

**Category**
Assign this post to one of your content categories (e.g., GTM Strategy, Sales Leadership, Revenue Operations). If a category you need doesn't exist yet, see [Managing Categories](#managing-categories) below.

**Tags**
Optional free-form labels (e.g., `hiring`, `pipeline`, `enterprise`). Type a tag and press Enter to add it. Tags can be used for filtering later.

### 4. Write the excerpt

The **Excerpt** is the 1–3 sentence summary shown on article cards, in search results, and in social media link previews. Think of it as the hook that makes someone click. Keep it under 300 characters. This is required for good SEO — don't skip it.

### 5. Upload the featured image

Click the **Featured Image** field and drag-and-drop an image file (JPG or PNG, at least 1200×630px for best results across all screen sizes).

After uploading:
- **Alt Text** — fill this in. It's what screen readers say and what Google indexes. Describe what's in the image in plain English (e.g., "Bob Hart speaking at a revenue leadership conference").
- You can drag the **hotspot** dot to set the focal point — this tells the site which part of the image to keep visible when it's cropped to different shapes.

### 6. Write the article body

The **Article Body** is your rich-text editor. It works like a simplified version of Google Docs.

**Text styles available:**
- `Normal` — standard paragraph text
- `H2` — major section heading
- `H3` — sub-section heading
- `H4` — minor sub-heading
- `Quote` — pull quote / blockquote

**Formatting marks:**
- **Bold**, *Italic*, `Inline code`

**Adding links:**
1. Highlight the text you want to link.
2. Click the link icon in the toolbar.
3. Paste the URL and choose whether to open in a new tab.

**Adding images inside the body:**
Click the **image icon** at the bottom of the editor to insert an inline image. Always fill in the Alt Text. You can optionally add a Caption that appears beneath the image.

**Headings and structure tips:**
- Use H2 for your main sections.
- Use H3 underneath H2 for sub-points.
- Don't skip heading levels (H2 → H4 with no H3) — it confuses both readers and search engines.
- Short paragraphs (3–5 sentences) are easier to read on screen than walls of text.

### 7. Social / SEO overrides (optional)

These three fields let you control exactly what appears when someone shares your article on LinkedIn, Twitter, or in iMessage:

| Field | When to use it |
|---|---|
| **OG Title Override** | When you want a different (usually shorter) headline for social vs. the page |
| **OG Description Override** | When your excerpt isn't punchy enough for social and you want a sharper hook |
| **OG Image Override** | When you want a different image for social shares than the featured image |

If you leave all three blank, the post title, excerpt, and featured image are used automatically. That's fine most of the time.

### 8. Add FAQs (optional)

The **FAQs** section appends an accordion at the bottom of your article — good for targeting "People Also Ask" results in Google. Click **Add item**, fill in a Question and Answer, and repeat. You can reorder them by dragging.

### 9. Link related posts (optional)

The **Related Posts** field lets you manually pin up to 3 other articles to show at the bottom of this one. Start typing a title in the field to search your existing posts.

### 10. Publish

When you're ready to go live:

1. Check that **Title**, **Slug**, **Published At**, and **Featured Image** are all filled in.
2. Click the **Publish** button in the top right corner of the document.
3. The button changes to show a green checkmark. The post is now live on the site.

> **Draft vs. Published:** Any changes you make after publishing show a blue "Edited" badge. The live site still shows the last-published version until you click Publish again to push the update.

---

## Editing an Existing Post

1. Click **Post** in the sidebar.
2. Find the article in the list (you can sort by **Published Date, New → Old** using the sort icon).
3. Click it to open the editor.
4. Make your changes.
5. Click **Publish** to push the update live.

There's no save button — Sanity auto-saves your work every few seconds as a draft. You won't lose anything if you close the tab mid-edit.

---

## Unpublishing / Deleting a Post

To take a post offline without deleting it:

- Click the **three-dot menu** (⋯) next to the Publish button → select **Unpublish**. The post disappears from the site but stays in your Studio as a draft.

To permanently delete a post:

- Open the post → three-dot menu → **Delete**. This is permanent. When in doubt, unpublish instead.

---

## Managing Categories

Categories appear as filter pills and section cards on the Insights page. You likely won't need to touch these often, but here's how:

1. Click **Category** in the left sidebar.
2. Click an existing category to edit it, or create a new one.

**Fields:**
- **Title** — the display name (e.g., "GTM Strategy")
- **Slug** — auto-generated from the title, used in URLs
- **Blurb** — 1–2 sentences shown on the category card on the Insights page
- **Topics** — up to 4 representative questions that appear on the card (e.g., "When should I hire a VP of Sales?")
- **Sort Order** — a number that controls the order categories appear on the page. Lower numbers appear first. Set to `1`, `2`, `3` etc.

---

## Managing Your Author Profile

You shouldn't need to edit this often, but your author byline, bio, and photo live here.

1. Click **Author** in the sidebar.
2. Click your name.
3. Update the fields and click Publish.

---

## Quick Reference: Field Checklist Before Publishing

Before you hit Publish, run through this mental checklist:

- [ ] Title — written and final
- [ ] Slug — auto-filled (leave it unless you have a reason to change it)
- [ ] Published At — date and time set
- [ ] Author — set to Bob Hart
- [ ] Category — assigned
- [ ] Excerpt — 1–3 sentences, under 300 characters
- [ ] Featured Image — uploaded, alt text filled in
- [ ] Article Body — complete
- [ ] Proofread once in the preview pane

Everything else (tags, OG overrides, FAQs, related posts) is optional enhancement.

---

# Workshops

The workshops page at `successfulbob.com/workshops` is entirely yours to run. You do not need Pablo to change a headline, update a date, or launch a new topic next year. Everything on that page comes from one document you open and edit yourself, using the exact same motions you just learned for blog posts: click a field, type, click Publish.

This section walks through it slowly, start to finish, assuming zero Sanity experience beyond what you picked up writing a blog post.

## Where to find it

1. Log into the Studio, same URL and login as always.
2. Click **Workshop** in the left sidebar.
3. Click **Product Truth Workshop** (or whichever workshop you're editing).

You're now looking at the same kind of editing screen as a blog post. It's just organized differently because there's more to fill in.

## What you'll see

Across the top of the document is a row of tabs. Each tab is a small group of related fields, so you're never looking at all sixty-odd fields at once:

| Tab | What it controls |
|---|---|
| **Identity** | The workshop's internal title, and the Page State dropdown covered below |
| **Hero** | The big headline block at the very top of the page |
| **Sessions** | Dates, times, prices, and the second (overflow) session |
| **Previews** | The two free preview sessions |
| **Video** | The optional intro video |
| **Content** | The "problem," "what you'll do," and "what you'll leave with" sections |
| **Audience** | Who it's for, and who it's not for |
| **Format** | The agenda, pre-work, and follow-up |
| **Pricing** | Seat rules and the refund policy |
| **Credit** | The Assessment credit offer |
| **Credibility** | Your bio and photo |
| **FAQs** | The question and answer accordion |
| **Closing** | The final call-to-action block, plus the messages shown when the page is closed or announcing a next cohort |
| **SEO** | What Google shows in search results |

Click a tab name to jump straight to those fields. You never need to scroll through the whole document to find one thing.

## Editing a piece of text

Click into any field and type, exactly like a Word document. There's no separate "edit mode" to turn on.

Sanity saves your work automatically as you type, the same as it does for blog posts. But **saved is not the same as published.** To make a change visible on the live site, click the **Publish** button in the top right corner. Until you do, your edit sits there safely, but nobody visiting the site can see it.

**How fast does a change go live after you publish?** Usually within a few seconds. On the rare occasion it takes longer, it will be live within an hour at the outside.

## Changing the page state

On the **Identity** tab, find **Page State**. You'll see five round buttons stacked vertically, click the one that matches where things actually stand:

| Click this | What visitors then see |
|---|---|
| **Open, selling normally** | The normal "Reserve My Founding Seat" button, and "Limited to 12 participants" |
| **Limited, showing a seat count** | A truthful "Fewer than N seats remain" line, using the number you set on the Sessions tab (see below) |
| **Sold out, main session full** | The main session shown as full; the button switches to the second session, if you've turned that on |
| **Closed, no future date announced** | The button becomes "Schedule a Fit Call" |
| **Next cohort, a future date is announced** | Requires a date on the Closing tab first, see that tab |

Click Publish after changing this. The badge at the top of the page, the seat line, the main button, and the block at the very bottom all update together automatically. You only ever touch this one control.

## Seat numbers: the one rule that matters

The page will never show an exact number of seats remaining, and that's deliberate.

Here's the reasoning in plain terms: if you write "4 seats left" and a fifth person registers two minutes later, the page is now wrong, in the direction that costs you credibility. If you write "fewer than 4 seats remain" instead, that sentence stays true no matter how many more people book afterward. It can only ever become *more* accurate over time, never less.

So the rule is:

1. Leave **Seats remaining (upper bound)** on the Sessions tab blank until you're down to 8 or fewer seats.
2. Once you are, type that number into the box, for example type `4`.
3. Set **Seat count as of** to today's date. This opens a small calendar for you to pick from. The page will then show "as of [that date]" next to the seat line.
4. Only ever move that number down. Never raise it again, even if a registration later falls through.

Luma always shows you the real, exact number when you check it directly. This field is only about what a stranger sees on the marketing page before they've committed to anything.

## The second session (the Friday overflow date)

The second, later session lives on the **Sessions** tab, inside the **Second session (optional)** group of fields. It's hidden from the live page by default.

To reveal it: find **Show the second session on the page**. It's a switch you click to turn on or off. Turn it on, then click Publish.

**When to turn it on:** roughly when 3 seats remain on the main session, not when it's completely full. That gives the second session a head start on filling while the first still reads as nearly sold out, which works in your favor rather than against it.

Two fields on this tab deserve extra care:

- **Minimum-participants promise.** This is a written commitment that buyers read before they pay for the second session, so it has to match exactly what you'll actually do. It should state the minimum number of people required, that they're charged when they book, that they're refunded in full if the minimum isn't reached, and the date you'll make that call by. Whatever date you write here, also put it on your own calendar. Sanity has no way to remind you.
- **Price (as shown)** and **Price (number)** need to agree with each other. "Price (as shown)" is the "$1,250" a visitor reads on the page. "Price (number)" is that same price written as a plain number, used only behind the scenes for how Google lists the event. If you change one, change the other to match. Sanity will show you a warning if they disagree.

## Running this workshop again next year

You don't need to build a new workshop from a blank page. Duplicate the old one:

1. Open the workshop you want to reuse.
2. Click the three-dot menu (⋯) next to the Publish button, the same menu you'd use to unpublish or delete a blog post.
3. Choose **Duplicate**.
4. A full copy opens. Update the dates, prices, Luma registration links, and any copy that's changed since last time. Everything else carries over exactly as it was.
5. Click Publish on the copy.
6. Open **Workshop Settings** and point **Live workshop** at the new copy.

The original stays exactly as it was, untouched, as a permanent record of that cohort. It simply stops being the one shown on the live page.

One thing that works differently: **Workshop Settings itself can't be duplicated or deleted.** There's deliberately only ever one, so the page never has to guess which workshop is supposed to be live. You'll always just be pointing that one entry at a different workshop, not creating new settings entries.

## A few things that are deliberate

- **The follow-up booking link does not go on the page.** It's sent to each participant privately after the session, so someone who didn't attend can't book a slot meant for a paying customer.
- **The video is optional.** Leave the YouTube URL blank on the Video tab and the entire video section disappears from the page on its own. The page is built to work fully without it.
- **Testimonials stay hidden until you add one.** No empty "what people are saying" section shows on launch day, or ever, until there's at least one real testimonial entered.
- **Times are typed, not calculated.** Type "12:30 to 3:30 PM ET / 9:30 AM to 12:30 PM PT" exactly as you want it read. Every visitor sees that exact sentence, regardless of where they're located.
- **Substitutions are handled as a refund and a fresh registration, not a transfer.** The registration platform can't transfer a ticket on our current plan, so the seat rules on the Pricing tab should say this plainly rather than promise a transfer you can't deliver.

## If something doesn't look right

**I clicked Publish, but I don't see my change on the live page yet.**
Give it a few seconds and reload the page in a fresh tab, your browser may be showing you a cached copy from before your edit. If it's genuinely still missing after a minute, double check that you clicked Publish and not just closed the tab. Sanity saves your typing automatically as a draft, but a draft by itself never reaches the live site, only Publish does that.

**I'm not sure if what I'm looking at is live, or an unpublished draft.**
Look at the Publish button itself. If it's shown in solid color, you have changes waiting that visitors can't see yet. If it's greyed out, everything in front of you is already what's live.

**I want to change something but I'm not sure which tab it's on.**
Check the table under "What you'll see" above, or just click through the tabs one at a time. Each tab only holds a handful of fields, so scanning all of them takes under a minute.

**I'm not sure what to fill in for the placeholder content Pablo flagged.**
See the separate document Pablo sent you, the Workshop Placeholder Content Checklist. It lists every field still marked `[PLACEHOLDER]`, organized by these exact same tab names, so you can work through the two documents side by side.

---

## Tips

- **Write the excerpt last.** After you've written the full article, writing the excerpt is much easier — you know exactly what the best hook is.
- **One featured post at a time.** When you feature a new article, go back and turn off the toggle on the previous one.
- **Don't change slugs on live posts.** If you must change a slug, let Pablo know so a redirect can be set up to avoid broken links.
- **Images should be at least 1200px wide.** Anything smaller may look blurry on large screens or in social shares.
- **Sanity auto-saves.** You can close the browser mid-draft and come back later — your work is saved as a draft automatically.

---

*Questions? Contact Pablo at pablosaenzweb@gmail.com*
