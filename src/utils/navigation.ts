// An array of links for navigation bar
const navBarLinks = [
  { name: "Home", url: "/" },
  { name: "Our Work", url: "/what-we-do" },
  { name: "Articles", url: "/blog" },
  { name: "About", url: "/about" },
  { name: "Contact", url: "/contact" }
];

// An array of links for footer.
// "Our Impact" pointed at /what-we-do#impact, an anchor that does not exist on
// that page (the impact block is commented out), so the link went nowhere
// useful. /serve was reachable only from the sitemap; it is linked now.
const footerLinks = [
  {
    section: "Our Work",
    links: [
      { name: "What We Do", url: "/what-we-do" },
      { name: "Who We Serve", url: "/serve" },
      { name: "Get Involved", url: "/get-involved" },
    ],
  },
  {
    section: "Resources",
    links: [
      { name: "Articles", url: "/blog" },
      { name: "About Us", url: "/about" },
      { name: "Common Questions", url: "/#faq" },
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