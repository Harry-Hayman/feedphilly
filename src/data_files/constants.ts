import ogImageSrc from "@images/feedphilly/hungry_girl_hero_image.webp";

export const SITE = {
  title: "Feed Philly Coalition",
  tagline: "Fighting Food Insecurity Together",
  description:
    "Feed Philly Coalition brings together individuals, nonprofits, businesses, and policymakers to address food insecurity in Philadelphia through collaborative, data-driven solutions and sustainable community programs.",
  description_short:
    "Creating lasting change through collaborative, data-driven solutions to food insecurity in Philadelphia.",
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
 * Deliberately omitted: the telephone number shown in the footer,
 * (215) 555-1234. 555 numbers are reserved for fiction, so it is a
 * placeholder; publishing it as machine readable contact data would be worse
 * than publishing nothing. Replace the footer number with the real one and it
 * can be added here.
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
    name: "Harry Hayman",
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
    streetAddress: "5 US-1",
    addressLocality: "Philadelphia",
    addressRegion: "PA",
    postalCode: "19004",
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
    "Join Feed Philly Coalition in creating a city where everyone has access to healthy, nutritious food. Through collaboration, data-driven solutions, and community programs, we're making lasting change in Philadelphia's fight against food insecurity.",
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
      "Feed Philly Coalition brings together individuals, nonprofits, businesses, and policymakers to address food insecurity in Philadelphia through collaborative, data-driven solutions and sustainable community programs. It was founded by Harry Hayman.",
  },
  {
    question: "How does the coalition address food insecurity in Philadelphia?",
    answer:
      "Through four areas of work: policy advocacy with government officials and stakeholders, community awareness through educational campaigns and events, collaboration with other organizations and coalitions, and education programs that provide workshops and resources.",
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
      "Email info@feedphillycoalition.org, or use the form on the contact page. The coalition is based in Philadelphia, Pennsylvania.",
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
