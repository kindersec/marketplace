import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { Page, LayoutSingleColumn } from '../../components';
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

const AboutPage = () => {
  return (
    <Page
      title="About Domee"
      description="Learn about Domee - your trusted platform for smart home devices and automation solutions."
      scrollingDisabled={false}
    >
      <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
        <div className={css.root}>
          {/* Company/About Section - matching landing page layout */}
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

          {/* What We Do Section */}
          <section className={css.whatWeDoSection}>
            <div className={css.container}>
              <div className={css.whatWeDoContent}>
                <h2 className={css.sectionTitle}>
                  <FormattedMessage id="AboutPage.whatWeDoTitle" defaultMessage="What We Do" />
                </h2>
                <p className={css.sectionDescription}>
                  <FormattedMessage
                    id="AboutPage.whatWeDoText"
                    defaultMessage="Domee is your comprehensive marketplace for smart home devices. We curate the best products from leading brands, provide expert guidance through our guides and tutorials, and ensure compatibility across different smart home ecosystems."
                  />
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className={css.whyChooseUsSection}>
            <div className={css.container}>
              <h2 className={css.sectionTitle}>
                <FormattedMessage id="AboutPage.whyChooseUsTitle" defaultMessage="Why Choose Domee" />
              </h2>
              <ul className={css.featureList}>
                <li className={css.featureItem}>
                  <FormattedMessage
                    id="AboutPage.feature1"
                    defaultMessage="Curated Selection: We carefully select only the best smart home devices from trusted brands"
                  />
                </li>
                <li className={css.featureItem}>
                  <FormattedMessage
                    id="AboutPage.feature2"
                    defaultMessage="Expert Guidance: Comprehensive guides and tutorials to help you make informed decisions"
                  />
                </li>
                <li className={css.featureItem}>
                  <FormattedMessage
                    id="AboutPage.feature3"
                    defaultMessage="Compatibility Focus: Detailed compatibility information to ensure your devices work together seamlessly"
                  />
                </li>
                <li className={css.featureItem}>
                  <FormattedMessage
                    id="AboutPage.feature4"
                    defaultMessage="Community Driven: Real user reviews and experiences to guide your smart home journey"
                  />
                </li>
              </ul>
            </div>
          </section>

          {/* Contact Section */}
          <section className={css.contactSection}>
            <div className={css.container}>
              <h2 className={css.sectionTitle}>
                <FormattedMessage id="AboutPage.contactTitle" defaultMessage="Get in Touch" />
              </h2>
              <p className={css.contactDescription}>
                <FormattedMessage
                  id="AboutPage.contactText"
                  defaultMessage="Have questions about smart home devices or need help with your setup? Our team of experts is here to help you create the perfect smart home experience."
                />
              </p>
            </div>
          </section>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

export default AboutPage;
