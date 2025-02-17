import ogImageSrc from "@images/feedphilly/hungry_girl_hero_image.webp";

export const SITE = {
  title: "Feed Philly Coalition",
  tagline: "Fighting Food Insecurity Together",
  description: "Feed Philly Coalition brings together individuals, nonprofits, businesses, and policymakers to address food insecurity in Philadelphia through collaborative, data-driven solutions and sustainable community programs.",
  description_short: "Creating lasting change through collaborative, data-driven solutions to food insecurity in Philadelphia.",
  url: "https://feedphilly.org",
  author: "Feed Philly Coalition",
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "NGO",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
    },
  },
};

export const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title}: Fighting Food Insecurity in Philadelphia`,
  description: "Join Feed Philly Coalition in creating a city where everyone has access to healthy, nutritious food. Through collaboration, data-driven solutions, and community programs, we're making lasting change in Philadelphia's fight against food insecurity.",
  image: ogImageSrc,
};

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