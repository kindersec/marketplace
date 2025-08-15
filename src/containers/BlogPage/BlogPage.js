import React from 'react';
import { bool } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { propTypes } from '../../util/types';
import { Page, LayoutSingleColumn, NamedLink } from '../../components';

import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import css from './BlogPage.module.css';

// Articles data from ArticlesPage
const articles = [
  {
    id: 'smart-bathroom-gadgets',
    title: 'Smart Bathroom Gadgets That Actually Make a Difference',
    excerpt: 'Discover how smart bathroom technology can transform your daily routine with practical gadgets that enhance convenience, efficiency, and luxury.',
    date: '2025-08-04',
    author: 'Smart Home Blog',
    category: 'Smart Home',
    tags: ['smart home', 'automation', 'technology'],
    featured: true
  },
  {
    id: 'underrated-smart-devices',
    title: 'The Most Underrated Smart Devices You\'re Not Using Yet',
    excerpt: 'Explore the hidden gems of smart home technology that often go unnoticed but can significantly enhance your living experience.',
    date: '2025-08-04',
    author: 'Smart Home Blog',
    category: 'Smart Home',
    tags: ['smart home', 'automation', 'technology']
  },
  {
    id: 'smart-home-glossary',
    title: 'The Begginer\'s Glossary of Smart Home Terms You Need to Know',
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
    tags: ['smart home', 'automation', 'technology']
  },
  {
    id: 'smart-home-devices',
    title: 'Top 7 Smart Home Devices You Should Consider in 2025',
    excerpt: 'Discover the best smart home devices for 2025. From smart thermostats to AI-powered robot vacuums, find devices that offer real value and seamless integration.',
    date: '2025-01-01',
    author: 'Smart Home Expert',
    category: 'Smart Home',
    tags: ['smart home', 'automation', 'technology']
  },
  {
    id: 'smart-home-protocols',
    title: 'Wi-Fi, Zigbee, Matter? Understanding Smart Home Protocols Made Easy',
    excerpt: 'Navigate the complex world of smart home protocols with our comprehensive guide to Wi-Fi, Zigbee, and Matter. Learn which protocol is right for your smart home setup.',
    date: '2025-08-04',
    author: 'Smart Home Blog',
    category: 'Smart Home',
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
    tags: ['smart home', 'automation', 'technology']
  },
  {
    id: 'robot-vacuum',
    title: 'The Ultimate Guide to Buying Your Ideal Robot Vacuum',
    excerpt: 'Discover everything you need to know about choosing the perfect robot vacuum for your smart home, from features to product recommendations.',
    date: '2025-08-04',
    author: 'Smart Home Blog',
    category: 'Smart Home',
    tags: ['smart home', 'automation', 'technology']
  },
  {
    id: 'smart-bulb',
    title: 'How to Choose a Smart Bulb: A Comprehensive Guide for Tech-Savvy Homeowners',
    excerpt: 'Learn how to choose the perfect smart bulb for your home with our comprehensive guide covering compatibility, features, and top recommendations.',
    date: '2025-08-04',
    author: 'Smart Home Blog',
    category: 'Smart Home',
    tags: ['smart home', 'automation', 'technology', 'lighting']
  },
  {
    id: 'smart-lock',
    title: 'How to Choose the Perfect Smart Lock for Your Home',
    excerpt: 'Discover how to select the ideal smart lock for your home with our comprehensive guide covering security features, connectivity options, and top recommendations.',
    date: '2025-08-04',
    author: 'Smart Home Blog',
    category: 'Smart Home',
    tags: ['smart home', 'automation', 'technology', 'security']
  },
  {
    id: 'smart-home-myths',
    title: '10 Common Smart Home Myths Debunked!',
    excerpt: 'Discover the truth behind common smart home misconceptions and learn practical tips to make informed decisions about your smart home journey.',
    date: '2025-08-04',
    author: 'Smart Home Blog',
    category: 'Smart Home',
    tags: ['smart home', 'automation', 'technology', 'myths']
  },
  {
    id: 'smart-bulb-glossary',
    title: 'Glossary of Technical Criteria for Smart Bulbs',
    excerpt: 'Master the technical aspects of smart bulbs with our comprehensive glossary covering compatibility, light quality, control features, and energy efficiency.',
    date: '2025-08-04',
    author: 'Smart Home Blog',
    category: 'Smart Home',
    tags: ['smart home', 'automation', 'technology', 'glossary']
  },
  {
    id: 'smart-lock-glossary',
    title: 'Smart Lock Glossary: Technical Terms Explained',
    excerpt: 'Master smart lock terminology with our comprehensive glossary covering connectivity, security features, and technical specifications for informed purchasing decisions.',
    date: '2025-08-04',
    author: 'Smart Home Blog',
    category: 'Smart Home',
    tags: ['smart home', 'automation', 'technology', 'glossary']
  }
];

// Categories for filtering
const categories = [
  "All Posts",
  "Smart Home",
  "Technology",
  "Automation",
  "Security",
  "Energy Efficiency"
];

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

