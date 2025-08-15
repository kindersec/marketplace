import React from 'react';
import { bool } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { propTypes } from '../../util/types';
import { Page, LayoutSingleColumn, NamedLink } from '../../components';

import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import css from './LandingPage.module.css';
import smartHomeImage from '../../assets/illustration 7.png';

// Hero section data
const heroData = {
  title: "Transform Your Home with Smart Technology",
  subtitle: "Discover the latest smart home devices from top brands. Control, automate, and enhance your living space with cutting-edge technology.",
  ctaText: "Explore Smart Home Devices",
  ctaSecondary: "Learn More",
  imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
};

// Features section data
const featuresData = [
  {
    icon: "🏠",
    title: "Smart Home Control",
    description: "Control all your devices from one app. Lights, security, climate, and more."
  },
  {
    icon: "🔒",
    title: "Enhanced Security",
    description: "Monitor your home with smart cameras, locks, and sensors."
  },
  {
    icon: "💡",
    title: "Energy Efficiency",
    description: "Save money with smart thermostats and automated lighting systems."
  },
  {
    icon: "🤖",
    title: "Voice Control",
    description: "Use voice commands with Alexa, Google Assistant, and Siri."
  }
];

// Categories section data
const categoriesData = [
  { name: "Smart Lighting", icon: "💡", count: "500+ Products", url: "/products?category=lights" },
  { name: "Security Cameras", icon: "📹", count: "200+ Products", url: "/products?category=security-cameras" },
  { name: "Smart Locks", icon: "🔒", count: "100+ Products", url: "/products?category=smart-locks" },
  { name: "Doorbells", icon: "🚪", count: "75+ Products", url: "/products?category=doorbells" },
  { name: "Robot Vacuums", icon: "🤖", count: "45+ Products", url: "/products?category=robot-vacuum" }
];

// Testimonials data
const testimonialsData = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    content: "The smart lighting system has completely transformed our home. It's so convenient and energy-efficient!",
    avatar: "👩‍💼"
  },
  {
    name: "Mike Chen",
    role: "Tech Enthusiast",
    content: "I love how easy it is to control everything from my phone. The security features give me peace of mind.",
    avatar: "👨‍💻"
  },
  {
    name: "Emily Rodriguez",
    role: "Busy Professional",
    content: "The automated routines save me so much time. My home now works around my schedule!",
    avatar: "👩‍⚕️"
  }
];

// Featured products data
const featuredProductsData = [
  {
    id: 1,
    name: "ECOVACS GOAT GX-600",
    description: "Robotic lawn mower with Intelligent Path Planning, AIVI 3D Obstacle Avoidance, and No Boundary Setting. Covers 600㎡ within 2 days with ≤59dB noise level.",
    price: "$1,299.99",
    imageUrl: "https://sharetribe.imgix.net/68877dab-abcf-4234-8908-10bff69f886c/689499b2-ae90-43c3-bac1-eef7a18fbf22?auto=format&fit=clip&h=750&w=750&s=f6a4d2516ff9ef5a79276e051cf17e4d",
    category: "Robot Lawn Mower",
    brand: "Ecovacs",
    rating: 4.8,
    reviewCount: 156,
    listingId: "6894993a-8c9a-4753-9ce1-9bc0210d624c"
  },
  {
    id: 2,
    name: "Aqara Doorbell Camera Hub G410",
    description: "A doorbell camera hub that supports local automations and major smart home ecosystems. Features 2K image clarity, 175° field of view, mmWave radar sensor, and on-device face recognition.",
    price: "$129.99",
    imageUrl: "https://sharetribe.imgix.net/68877dab-abcf-4234-8908-10bff69f886c/68947944-6bf9-4f74-8309-c1bc1ef6cb60?auto=format&fit=clip&h=750&w=750&s=a0af1e411378eebb42b239853eb0327b",
    category: "Doorbells",
    brand: "Aqara",
    rating: 4.7,
    reviewCount: 89,
    listingId: "6894790f-52e7-4d4b-9725-06553a0d3cd3"
  },
  {
    id: 3,
    name: "Ring Battery Doorbell Pro",
    description: "1080p HD video doorbell with motion detection",
    price: "$99.99",
    imageUrl: "https://images.ctfassets.net/2xsswpd01u70/variant-58848044941659-fr-fr/402f904e163e50802bbe3cb62fc7b070/variant-58848044941659-fr-fr.png",
    category: "Security Cameras",
    brand: "Ring",
    rating: 4.6,
    reviewCount: 892,
    listingId: "688f2b46-6407-4dfe-9851-438673ca4817"
  }
];

