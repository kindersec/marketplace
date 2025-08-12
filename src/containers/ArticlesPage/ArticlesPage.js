import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  NamedLink,
  LayoutComposer,
  Heading,
} from '../../components';

import StaticPage from '../PageBuilder/StaticPage';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import css from './ArticlesPage.module.css';

const ArticlesPage = ({ children, params }) => {
  const layoutAreas = `
    topbar
    main
    footer
  `;

  // Articles data
  const articles = [
    {
      id: 'smart-bathroom-gadgets',
      title: 'Smart Bathroom Gadgets That Actually Make a Difference',
      excerpt: 'Discover how smart bathroom technology can transform your daily routine with practical gadgets that enhance convenience, efficiency, and luxury.',
      date: '2025-08-04',
      author: 'Smart Home Blog',
      category: 'Smart Home',
      articleType: 'Product Reviews',
      tags: ['smart home', 'automation', 'technology']
    },
    {
      id: 'underrated-smart-devices',
      title: 'The Most Underrated Smart Devices You\'re Not Using Yet',
      excerpt: 'Explore the hidden gems of smart home technology that often go unnoticed but can significantly enhance your living experience.',
      date: '2025-08-04',
      author: 'Smart Home Blog',
      category: 'Smart Home',
      articleType: 'Product Reviews',
      tags: ['smart home', 'automation', 'technology']
    },
    {
      id: 'smart-home-glossary',
      title: 'The Ultimate Glossary of Smart Home Terms You Need to Know',
      excerpt: 'Demystify smart home terminology with our comprehensive glossary covering IoT, voice assistants, security, and energy efficiency terms.',
      date: '2025-08-04',
      author: 'Smart Home Blog',
      category: 'Technology',
      articleType: 'Technical Articles',
      tags: ['smart home', 'automation', 'technology']
    },
    {
      id: 'wi-fi',
      title: 'Wi-Fi: The Backbone of Your Smart Home',
      excerpt: 'Learn how to build a robust Wi-Fi network for your smart home with router recommendations, optimization tips, and mesh system solutions.',
      date: '2025-08-04',
      author: 'Smart Home Blog',
      category: 'Technology',
      articleType: 'Technical Articles',
      tags: ['smart home', 'automation', 'technology']
    },
    {
      id: 'smart-living-room',
      title: 'How to Make Your Living Room Smarter in 5 Easy Steps',
      excerpt: 'Transform your living room into a smart hub with lighting, entertainment, climate control, security, and voice assistants in just 5 easy steps.',
      date: '2025-08-04',
      author: 'Smart Home Blog',
      category: 'Automation',
      articleType: 'How-To Guides',
      tags: ['smart home', 'automation', 'technology']
    },
    {
      id: 'smart-plugs',
      title: 'Best Smart Plugs Compared: Which One Is Right for You?',
      excerpt: 'Compare the best smart plugs on the market with detailed features, compatibility, and recommendations to find the perfect fit for your smart home.',
      date: '2025-08-04',
      author: 'Smart Home Blog',
      category: 'Smart Home',
      articleType: 'Buying Guides',
      tags: ['smart home', 'automation', 'technology']
    },
    {
      id: 'smart-home-devices',
      title: 'Top 7 Smart Home Devices You Should Consider in 2025',
      excerpt: 'Discover the best smart home devices for 2025. From smart thermostats to AI-powered robot vacuums, find devices that offer real value and seamless integration.',
      date: '2025-01-01',
      author: 'Smart Home Expert',
      category: 'Smart Home',
      articleType: 'Product Reviews',
      tags: ['smart home', 'automation', 'technology']
    },
    {
      id: 'smart-home-protocols',
      title: 'Wi-Fi, Zigbee, Matter? Understanding Smart Home Protocols Made Easy',
      excerpt: 'Navigate the complex world of smart home protocols with our comprehensive guide to Wi-Fi, Zigbee, and Matter. Learn which protocol is right for your smart home setup.',
      date: '2025-08-04',
      author: 'Smart Home Blog',
      category: 'Smart Home',
      articleType: 'Technical Articles',
      tags: ['smart home', 'automation', 'technology', 'protocols']
    },
    {
      id: 'video-doorbell',
      title: 'How to Buy Your Video Doorbell: A Comprehensive Guide',
      excerpt: 'Learn everything you need to know about choosing the perfect video doorbell for your smart home, from features to installation tips.',
      date: '2025-08-04',
      author: 'Smart Home Blog',
      category: 'Security',
      articleType: 'Buying Guides',
      tags: ['smart home', 'automation', 'technology']
    },
    {
      id: 'robot-lawn-mower',
      title: 'How to Buy Your Robot Lawn Mower: A Smart Home Enthusiast\'s Guide',
      excerpt: 'Discover everything you need to know about choosing the perfect robot lawn mower for your smart home, from features to installation tips.',
      date: '2025-08-04',
      author: 'Smart Home Blog',
      category: 'Smart Home',
      articleType: 'Buying Guides',
      tags: ['smart home', 'automation', 'technology']
    },
          {
        id: 'robot-vacuum',
        title: 'The Ultimate Guide to Buying Your Ideal Robot Vacuum',
        excerpt: 'Discover everything you need to know about choosing the perfect robot vacuum for your smart home, from features to product recommendations.',
        date: '2025-08-04',
        author: 'Smart Home Blog',
        category: 'Smart Home',
        articleType: 'Buying Guides',
        tags: ['smart home', 'automation', 'technology']
      },
      {
        id: 'smart-bulb',
        title: 'How to Choose a Smart Bulb: A Comprehensive Guide for Tech-Savvy Homeowners',
        excerpt: 'Learn how to choose the perfect smart bulb for your home with our comprehensive guide covering compatibility, features, and top recommendations.',
        date: '2025-08-04',
        author: 'Smart Home Blog',
        category: 'Smart Home',
        articleType: 'How-To Guides',
        tags: ['smart home', 'automation', 'technology', 'lighting']
      },
      {
        id: 'smart-lock',
        title: 'How to Choose the Perfect Smart Lock for Your Home',
        excerpt: 'Discover how to select the ideal smart lock for your home with our comprehensive guide covering security features, connectivity options, and top recommendations.',
        date: '2025-08-04',
        author: 'Smart Home Blog',
        category: 'Smart Home',
        articleType: 'How-To Guides',
        tags: ['smart home', 'automation', 'technology', 'security']
      },
      {
        id: 'smart-home-myths',
        title: '10 Common Smart Home Myths Debunked!',
        excerpt: 'Discover the truth behind common smart home misconceptions and learn practical tips to make informed decisions about your smart home journey.',
        date: '2025-08-04',
        author: 'Smart Home Blog',
        category: 'Smart Home',
        articleType: 'Technical Articles',
        tags: ['smart home', 'automation', 'technology', 'myths']
      },
      {
        id: 'smart-bulb-glossary',
        title: 'Glossary of Technical Criteria for Smart Bulbs',
        excerpt: 'Master the technical aspects of smart bulbs with our comprehensive glossary covering compatibility, light quality, control features, and energy efficiency.',
        date: '2025-08-04',
        author: 'Smart Home Blog',
        category: 'Smart Home',
        articleType: 'Technical Articles',
        tags: ['smart home', 'automation', 'technology', 'glossary']
      },
            {
        id: 'smart-lock-glossary',
        title: 'Smart Lock Glossary: Technical Terms Explained',
        excerpt: 'Master smart lock terminology with our comprehensive glossary covering connectivity, security features, and technical specifications for informed purchasing decisions.',
        date: '2025-08-04',
        author: 'Smart Home Blog',
        category: 'Smart Home',
        articleType: 'Technical Articles',
        tags: ['smart home', 'automation', 'technology', 'glossary']
      },

    ];

  // Article types for filtering
  const articleTypes = [
    "All Articles",
    "Buying Guides",
    "How-To Guides",
    "Product Reviews",
    "Technical Articles"
  ];

  // Router hooks for shareable filters via URL
  const history = useHistory();
  const location = useLocation();

  // Initialize state from URL params
  const paramsFromUrl = new URLSearchParams(location.search);
  const urlType = paramsFromUrl.get('type');
  const urlQuery = paramsFromUrl.get('q') || '';
  const initialType = articleTypes.includes(urlType) ? urlType : "All Articles";

  // State for filtering (initialized from URL)
  const [selectedArticleType, setSelectedArticleType] = React.useState(initialType);
  const [searchQuery, setSearchQuery] = React.useState(urlQuery);

  const handleArticleTypeChange = (articleType) => {
    setSelectedArticleType(articleType);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredArticles = articles.filter(article => {
    const typeMatch = selectedArticleType === "All Articles" || article.articleType === selectedArticleType;

    const searchMatch = searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return typeMatch && searchMatch;
  });

  // Keep URL in sync with filter state
  React.useEffect(() => {
    const sp = new URLSearchParams();
    if (selectedArticleType && selectedArticleType !== 'All Articles') {
      sp.set('type', selectedArticleType);
    }
    if (searchQuery && searchQuery.trim() !== '') {
      sp.set('q', searchQuery.trim());
    }
    const qs = sp.toString();
    const nextUrl = qs ? `${location.pathname}?${qs}` : location.pathname;
    const currentUrl = `${location.pathname}${location.search}`;
    if (nextUrl !== currentUrl) {
      history.replace(nextUrl);
    }
  }, [selectedArticleType, searchQuery, history, location.pathname, location.search]);

  // Update state if URL changes (e.g., back/forward navigation)
  React.useEffect(() => {
    const sp = new URLSearchParams(location.search);
    const nextType = sp.get('type');
    const nextQuery = sp.get('q') || '';
    const validType = articleTypes.includes(nextType) ? nextType : 'All Articles';
    if (validType !== selectedArticleType) {
      setSelectedArticleType(validType);
    }
    if (nextQuery !== searchQuery) {
      setSearchQuery(nextQuery);
    }
  }, [location.search]);

  // Helper function to map article IDs to route names
  const getArticleRouteName = (articleId) => {
    const routeMap = {
      'smart-bathroom-gadgets': 'SmartBathroomGadgetsPage',
      'underrated-smart-devices': 'UnderratedSmartDevicesPage',
      'smart-home-glossary': 'SmartHomeGlossaryPage',
      'wi-fi': 'WiFiPage',
      'smart-living-room': 'SmartLivingRoomPage',
      'smart-plugs': 'SmartPlugsPage',
      'smart-home-devices': 'SmartHomeDevicesPage',
      'smart-home-protocols': 'SmartHomeProtocolsPage',
      'video-doorbell': 'VideoDoorbellPage',
      'robot-lawn-mower': 'RobotLawnMowerPage',
      'robot-vacuum': 'RobotVacuumPage',
      'smart-bulb': 'SmartBulbPage',
      'smart-lock': 'SmartLockPage',
      'smart-home-myths': 'SmartHomeMythsPage',
      'smart-bulb-glossary': 'SmartBulbGlossaryPage',
      'smart-lock-glossary': 'SmartLockGlossaryPage'
    };
    return routeMap[articleId] || 'ArticlesPage';
  };

  // If there's a specific article route, render the child component
  if (children) {
    return children;
  }

  return (
    <StaticPage
      className={css.root}
      title="Smart Home Articles - Expert Tips and Reviews"
      description="Discover the latest smart home technology insights, tips, and reviews from our expert team. Learn how to transform your home with intelligent automation."
      schema={{
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        headline: 'Smart Home Articles - Expert Tips and Reviews',
        description: 'Discover the latest smart home technology insights, tips, and reviews from our expert team.',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://yourdomain.com/articles',
        },
      }}
    >
      <LayoutComposer areas={layoutAreas} className={css.layout}>
        {() => (
          <>
            <TopbarContainer />
            <main className={css.content}>
              <div className={css.header}>
                <Heading as="h1" rootClassName={css.pageTitle}>
                  Smart Home Articles
                </Heading>
                <p className={css.subtitle}>
                  Expert insights, tips, and reviews to help you build the perfect smart home
                </p>
              </div>

              {/* Search and Filter Controls - Top Right Corner */}
              <div className={css.topRightControls}>
                {/* Search Bar */}
                <div className={css.searchContainer}>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={css.searchInput}
                  />
                </div>

                {/* Article Type Filter Dropdown */}
                <div className={css.filterContainer}>
                  <select
                    value={selectedArticleType}
                    onChange={(e) => handleArticleTypeChange(e.target.value)}
                    className={css.filterDropdown}
                  >
                    <option value="All Articles">All Article Types</option>
                    <option value="Buying Guides">Buying Guides</option>
                    <option value="How-To Guides">How-To Guides</option>
                    <option value="Product Reviews">Product Reviews</option>
                    <option value="Technical Articles">Technical Articles</option>
                  </select>
                </div>
              </div>

              {/* Articles Grid */}
              <div className={css.articlesGrid}>
                {filteredArticles.map((article) => (
                  <NamedLink key={article.id} name={getArticleRouteName(article.id)} className={css.articleCardLink}>
                    <article className={css.articleCard}>
                      <div className={css.articleContent}>
                        <div className={css.articleMeta}>
                          <span className={css.category}>{article.category}</span>
                          <span className={css.articleType}>{article.articleType}</span>
                          <span className={css.date}>{article.date}</span>
                        </div>
                        <h2 className={css.articleTitle}>
                          {article.title}
                        </h2>
                        <p className={css.articleExcerpt}>{article.excerpt}</p>
                        <div className={css.articleTags}>
                          {article.tags.map(tag => (
                            <span key={tag} className={css.tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </NamedLink>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className={css.noResults}>
                  <p>No articles found matching your criteria.</p>
                </div>
              )}
            </main>
            <FooterContainer />
          </>
        )}
      </LayoutComposer>
    </StaticPage>
  );
};

export default ArticlesPage;
