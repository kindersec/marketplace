/**
 * Site Structure Configuration
 *
 * This file defines the structure of the website with categorized pages
 * that the chatbot can use to recommend relevant content to users.
 */

export const siteStructure = {
  // Main navigation pages
  main: {
    home: { path: '/', title: 'Home', description: 'Landing page with featured products and categories' },
    products: { path: '/products', title: 'Browse Products', description: 'Search and browse all smart home products' },
    categories: { path: '/categories', title: 'Categories', description: 'Browse products by category' },
    brands: { path: '/brands', title: 'Brands', description: 'Browse products by brand' },
    about: { path: '/about', title: 'About Us', description: 'Learn about our company and mission' },
    contact: { path: '/contact', title: 'Contact Us', description: 'Get in touch with our support team' },
  },

  // Customer support and help pages
  support: {
    faq: { path: '/faq', title: 'FAQ', description: 'Frequently asked questions and answers' },
    chatSupport: { path: '/support', title: 'Chat Support', description: 'Get help from our AI assistant' },
    shipping: { path: '/shipping-and-delivery', title: 'Shipping & Delivery', description: 'Information about shipping options and delivery times' },
    returns: { path: '/return-and-refund', title: 'Returns & Refunds', description: 'Our return policy and refund process' },
    payment: { path: '/payment-and-billing', title: 'Payment & Billing', description: 'Accepted payment methods and billing information' },
    prohibited: { path: '/prohibited-items', title: 'Prohibited Items', description: 'Items that cannot be sold on our platform' },
  },

  // Legal and policy pages
  legal: {
    terms: { path: '/terms-of-service', title: 'Terms of Service', description: 'Terms and conditions of using our platform' },
    privacy: { path: '/privacy-policy', title: 'Privacy Policy', description: 'How we collect, use, and protect your data' },
  },

  // Educational and informational content
  articles: {
    main: { path: '/articles', title: 'Articles', description: 'Browse all smart home articles and guides' },
    smartBathroom: { path: '/articles/smart-bathroom-gadgets', title: 'Smart Bathroom Gadgets', description: 'Guide to smart bathroom technology' },
    underratedDevices: { path: '/articles/underrated-smart-devices', title: 'Underrated Smart Devices', description: 'Hidden gems in smart home technology' },
    glossary: { path: '/articles/smart-home-glossary', title: 'Smart Home Glossary', description: 'Definitions of smart home terms and concepts' },
    wifi: { path: '/articles/wi-fi', title: 'Wi-Fi Guide', description: 'Wi-Fi setup and troubleshooting for smart homes' },
    livingRoom: { path: '/articles/smart-living-room', title: 'Smart Living Room', description: 'How to automate your living room' },
    smartPlugs: { path: '/articles/smart-plugs', title: 'Smart Plugs Guide', description: 'Everything about smart plugs and outlets' },
    smartDevices: { path: '/articles/smart-home-devices', title: 'Smart Home Devices', description: 'Overview of smart home device types' },
    protocols: { path: '/articles/smart-home-protocols', title: 'Smart Home Protocols', description: 'Understanding Zigbee, Z-Wave, and other protocols' },
    videoDoorbell: { path: '/articles/video-doorbell', title: 'Video Doorbell Guide', description: 'Choosing and setting up video doorbells' },
    robotLawnMower: { path: '/articles/robot-lawn-mower', title: 'Robot Lawn Mower Guide', description: 'Automated lawn care solutions' },
    robotVacuum: { path: '/articles/robot-vacuum', title: 'Robot Vacuum Guide', description: 'Smart vacuum cleaners and mops' },
    smartBulb: { path: '/articles/smart-bulb', title: 'Smart Bulb Guide', description: 'Smart lighting solutions and setup' },
    smartLock: { path: '/articles/smart-lock', title: 'Smart Lock Guide', description: 'Smart locks and home security' },
    smartHomeMyths: { path: '/articles/smart-home-myths', title: 'Smart Home Myths Debunked', description: 'Common misconceptions about smart homes' },
    smartBulbGlossary: { path: '/articles/smart-bulb-glossary', title: 'Smart Bulb Glossary', description: 'Technical terms for smart lighting' },
    smartLockGlossary: { path: '/articles/smart-lock-glossary', title: 'Smart Lock Glossary', description: 'Technical terms for smart locks' },
  },

  // Technical and compatibility information
  technical: {
    compatibility: { path: '/compatibility', title: 'Compatibility Guide', description: 'Check device compatibility and integration' },
  },

  // User account pages (require authentication)
  account: {
    profile: { path: '/profile', title: 'Profile Dashboard', description: 'Manage your account and preferences', auth: true },
    orders: { path: '/orders', title: 'My Orders', description: 'View and manage your orders', auth: true },
    listings: { path: '/listings', title: 'My Listings', description: 'Manage your product listings', auth: true },
    inbox: { path: '/inbox', title: 'Messages', description: 'View your messages and conversations', auth: true },
    cart: { path: '/cart', title: 'Shopping Cart', description: 'View and manage your cart items', auth: true },
  },
};