// Blog section data
const blogData = [
  {
    id: 1,
    title: "How to Choose the Perfect Smart Lock for Your Home",
    excerpt: "Smart locks are one of the most practical and security-enhancing devices you can add to your connected home. But with so many models and features on the market, how do you know which one is right for your door, your lifestyle, and your budget? In this guide, we'll walk you through the key factors to consider when choosing a smart lock that fits your needs — whether you're a smart home beginner or an automation pro.",
    author: "Sarah Johnson",
    date: "August 01, 2024",
    readTime: "5 min read",
    category: "Buying Guide",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "/p/article-locks-how-to-choose"
  },
  {
    id: 2,
    title: "How to Choose the Perfect Smart Thermostat for Your Home",
    excerpt: "A comprehensive guide to selecting the right smart thermostat based on your home size, climate, and energy goals.",
    author: "Mike Chen",
    date: "December 12, 2024",
    readTime: "7 min read",
    category: "Buying Guide",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "/blog/how-to-choose-perfect-smart-thermostat"
  },
  {
    id: 3,
    title: "Smart Security Systems: Protecting Your Home in the Digital Age",
    excerpt: "Learn about the latest security innovations and how to create a comprehensive smart security system for your property.",
    author: "Emily Rodriguez",
    date: "December 10, 2024",
    readTime: "6 min read",
    category: "Security",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "/blog/smart-security-systems-protecting-home-digital-age"
  }
];

// Company/About section data
const companyData = {
  title: "About Domee",
  subtitle: "Your trusted partner in smart home technology",
  description: "We're passionate about bringing the future of home automation to everyone. Our platform connects homeowners with the latest smart devices from world-renowned brands, making it easy to create a connected, efficient, and secure living environment.",
  mission: "Our mission is to simplify smart home adoption by providing expert guidance, comprehensive product selection, and exceptional customer support.",
  stats: [
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Smart Products" },
    { number: "50+", label: "Top Brands" },
    { number: "24/7", label: "Expert Support" }
  ],
  values: [
    {
      icon: "🎯",
      title: "Quality First",
      description: "We carefully curate every product to ensure it meets our high standards for performance and reliability."
    },
    {
      icon: "🤝",
      title: "Expert Support",
      description: "Our team of smart home specialists is here to help you make the right choices for your home."
    },
    {
      icon: "🌱",
      title: "Sustainability",
      description: "We promote energy-efficient solutions that help you save money while protecting the environment."
    },
    {
      icon: "🔒",
      title: "Security & Privacy",
      description: "Your data and privacy are our top priorities. We only partner with brands that share our commitment to security."
    }
  ]
};

// Helper function to map article IDs to route names (same mapping as /articles page)
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
    'smart-lock-glossary': 'SmartLockGlossaryPage',
  };
  return routeMap[articleId] || 'ArticlesPage';
};

// Pick three existing articles to feature on the landing page
const featuredArticles = [
  {
    id: 'video-doorbell',
    title: 'How to Buy Your Video Doorbell: A Comprehensive Guide',
    excerpt:
      'Learn everything you need to know about choosing the perfect video doorbell for your smart home, from features to installation tips.',
    date: '2025-08-04',
    category: 'Security',
    articleType: 'Buying Guides',
  },
  {
    id: 'robot-lawn-mower',
    title: "How to Buy Your Robot Lawn Mower: A Smart Home Enthusiast's Guide",
    excerpt:
      'Discover everything you need to know about choosing the perfect robot lawn mower for your smart home, from features to installation tips.',
    date: '2025-08-04',
    category: 'Smart Home',
    articleType: 'Buying Guides',
  },
  {
    id: 'smart-home-protocols',
    title: 'Wi-Fi, Zigbee, Matter? Understanding Smart Home Protocols Made Easy',
    excerpt:
      'Navigate the complex world of smart home protocols with our comprehensive guide to Wi-Fi, Zigbee, and Matter.',
    date: '2025-08-04',
    category: 'Smart Home',
    articleType: 'Technical Articles',
  },
];

