import React from 'react';

import { Page, LayoutSingleColumn } from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';
import css from './LegalPages.module.css';

const FAQPage = () => {
  return (
    <Page title="FAQ" description="Frequently asked questions for buyers and sellers." scrollingDisabled={false}>
      <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
        <div className={css.root}>
          <div className={css.container}>
          <h1 className={css.title}>FAQ</h1>
          <p className={css.updated}>Last updated: 2025-08-12</p>

          <h2 className={css.sectionTitle}>Ordering</h2>
          <p className={css.paragraph}><strong>How do I place an order?</strong> Add the item to your cart from the listing page and follow the checkout steps.</p>
          <p className={css.paragraph}><strong>Can I cancel an order?</strong> If the seller hasn’t shipped or delivered yet, you may request cancellation via the order conversation.</p>

          <h2 className={css.sectionTitle}>Payments</h2>
          <p className={css.paragraph}><strong>What payment methods are accepted?</strong> Supported methods are shown at checkout and handled securely by our payment provider.</p>

          <h2 className={css.sectionTitle}>Shipping & Returns</h2>
          <p className={css.paragraph}><strong>When will my order arrive?</strong> Estimated delivery windows are shown at checkout. See Shipping & Delivery Policy for details.</p>
          <p className={css.paragraph}><strong>How do returns work?</strong> See Return & Refund Policy for eligibility and timelines.</p>

          <h2 className={css.sectionTitle}>Accounts</h2>
          <p className={css.paragraph}><strong>I forgot my password.</strong> Use the password recovery link on the login page.</p>
          </div>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

export default FAQPage;


