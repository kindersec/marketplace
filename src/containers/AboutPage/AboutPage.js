import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { Page, LayoutSingleColumn, NamedLink, PrimaryButton } from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';
import css from './AboutPage.module.css';

// Company/About section data from landing page
const companyData = {
  title: "About Domee",
  subtitle: "Your trusted partner in smart home technology",
  description: "We're passionate about bringing the future of home automation to everyone. Our platform connects homeowners with the latest smart devices from world-renowned brands, making it easy to create a connected, efficient, and secure living environment.",
  mission: "Our mission is to simplify smart home adoption by providing expert guidance, comprehensive product selection, and exceptional customer support.",
  stats: [
    { number: "100+", label: "Happy Customers" },
    { number: "200+", label: "Smart Products" },
    { number: "25+", label: "Top Brands" },
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
      title: "Personal Touch",
      description: "As a solo founder, I'm personally involved in every aspect of your smart home journey."
    },
    {
      icon: "🌱",
      title: "Growing Together",
      description: "We're building this platform alongside our community, learning and improving every day."
    },
    {
      icon: "🔒",
      title: "Security & Privacy",
      description: "Your data and privacy are our top priorities. We only partner with brands that share our commitment to security."
    }
  ]
};

// Founder story
const founderData = {
  name: "Your Name",
  role: "Founder & CEO",
  bio: "I'm a passionate smart home enthusiast and entrepreneur who believes that everyone deserves access to smart, efficient, and secure home technology. After experiencing the frustration of complex smart home setups and compatibility issues, I decided to create Domee - a platform that makes smart home adoption simple and enjoyable.",
  background: [
    "Smart home technology enthusiast for 5+ years",
    "Experience in product management and user experience",
    "Passionate about making technology accessible to everyone",
    "Committed to building a community-driven platform"
  ],
  vision: "My vision is to create the most user-friendly smart home platform that not only helps people find the right products but also guides them through their entire smart home journey with personalized support and expert advice."
};

// Company timeline - more realistic for early stage
const timelineData = [
  {
    year: "2024",
    title: "Platform Launch",
    description: "Launched Domee with initial product catalog and basic features"
  },
  {
    year: "2024",
    title: "First Customers",
    description: "Welcomed our first 100 customers and started building our community"
  },
  {
    year: "2024",
    title: "Product Expansion",
    description: "Expanded to 200+ products from 25+ trusted smart home brands"
  },
  {
    year: "2024",
    title: "Community Growth",
    description: "Building relationships with customers and gathering feedback for improvements"
  }
];

// Customer testimonials - more realistic for early stage
const testimonialsData = [
  {
    name: "Jennifer Martinez",
    location: "Austin, TX",
    rating: 5,
    text: "Domee helped me find the perfect smart bulbs for my apartment. The founder personally helped me with setup questions!",
    avatar: "👩‍🦰"
  },
  {
    name: "Robert Chen",
    location: "Seattle, WA",
    rating: 5,
    text: "As someone new to smart homes, I appreciate how simple Domee makes everything. Great personal service!",
    avatar: "👨‍🦱"
  },
  {
    name: "Amanda Foster",
    location: "Miami, FL",
    rating: 5,
    text: "The founder really knows smart home tech and helped me choose products that work together perfectly.",
    avatar: "👩‍🦳"
  }
];

// Technology partners - realistic for early stage
const partnersData = [
  { name: "Philips Hue", logo: "💡", category: "Lighting" },
  { name: "Nest", logo: "🏠", category: "Climate" },
  { name: "Ring", logo: "🔔", category: "Security" },
  { name: "Samsung", logo: "📱", category: "Electronics" },
  { name: "Amazon", logo: "📦", category: "Voice Control" },
  { name: "Google", logo: "🔍", category: "AI & Assistant" }
];

