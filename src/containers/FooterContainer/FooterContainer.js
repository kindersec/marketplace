import React from 'react';
import { useConfiguration } from '../../context/configurationContext';
import { LinkedLogo, IconSocialMediaFacebook, IconSocialMediaInstagram, IconSocialMediaTwitter } from '../../components';
import css from './FooterContainer.module.css';

const FooterComponent = () => {
  const { topbar } = useConfiguration();

  return (
    <footer className={css.root}>
      <div className={css.footer}>
        <div className={css.content}>
          {/* Logo and Company Info */}
          <div className={css.logoSection}>
            <LinkedLogo
              rootClassName={css.logoLink}
              logoClassName={css.logoWrapper}
              logoImageClassName={css.logoImage}
              linkToExternalSite={topbar?.logoLink}
              layout="desktop"
            />
            <p className={css.companyDescription}>
              Your trusted marketplace for smart home products and technology solutions.
              Find the best deals on smart devices, home automation, and innovative tech.
            </p>

            {/* Social Media Links */}
            <div className={css.socialLinks}>
              <h4 className={css.socialTitle}>Follow Us</h4>
              <div className={css.socialIcons}>
                <a href="https://facebook.com" className={css.socialLink} aria-label="Facebook">
                  <IconSocialMediaFacebook className={css.socialIcon} />
                </a>
                <a href="https://instagram.com" className={css.socialLink} aria-label="Instagram">
                  <IconSocialMediaInstagram className={css.socialIcon} />
                </a>
                <a href="https://twitter.com" className={css.socialLink} aria-label="Twitter">
                  <IconSocialMediaTwitter className={css.socialIcon} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={css.quickLinks}>
            <h3 className={css.sectionTitle}>Quick Links</h3>
            <nav className={css.linkList}>
              <a href="/" className={css.footerLink}>Home</a>
              <a href="/products" className={css.footerLink}>Browse Products</a>
              <a href="/categories" className={css.footerLink}>Categories</a>
              <a href="/brands" className={css.footerLink}>Brands</a>
              <a href="/about" className={css.footerLink}>About Us</a>
              <a href="/contact" className={css.footerLink}>Contact</a>
            </nav>
          </div>

          {/* Customer Support */}
          <div className={css.customerSupport}>
            <h3 className={css.sectionTitle}>Customer Support</h3>
            <nav className={css.linkList}>
              <a href="/faq" className={css.footerLink}>FAQ</a>
              <a href="/shipping-and-delivery" className={css.footerLink}>Shipping & Delivery</a>
              <a href="/return-and-refund" className={css.footerLink}>Returns & Refunds</a>
              <a href="/payment-and-billing" className={css.footerLink}>Payment & Billing</a>
              <a href="/prohibited-items" className={css.footerLink}>Prohibited Items</a>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={css.bottomSection}>
          <div className={css.bottomContent}>
            <p className={css.copyright}>
              © {new Date().getFullYear()} Smart Home Marketplace. All rights reserved.
            </p>
            <div className={css.bottomLinks}>
              <a href="/terms-of-service" className={css.bottomLink}>Terms</a>
              <a href="/privacy-policy" className={css.bottomLink}>Privacy</a>
              <a href="/contact" className={css.bottomLink}>Contact</a>
              <a href="/sitemap" className={css.bottomLink}>Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