export const BlogPageComponent = props => {
  const { inProgress, error, history } = props;
  const [selectedCategory, setSelectedCategory] = React.useState("All Posts");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredPosts = selectedCategory === "All Posts"
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  const featuredPost = articles.find(article => article.featured);

  if (inProgress) {
    return (
      <Page
        title="Smart Home Blog | Domee"
        description="Read expert smart home articles, guides, and reviews. Learn about Wi‑Fi, security, lighting, automation, and the best devices for your home."
        scrollingDisabled={false}
      >
        <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
          <div className={css.loading}>Loading...</div>
        </LayoutSingleColumn>
      </Page>
    );
  }

  if (error) {
    return (
      <Page
        title="Smart Home Blog | Domee"
        description="Read expert smart home articles, guides, and reviews. Learn about Wi‑Fi, security, lighting, automation, and the best devices for your home."
        scrollingDisabled={false}
      >
        <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
          <div className={css.error}>
            <h2>Oops, something went wrong!</h2>
            <p>{error.message}</p>
          </div>
        </LayoutSingleColumn>
      </Page>
    );
  }

  return (
    <Page
      title="Smart Home Blog | Domee"
      description="Discover smart home insights, tutorials, and product recommendations to help you build a smarter, safer, and more efficient home."
      scrollingDisabled={false}
    >
      <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
        <div className={css.root}>
          {/* Hero Section */}
          <section className={css.hero}>
            <div className={css.container}>
              <div className={css.heroContent}>
                <h1 className={css.heroTitle}>Smart Home Articles & Insights
                </h1>
                <p className={css.heroSubtitle}>
                  Discover expert tips, comprehensive guides, and the latest insights in smart home technology.
                  From beginner basics to advanced automation, we've got everything you need to transform your home.
                </p>
                <div className={css.heroActions}>
                  <NamedLink name="ArticlesPage" className={css.heroButton}>
                    View All Articles
                  </NamedLink>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Post Section */}
          {featuredPost && (
            <section className={css.featuredSection}>
              <div className={css.container}>
                <h2 className={css.sectionTitle}>Featured Article</h2>
                <div className={css.featuredPost}>
                  <div className={css.featuredImage}>
                    <div className={css.imagePlaceholder}>
                      <span className={css.imageIcon}>📱</span>
                      <p>Featured Post Image</p>
                    </div>
                  </div>
                  <div className={css.featuredContent}>
                    <div className={css.postMeta}>
                      <span className={css.category}>{featuredPost.category}</span>
                      <span className={css.date}>{featuredPost.date}</span>
                    </div>
                    <h3 className={css.featuredTitle}>{featuredPost.title}</h3>
                    <p className={css.featuredExcerpt}>{featuredPost.excerpt}</p>
                    <div className={css.authorInfo}>
                      <span className={css.authorAvatar}>👤</span>
                      <span className={css.authorName}>By {featuredPost.author}</span>
                    </div>
                    <NamedLink name={getArticleRouteName(featuredPost.id)} className={css.readMoreButton}>
                      Read Full Article
                    </NamedLink>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Categories Filter */}
          <section className={css.categoriesSection}>
            <div className={css.container}>
              <div className={css.categoriesFilter}>
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`${css.categoryButton} ${selectedCategory === category ? css.active : ''}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className={css.postsSection}>
            <div className={css.container}>
              <div className={css.postsGrid}>
                {filteredPosts.filter(article => !article.featured).map((article) => (
                  <article key={article.id} className={css.postCard}>
                    <div className={css.postImage}>
                      <div className={css.imagePlaceholder}>
                        <span className={css.imageIcon}>📱</span>
                        <p>Article Image</p>
                      </div>
                    </div>
                    <div className={css.postContent}>
                      <div className={css.postMeta}>
                        <span className={css.category}>{article.category}</span>
                        <span className={css.date}>{article.date}</span>
                      </div>
                      <h3 className={css.postTitle}>{article.title}</h3>
                      <p className={css.postExcerpt}>{article.excerpt}</p>
                      <div className={css.authorInfo}>
                        <span className={css.authorAvatar}>👤</span>
                        <span className={css.authorName}>By {article.author}</span>
                      </div>
                      <NamedLink name={getArticleRouteName(article.id)} className={css.readMoreButton}>
                        Read More
                      </NamedLink>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter Section */}
          <section className={css.newsletterSection}>
            <div className={css.container}>
              <div className={css.newsletterContent}>
                <h2 className={css.newsletterTitle}>Stay Updated</h2>
                <p className={css.newsletterSubtitle}>
                  Get the latest smart home articles and expert tips delivered to your inbox
                </p>
                <div className={css.newsletterForm}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className={css.newsletterInput}
                  />
                  <button className={css.newsletterButton}>
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

BlogPageComponent.propTypes = {
  inProgress: bool,
  error: propTypes.error,
};

const mapStateToProps = state => {
  return {
    inProgress: false,
    error: null,
  };
};

const BlogPage = compose(connect(mapStateToProps), withRouter)(BlogPageComponent);

export default BlogPage;