export const LandingPageComponent = props => {
  const { inProgress, error, history } = props;

  const handlePrimaryCTA = () => {
    // Navigate to search page
    history.push('/products');
  };

  const handleSecondaryCTA = () => {
    // Navigate to articles page
    history.push('/articles');
  };

  const handleCategoryClick = (category) => {
    if (category.url) {
      history.push(category.url);
    }
  };

  const handleFeaturedProductClick = (product) => {
    // Navigate to specific listing page using the listingId
    if (product.listingId) {
      history.push(`/product/${product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}/${product.listingId}`);
    } else {
      // Fallback to search if no listingId is available
      history.push(`/products?search=${encodeURIComponent(product.name)}`);
    }
  };

  const handleBlogCTAClick = () => {
    // Navigate to articles page
    history.push('/articles');
  };

  const handleBlogPostClick = (post) => {
    // Navigate to individual blog post using the specific link
    history.push(post.link);
  };

  const handleBrowseAllCategories = () => {
    // Navigate to search page showing all categories
    history.push('/categories');
  };

  const handleAboutLearnMore = () => {
    // Navigate to About page
    history.push('/about');
  };

  if (inProgress) {
    return (
      <Page
        title="Smart Home Devices | Domee"
        description="Discover the latest smart home devices, guides, and expert advice. Shop top brands and learn how to automate and secure your home with smart tech."
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
        title="Smart Home Devices | Domee"
        description="Discover the latest smart home devices, guides, and expert advice. Shop top brands and learn how to automate and secure your home with smart tech."
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
      title="Smart Home Devices | Domee"
      description="Discover and compare smart home devices from top brands. Explore guides on lighting, security, climate, and automation to enhance your home."
      scrollingDisabled={false}
    >
      <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
        <div className={css.root}>
          {/* Hero Section */}
          <section className={css.hero}>
            <div className={css.heroContent}>
              <div className={css.heroText}>
                <h1 className={css.heroTitle}>{heroData.title}</h1>
                <p className={css.heroSubtitle}>{heroData.subtitle}</p>
                <div className={css.heroButtons}>
                  <button className={css.primaryButton} onClick={handlePrimaryCTA}>
                    {heroData.ctaText}
                  </button>
                  <button className={css.secondaryButton} onClick={handleSecondaryCTA}>
                    {heroData.ctaSecondary}
                  </button>
                </div>
              </div>
              <div className={css.heroImageContainer}>
                <img
                  src={smartHomeImage}
                  alt="Smart Home Illustration"
                  className={css.heroImage}
                />
              </div>
            </div>
          </section>

          {/* Featured Products Section */}
          <section className={css.featuredProducts}>
            <div className={css.container}>
              <h2 className={css.sectionTitle}>Featured Products</h2>
              <p className={css.sectionSubtitle}>
                Discover our most popular smart home devices
              </p>
              <div className={css.featuredProductsGrid}>
                {featuredProductsData.map((product, index) => (
                  <div
                    key={index}
                    className={css.featuredProductCard}
                    onClick={() => handleFeaturedProductClick(product)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleFeaturedProductClick(product);
                      }
                    }}
                  >
                    <div className={css.productImageContainer}>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className={css.productImage}
                      />
                    </div>
                    <div className={css.productInfo}>
                      <div className={css.productBrand}>{product.brand}</div>
                      <h3 className={css.productName}>{product.name}</h3>
                      <p className={css.productDescription}>{product.description}</p>
                      <div className={css.productMeta}>
                        <div className={css.productPrice}>{product.price}</div>
                      </div>
                      <button
                        className={css.buyNowButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFeaturedProductClick(product);
                        }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className={css.features}>
            <div className={css.container}>
              <h2 className={css.sectionTitle}>Why Go Smart at Home?</h2>
              <p className={css.sectionSubtitle}>
                Experience the future of home automation with our comprehensive smart home solutions
              </p>
              <div className={css.featuresGrid}>
                {featuresData.map((feature, index) => (
                  <div key={index} className={css.featureCard}>
                    <div className={css.featureIcon}>{feature.icon}</div>
                    <h3 className={css.featureTitle}>{feature.title}</h3>
                    <p className={css.featureDescription}>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className={css.categories}>
            <div className={css.container}>
              <h2 className={css.sectionTitle}>Popular Categories</h2>
              <p className={css.sectionSubtitle}>
                Explore our wide range of smart home devices and solutions
              </p>
              <div className={css.categoriesGrid}>
                {categoriesData.map((category, index) => (
                  <div
                    key={index}
                    className={css.categoryCard}
                    onClick={() => handleCategoryClick(category)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCategoryClick(category);
                      }
                    }}
                  >
                    <div className={css.categoryIcon}>{category.icon}</div>
                    <h3 className={css.categoryName}>{category.name}</h3>
                    <p className={css.categoryCount}>{category.count}</p>
                  </div>
                ))}
              </div>
              <div className={css.categoriesCTA}>
                <button className={css.primaryButton} onClick={handleBrowseAllCategories}>
                  Browse All Categories
                </button>
              </div>
            </div>
          </section>

          {/* Testimonials Section - Commented Out */}
          {/* <section className={css.testimonials}>
            <div className={css.container}>
              <h2 className={css.sectionTitle}>What Our Customers Say</h2>
              <p className={css.sectionSubtitle}>
                Join thousands of satisfied customers who have transformed their homes
              </p>
              <div className={css.testimonialsGrid}>
                {testimonialsData.map((testimonial, index) => (
                  <div key={index} className={css.testimonialCard}>
                    <div className={css.testimonialAvatar}>{testimonial.avatar}</div>
                    <p className={css.testimonialContent}>{testimonial.content}</p>
                    <div className={css.testimonialAuthor}>
                      <h4 className={css.testimonialName}>{testimonial.name}</h4>
                      <p className={css.testimonialRole}>{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section> */}

          {/* Company/About Section */}
          <section className={css.companySection}>
            <div className={css.container}>
              <div className={css.companyContent}>
                <div className={css.companyText}>
                  <h2 className={css.companyTitle}>{companyData.title}</h2>
                  <p className={css.companySubtitle}>{companyData.subtitle}</p>
                  <p className={css.companyDescription}>{companyData.description}</p>
                  <p className={css.companyMission}>{companyData.mission}</p>
                  <div className={css.companyCTA}>
                    <button className={css.primaryButton} onClick={handleAboutLearnMore}>
                      Learn More
                    </button>
                  </div>
                </div>
                <div className={css.companyStats}>
                  {companyData.stats.map((stat, index) => (
                    <div key={index} className={css.statItem}>
                      <div className={css.statNumber}>{stat.number}</div>
                      <div className={css.statLabel}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Blog Section */}
          <section className={css.blogSection}>
            <div className={css.container}>
              <h2 className={css.sectionTitle}>Latest from Our Blog</h2>
              <p className={css.sectionSubtitle}>
                Stay updated with the latest smart home trends, tips, and expert advice
              </p>
              <div className={css.blogGrid}>
                {featuredArticles.map(article => (
                  <NamedLink
                    key={article.id}
                    name={getArticleRouteName(article.id)}
                    className={css.blogCard}
                  >
                    <div className={css.blogContent}>
                      <div className={css.blogMeta}>
                        <span className={css.blogReadTime}>{article.articleType}</span>
                      </div>
                      <h3 className={css.blogTitle}>{article.title}</h3>
                      <p className={css.blogExcerpt}>{article.excerpt}</p>
                    </div>
                  </NamedLink>
                ))}
              </div>
              <div className={css.blogCTA}>
                <NamedLink name="ArticlesPage" className={css.blogCTAButton}>
                  Read All Articles
                </NamedLink>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className={css.ctaSection}>
            <div className={css.container}>
              <div className={css.ctaContent}>
                <h2 className={css.ctaTitle}>Ready to Get Started?</h2>
                <p className={css.ctaSubtitle}>
                  Join thousands of smart home enthusiasts and transform your living space today
                </p>
                <button className={css.ctaButton} onClick={handlePrimaryCTA}>
                  Start Shopping Now
                </button>
              </div>
            </div>
          </section>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

LandingPageComponent.propTypes = {
  inProgress: bool,
  error: propTypes.error,
};

const mapStateToProps = state => {
  return {
    inProgress: false,
    error: null,
  };
};

const LandingPage = compose(connect(mapStateToProps), withRouter)(LandingPageComponent);

export default LandingPage;