/**
 * Get all pages as a flat array for easy searching
 */
export const getAllPages = () => {
  const pages = [];

  Object.values(siteStructure).forEach(category => {
    Object.values(category).forEach(page => {
      pages.push(page);
    });
  });

  return pages;
};

/**
 * Search pages by keywords in title, description, or path
 */
export const searchPages = (query) => {
  if (!query || typeof query !== 'string') return [];

  const searchTerm = query.toLowerCase();
  const allPages = getAllPages();

  return allPages.filter(page => {
    return (
      page.title.toLowerCase().includes(searchTerm) ||
      page.description.toLowerCase().includes(searchTerm) ||
      page.path.toLowerCase().includes(searchTerm)
    );
  });
};

/**
 * Get pages by category
 */
export const getPagesByCategory = (category) => {
  return siteStructure[category] ? Object.values(siteStructure[category]) : [];
};

/**
 * Get specific page by path
 */
export const getPageByPath = (path) => {
  const allPages = getAllPages();
  return allPages.find(page => page.path === path);
};

/**
 * Get pages that might be relevant to a user query
 */
export const getRelevantPages = (query) => {
  if (!query || typeof query !== 'string') return [];

  const searchTerm = query.toLowerCase();
  const allPages = getAllPages();
  const relevantPages = [];

  // Define keyword mappings for better relevance
  const keywordMappings = {
    'refund': ['returns', 'refund', 'return policy'],
    'return': ['returns', 'refund', 'return policy'],
    'shipping': ['shipping', 'delivery', 'shipping policy'],
    'delivery': ['shipping', 'delivery', 'shipping policy'],
    'payment': ['payment', 'billing', 'payment methods'],
    'billing': ['payment', 'billing', 'payment methods'],
    'faq': ['faq', 'help', 'support', 'questions'],
    'help': ['faq', 'help', 'support', 'questions'],
    'support': ['faq', 'help', 'support', 'questions'],
    'blog': ['articles', 'blog', 'guides', 'tips'],
    'article': ['articles', 'blog', 'guides', 'tips'],
    'guide': ['articles', 'blog', 'guides', 'tips'],
    'smart bulb': ['smartBulb', 'smartBulbGlossary', 'smartDevices'],
    'smart lock': ['smartLock', 'smartLockGlossary', 'smartDevices'],
    'smart plug': ['smartPlugs', 'smartDevices'],
    'robot vacuum': ['robotVacuum', 'smartDevices'],
    'video doorbell': ['videoDoorbell', 'smartDevices'],
    'wifi': ['wifi', 'protocols', 'compatibility'],
    'zigbee': ['protocols', 'compatibility'],
    'z-wave': ['protocols', 'compatibility'],
    'compatibility': ['compatibility', 'protocols'],
    'setup': ['smartBulb', 'smartLock', 'smartPlugs', 'robotVacuum', 'videoDoorbell'],
    'installation': ['smartBulb', 'smartLock', 'smartPlugs', 'robotVacuum', 'videoDoorbell'],
    'troubleshooting': ['wifi', 'compatibility', 'smartBulb', 'smartLock', 'smartPlugs'],
    'privacy': ['privacy', 'privacy policy'],
    'terms': ['terms', 'terms of service'],
    'about': ['about'],
    'contact': ['contact'],
    'brands': ['brands'],
    'categories': ['categories'],
  };

  // Check for exact keyword matches first
  for (const [keyword, relatedTerms] of Object.entries(keywordMappings)) {
    if (searchTerm.includes(keyword)) {
      for (const term of relatedTerms) {
        const matchingPages = allPages.filter(page =>
          page.path.includes(term) ||
          page.title.toLowerCase().includes(term) ||
          page.description.toLowerCase().includes(term)
        );
        relevantPages.push(...matchingPages);
      }
    }
  }

  // Also do a general search
  const generalMatches = searchPages(query);
  relevantPages.push(...generalMatches);

  // Remove duplicates and sort by relevance
  const uniquePages = [...new Map(relevantPages.map(page => [page.path, page])).values()];

  // Sort by relevance (exact matches first, then partial matches)
  return uniquePages.sort((a, b) => {
    const aExact = a.title.toLowerCase().includes(searchTerm) || a.path.includes(searchTerm);
    const bExact = b.title.toLowerCase().includes(searchTerm) || b.path.includes(searchTerm);

    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    return 0;
  });
};

export default siteStructure;
