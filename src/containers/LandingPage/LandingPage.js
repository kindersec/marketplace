import React from 'react';
import { bool } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { propTypes } from '../../util/types';
import { Page, LayoutSingleColumn } from '../../components';

import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import css from './LandingPage.module.css';
import smartHomeImage from '../../assets/illustration smart home.png';

// Hero section data
const heroData = {
  title: "Transform Your Home with Smart Technology",
  subtitle: "Discover the latest smart home devices from top brands. Control, automate, and enhance your living space with cutting-edge technology.",
  ctaText: "Explore Smart Devices",
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
  { name: "Smart Lighting", icon: "💡", count: "500+ Products" },
  { name: "Security Cameras", icon: "📹", count: "200+ Products" },
  { name: "Smart Thermostats", icon: "🌡️", count: "150+ Products" },
  { name: "Smart Locks", icon: "🔒", count: "100+ Products" },
  { name: "Robot Vacuums", icon: "🤖", count: "80+ Products" },
  { name: "Smart Speakers", icon: "🔊", count: "120+ Products" },
  { name: "Doorbells", icon: "🚪", count: "75+ Products" },
  { name: "Smart Blinds", icon: "🪟", count: "60+ Products" },
  { name: "Robot Lawn Mower", icon: "🌱", count: "45+ Products" },
  { name: "Air Purifier", icon: "🌬️", count: "90+ Products" }
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
    id: 2,
    name: "Ring Video Doorbell",
    description: "1080p HD video doorbell with motion detection",
    price: "$99.99",
    imageUrl: "https://images.ctfassets.net/2xsswpd01u70/variant-58848044941659-fr-fr/402f904e163e50802bbe3cb62fc7b070/variant-58848044941659-fr-fr.png",
    category: "Security Cameras",
    brand: "Ring",
    rating: 4.6,
    reviewCount: 892
  },
  {
    id: 3,
    name: "Ecobee Smart Thermostat",
    description: "Wi-Fi enabled thermostat with room sensors",
    price: "$169.99",
    imageUrl: "https://m.media-amazon.com/images/I/5118X+rWiOL._AC_SX679_.jpg",
    category: "Climate Control",
    brand: "Ecobee",
    rating: 4.7,
    reviewCount: 654
  },
  {
    id: 4,
    name: "iRobot Roomba j7+",
    description: "Self-emptying robot vacuum with obstacle avoidance",
    price: "$799.99",
    imageUrl: "https://cdn.media.amplience.net/i/irobot/j755840_1?fmt=auto&$pdp-img-desktop-retina-prd$&img404=404&v=1&locale=fr-FR,*",
    category: "Robot Vacuums",
    brand: "iRobot",
    rating: 4.5,
    reviewCount: 445
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

export const LandingPageComponent = props => {
  const { inProgress, error, history } = props;

  const handlePrimaryCTA = () => {
    // Navigate to search page
    history.push('/s');
  };

  const handleSecondaryCTA = () => {
    // Navigate to blog page
    history.push('/blog');
  };

  const handleCategoryClick = (category) => {
    console.log('Category clicked:', category);
  };

  const handleFeaturedProductClick = (product) => {
    // Navigate to listing page with product search
    history.push(`/s?search=${encodeURIComponent(product.name)}`);
  };

  const handleBlogCTAClick = () => {
    // Navigate to blog page
    history.push('/blog');
  };

  const handleBlogPostClick = (post) => {
    // Navigate to individual blog post using the specific link
    history.push(post.link);
  };

  if (inProgress) {
    return (
      <Page title="Smart Home Devices" scrollingDisabled={false}>
        <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
          <div className={css.loading}>Loading...</div>
        </LayoutSingleColumn>
      </Page>
    );
  }

  if (error) {
    return (
      <Page title="Smart Home Devices" scrollingDisabled={false}>
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
    <Page title="Smart Home Devices" scrollingDisabled={false}>
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
                        <div className={css.productRating}>
                          <span className={css.stars}>★★★★★</span>
                          <span className={css.ratingText}>{product.rating}</span>
                          <span className={css.reviewCount}>({product.reviewCount})</span>
                        </div>
                        <div className={css.productPrice}>{product.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
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

              <div className={css.companyValues}>
                <h3 className={css.valuesTitle}>Our Values</h3>
                <div className={css.valuesGrid}>
                  {companyData.values.map((value, index) => (
                    <div key={index} className={css.valueCard}>
                      <div className={css.valueIcon}>{value.icon}</div>
                      <h4 className={css.valueTitle}>{value.title}</h4>
                      <p className={css.valueDescription}>{value.description}</p>
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
                {blogData.map((post) => (
                  <article
                    key={post.id}
                    className={css.blogCard}
                    onClick={() => handleBlogPostClick(post)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleBlogPostClick(post);
                      }
                    }}
                  >
                    <div className={css.blogImage}>
                      <div className={css.imagePlaceholder}>
                        <span className={css.imageIcon}>📱</span>
                        <p>Blog Post Image</p>
                      </div>
                    </div>
                    <div className={css.blogContent}>
                      <div className={css.blogMeta}>
                        <span className={css.blogCategory}>{post.category}</span>
                        <span className={css.blogDate}>{post.date}</span>
                        <span className={css.blogReadTime}>{post.readTime}</span>
                      </div>
                      <h3 className={css.blogTitle}>{post.title}</h3>
                      <p className={css.blogExcerpt}>{post.excerpt}</p>
                      <div className={css.blogAuthor}>
                        <span className={css.authorAvatar}>👤</span>
                        <span className={css.authorName}>By {post.author}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className={css.blogCTA}>
                <button className={css.blogCTAButton} onClick={handleBlogCTAClick}>
                  Read All Articles
                </button>
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
