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
