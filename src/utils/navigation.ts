// An array of links for navigation bar
const navBarLinks = [
  { name: "Home", url: "/" },
  { name: "Our Work", url: "/what-we-do" },
  { name: "Articles", url: "/blog" },
  { name: "About", url: "/about" },
  { name: "Contact", url: "/contact" }
];

// An array of links for footer
const footerLinks = [
  {
    section: "Our Work",
    links: [
      { name: "Our Programs", url: "/what-we-do" },
      { name: "Our Impact", url: "/what-we-do#impact" },
      { name: "Get Involved", url: "/get-involved" },
    ],
  },
  {
    section: "Resources",
    links: [
      { name: "Articles", url: "/blog" },
      { name: "About Us", url: "/about" },
      { name: "Contact", url: "/contact" },
    ],
  },
];

// An object of links for social icons
const socialLinks = {
  facebook: "https://www.facebook.com/FeedPhilly/",
  twitter: "https://x.com/feed_philly_",
  instagram: "https://www.instagram.com/feed.philly/",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};