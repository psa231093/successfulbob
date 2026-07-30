export const allCategoriesQuery = `
  *[_type == "category"] | order(order asc) {
    title,
    "slug": slug.current,
    blurb,
    topics
  }
`;

export const featuredPostQuery = `
  *[_type == "post" && isFeatured == true] | order(publishedAt desc) [0] {
    title,
    "slug": slug.current,
    "category": category->title,
    "categorySlug": category->slug.current,
    excerpt,
    publishedAt,
    "readTime": null
  }
`;

export const allPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    "category": category->title,
    "categorySlug": category->slug.current,
    excerpt,
    publishedAt
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    "category": category->title,
    "categorySlug": category->slug.current,
    excerpt,
    publishedAt,
    openGraphTitle,
    openGraphDescription,
    "openGraphImageUrl": openGraphImage.asset->url,
    featuredImage {
      asset->{ url },
      alt
    },
    body,
    faqs[] {
      question,
      answer
    },
    "author": author-> {
      name,
      "photoUrl": photo.asset->url,
      "photoAlt": photo.alt,
      linkedinUrl
    },
    "relatedPosts": relatedPosts[]-> {
      title,
      "slug": slug.current,
      "category": category->title,
      excerpt,
      publishedAt
    }
  }
`;

export const allPostSlugsQuery = `
  *[_type == "post"] { "slug": slug.current }
`;

/* -- Workshops -- */

// Interpolated into both session fields so the two projections cannot drift.
const sessionProjection = `{
  label, dateDisplay, timeDisplay, durationDisplay,
  startsAt, endsAt,
  priceDisplay, priceAmount, currency,
  capacity, seatsRemainingBound, seatStatusAsOf,
  registrationUrl, soldOut
}`;

export const activeWorkshopQuery = `
  *[_type == "workshopSettings"][0].activeWorkshop-> {
    title,
    "slug": slug.current,
    state,
    campaignTag,

    eyebrow, heroHeadline, heroHeadlineHighlight, heroSubhead, heroFinePrint,
    heroImage { "url": asset->url, alt },
    heroInventoryItems[] { label, status, note },

    primarySession ${sessionProjection},
    overflowSession ${sessionProjection},
    revealOverflow, overflowHeadline, overflowBody, minimumThresholdNote,

    previewEyebrow, previewHeadline, previewBody, previewDisclaimer,
    previews[] { dateDisplay, timeDisplay, priceLabel, startsAt, registrationUrl },

    videoUrl, videoTitle, videoDuration, videoCaption,
    videoPoster { "url": asset->url, alt },

    problemEyebrow, problemHeadline, problemBody, problemPullQuote,
    whatYouDoEyebrow, whatYouDoHeadline, whatYouDoItems[] { title, description },
    outcomesEyebrow, outcomesHeadline, outcomes[] { title, description },

    audienceEyebrow, audienceHeadline, audienceIntro,
    audienceRoles[] { role, reason },
    notForHeadline, notFor,

    formatEyebrow, formatHeadline, formatSummary, platformNote,
    agenda[] { time, title, description },
    preWorkHeadline, preWorkBody, followUpHeadline, followUpBody,

    pricingEyebrow, pricingHeadline, seatRules, refundPolicy,

    assessmentCreditHeadline, assessmentCreditBody,
    assessmentCreditLinkLabel, assessmentCreditHref,

    bobEyebrow, bobHeadline, bobBody, bobStats[] { value, label },
    bobPhoto { "url": asset->url, alt },
    testimonials[] { quote, name, role, company, "photoUrl": photo.asset->url },

    faqHeadline, faqs[] { question, answer },

    finalBlockHeadline, finalBlockBody, closedMessage,
    nextCohortHeadline, nextCohortDateDisplay, nextCohortNotifyUrl,

    metaTitle, metaDescription, "ogImageUrl": ogImage.asset->url, noIndex
  }
`;

// Used by the sitemap so a placeholder page is never advertised.
export const activeWorkshopExistsQuery = `
  count(*[_type == "workshopSettings" && defined(activeWorkshop)]) > 0
`;
