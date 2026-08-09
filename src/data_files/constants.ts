import ogImageSrc from "@images/real_images/20250212_104744.jpeg";

export const SITE = {
  title: "Feed Philly Coalition",
  tagline: "Fighting Food Insecurity Together",
  description:
    "The Feed Philly Coalition is a coalition of nonprofits, businesses, government, healthcare, education, agriculture, philanthropy, and community leaders working together to build a stronger, healthier, more resilient regional food system.",
  description_short:
    "Nonprofits, businesses, government, and community leaders working together to build a stronger, healthier, more resilient regional food system.",
  url: "https://feedphillycoalition.org",
  author: "Feed Philly Coalition",
};

/** Profiles the organisation controls. Used for sameAs in structured data. */
export const SOCIAL_PROFILES = [
  "https://www.facebook.com/FeedPhilly/",
  "https://x.com/feed_philly_",
  "https://www.instagram.com/feed.philly/",
  "https://www.linkedin.com/company/feed-philly-coalition/",
];

/**
 * Sitewide organisation markup.
 *
 * Every page carries this unless it passes its own structuredData. It gives
 * search and answer engines the entity basics: what this organisation is,
 * where it operates, and which profiles belong to it.
 *
 * Deliberately omitted: a telephone number. The site has no real one yet;
 * publishing a placeholder as machine readable contact data would be worse
 * than publishing nothing. Add it here when a real number exists.
 */
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": `${SITE.url}/#organization`,
  name: SITE.title,
  alternateName: ["Feed Philly", "Feed Philly Coalition Philadelphia"],
  url: SITE.url,
  description: SITE.description,
  slogan: SITE.tagline,
  inLanguage: "en-US",
  email: "info@feedphillycoalition.org",
  foundingDate: "2024",
  founder: {
    "@type": "Person",
    name: "Harry G. Hayman IV",
    url: "https://harryhayman.com",
  },
  areaServed: {
    "@type": "City",
    name: "Philadelphia",
    "@id": "https://en.wikipedia.org/wiki/Philadelphia",
    containedInPlace: {
      "@type": "State",
      name: "Pennsylvania",
    },
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "640 North Broad Street, Suite 732",
    addressLocality: "Philadelphia",
    addressRegion: "PA",
    postalCode: "19130",
    addressCountry: "US",
  },
  knowsAbout: [
    "Food insecurity in Philadelphia",
    "Food security",
    "Hunger relief",
    "Food justice",
    "Policy advocacy",
    "Community outreach",
    "Nonprofit collaboration",
    "Controlled environment agriculture",
    "Food as Medicine",
    "Regional food infrastructure",
    "Workforce development",
    "Public-private partnerships",
  ],
  sameAs: SOCIAL_PROFILES,
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: ORGANIZATION_SCHEMA,
};

export const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title}: Fighting Food Insecurity in Philadelphia`,
  description:
    "A coalition of nonprofits, businesses, government, healthcare, education, agriculture, philanthropy, and community leaders working together to build a stronger, healthier, more resilient regional food system for Philadelphia.",
  image: ogImageSrc,
};

/**
 * Homepage FAQ.
 *
 * Every answer below is taken from copy that is already published on this
 * site (the homepage pillars, the Our Work page, the Get Involved page, the
 * team page and the footer). Nothing here is a new claim, a new statistic or
 * a new programme. If a fact is not already on the site, it is not here.
 */
export const FAQS = [
  {
    question: "What is Feed Philly Coalition?",
    answer:
      "A coalition of nonprofits, businesses, government, healthcare, education, agriculture, philanthropy, and community leaders working together to build a stronger, healthier, more resilient regional food system for Philadelphia.",
  },
  {
    question: "How does the coalition address food insecurity in Philadelphia?",
    answer:
      "Through four areas of work: policy advocacy with government officials and stakeholders, community awareness through educational campaigns and events, collaboration with other organizations and coalitions, and education programs that provide workshops and resources.",
  },
  {
    question: "What is the coalition working on next?",
    answer:
      "The future of the regional food system: controlled environment agriculture, food innovation, Food as Medicine, workforce development, regional food infrastructure, public-private partnerships, and data-driven tools including artificial intelligence and CivicOS.",
  },
  {
    question: "Who does food insecurity in Philadelphia affect?",
    answer:
      "Food insecurity affects thousands of Philadelphia families, particularly children. The coalition works with a range of stakeholders to ensure that no one in the community goes hungry.",
  },
  {
    question: "Who does Feed Philly Coalition work with?",
    answer:
      "The School District of Philadelphia, local government officials, the business community, and anchor institutions such as hospitals and universities.",
  },
  {
    question: "How can I help fight food insecurity in Philadelphia?",
    answer:
      "You can sign up to advocate, partner with the coalition as an organization, spread awareness on social media, support policy initiatives, or build partnerships with other organizations. The Get Involved page has the details.",
  },
  {
    question: "How do I contact Feed Philly Coalition?",
    answer:
      "Email info@feedphillycoalition.org, or use the form on the contact page. The coalition is at 640 North Broad Street, Suite 732, Philadelphia, PA 19130.",
  },
];

export const partnersData = [
  {
    icon: `<svg class="mx-auto h-auto w-32 py-3 sm:mx-0 lg:w-40 lg:py-5" viewBox="0 0 200 50">
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="#6B7280">
        Philadelphia Food Bank
      </text>
    </svg>`,
    name: "Philadelphia Food Bank",
    href: "#",
  },
  {
    icon: `<svg class="mx-auto h-auto w-32 py-3 sm:mx-0 lg:w-40 lg:py-5" viewBox="0 0 200 50">
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="#6B7280">
        Nutritional Services Inc.
      </text>
    </svg>`,
    name: "Nutritional Services Inc.",
    href: "#",
  },
  {
    icon: `<svg class="mx-auto h-auto w-32 py-3 sm:mx-0 lg:w-40 lg:py-5" viewBox="0 0 200 50">
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="#6B7280">
        Community Food Partners
      </text>
    </svg>`,
    name: "Community Food Partners",
    href: "#",
  },
  {
    icon: `<svg class="mx-auto h-auto w-32 py-3 sm:mx-0 lg:w-40 lg:py-5" viewBox="0 0 200 50">
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="#6B7280">
        Local Farmers Alliance
      </text>
    </svg>`,
    name: "Local Farmers Alliance",
    href: "#",
  }
];