const AboutPage = () => {
  const renderStars = (rating) => {
    return "⭐".repeat(rating);
  };

  return (
    <Page
      title="About Domee"
      description="Learn about Domee - your trusted platform for smart home devices and automation solutions."
      scrollingDisabled={false}
    >
      <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
        <div className={css.root}>
          {/* Company/About Section - keeping the first section as requested */}
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

          {/* Founder Story Section */}
          <section className={css.founderSection}>
            <div className={css.container}>
              <h2 className={css.sectionTitle}>Meet the Founder</h2>
              <p className={css.sectionDescription}>
                Domee is built with passion and personal commitment to making smart home technology accessible to everyone.
              </p>
              <div className={css.founderCard}>
                <div className={css.founderAvatar}>{founderData.name.charAt(0)}</div>
                <div className={css.founderContent}>
                  <h3 className={css.founderName}>{founderData.name}</h3>
                  <p className={css.founderRole}>{founderData.role}</p>
                  <p className={css.founderBio}>{founderData.bio}</p>
                  <div className={css.founderBackground}>
                    <h4>Background & Experience</h4>
                    <ul>
                      {founderData.background.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={css.founderVision}>
                    <h4>Vision</h4>
                    <p>{founderData.vision}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Company Timeline */}
          <section className={css.timelineSection}>
            <div className={css.container}>
              <h2 className={css.sectionTitle}>Our Journey So Far</h2>
              <p className={css.sectionDescription}>
                We're just getting started, but every step forward is building toward our vision.
              </p>
              <div className={css.timeline}>
                {timelineData.map((milestone, index) => (
                  <div key={index} className={css.timelineItem}>
                    <div className={css.timelineYear}>{milestone.year}</div>
                    <div className={css.timelineContent}>
                      <h3 className={css.timelineTitle}>{milestone.title}</h3>
                      <p className={css.timelineDescription}>{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Customer Testimonials */}
          <section className={css.testimonialsSection}>
            <div className={css.container}>
              <h2 className={css.sectionTitle}>What Our Early Customers Say</h2>
              <p className={css.sectionDescription}>
                We're grateful for the trust of our first customers and their valuable feedback.
              </p>
              <div className={css.testimonialsGrid}>
                {testimonialsData.map((testimonial, index) => (
                  <div key={index} className={css.testimonialCard}>
                    <div className={css.testimonialAvatar}>{testimonial.avatar}</div>
                    <div className={css.testimonialRating}>{renderStars(testimonial.rating)}</div>
                    <p className={css.testimonialText}>"{testimonial.text}"</p>
                    <div className={css.testimonialAuthor}>
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Technology Partners */}
          <section className={css.partnersSection}>
            <div className={css.container}>
              <h2 className={css.sectionTitle}>Trusted Technology Partners</h2>
              <p className={css.sectionDescription}>
                We're building partnerships with leading smart home brands to bring you the best products.
              </p>
              <div className={css.partnersGrid}>
                {partnersData.map((partner, index) => (
                  <div key={index} className={css.partnerCard}>
                    <div className={css.partnerLogo}>{partner.logo}</div>
                    <h3 className={css.partnerName}>{partner.name}</h3>
                    <span className={css.partnerCategory}>{partner.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact CTA Section */}
          <section className={css.contactCtaSection}>
            <div className={css.container}>
              <div className={css.contactCtaContent}>
                <h2 className={css.contactCtaTitle}>Let's Build Something Amazing Together</h2>
                <p className={css.contactCtaDescription}>
                  As a solo founder, I'm personally committed to helping you create the perfect smart home experience.
                  Whether you have questions, need advice, or want to share feedback, I'd love to hear from you.
                </p>
                <div className={css.contactCtaButtons}>
                  <NamedLink name="ContactPage">
                    <PrimaryButton className={css.contactCtaButtonPrimary}>
                      Get in Touch
                    </PrimaryButton>
                  </NamedLink>
                  <NamedLink name="SearchPage">
                    <PrimaryButton className={css.contactCtaButtonSecondary}>
                      Explore Products
                    </PrimaryButton>
                  </NamedLink>
                </div>
                <div className={css.contactCtaPersonal}>
                  <p>💬 <strong>Personal Response Guaranteed:</strong> I read and respond to every message personally within 24 hours.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className={css.ctaSection}>
            <div className={css.container}>
              <div className={css.ctaContent}>
                <h2 className={css.ctaTitle}>Ready to Start Your Smart Home Journey?</h2>
                <p className={css.ctaDescription}>
                  Join our growing community of smart home enthusiasts and let's build the future together.
                </p>
                <div className={css.ctaButtons}>
                  <NamedLink name="SearchPage">
                    <PrimaryButton className={css.ctaButtonPrimary}>
                      Explore Products
                    </PrimaryButton>
                  </NamedLink>
                  <NamedLink name="ContactPage">
                    <PrimaryButton className={css.ctaButtonSecondary}>
                      Get Expert Advice
                    </PrimaryButton>
                  </NamedLink>
                </div>
              </div>
            </div>
          </section>

          {/* Policies & Legal Links */}
          <section className={css.legalLinksSection}>
            <div className={css.container}>
              <h2 className={css.sectionTitle}>Policies & Legal</h2>
              <div className={css.legalLinksGrid}>
                <a className={css.legalLink} href="/terms-of-service">Terms of Service</a>
                <a className={css.legalLink} href="/privacy-policy">Privacy Policy</a>
                <a className={css.legalLink} href="/return-and-refund">Return & Refund Policy</a>
                <a className={css.legalLink} href="/shipping-and-delivery">Shipping & Delivery Policy</a>
                <a className={css.legalLink} href="/payment-and-billing">Payment & Billing Terms</a>
                <a className={css.legalLink} href="/prohibited-items">Prohibited Items</a>
                <a className={css.legalLink} href="/contact">Contact</a>
                <a className={css.legalLink} href="/faq">FAQ</a>
              </div>
            </div>
          </section>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

export default AboutPage;
