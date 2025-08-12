import React from 'react';

import { Page, LayoutSingleColumn } from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';
import css from './LegalPages.module.css';

const PaymentBillingTermsPage = () => {
  return (
    <Page title="Payment & Billing Terms" description="Accepted payment methods and billing practices for the marketplace." scrollingDisabled={false}>
      <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
        <div className={css.root}>
          <div className={css.container}>
          <h1 className={css.title}>Payment & Billing Terms</h1>
          <p className={css.updated}>Last updated: 2025-08-12</p>

          <h2 className={css.sectionTitle}>Accepted payment methods</h2>
          <p className={css.paragraph}>Payments are processed by our payment provider (e.g., Stripe). Supported methods may include credit/debit cards and other region-specific methods shown at checkout.</p>

          <h2 className={css.sectionTitle}>Authorizations and charges</h2>
          <ul className={css.list}>
            <li>For bookings, an authorization may be placed until the provider accepts the request.</li>
            <li>For purchases, charges occur at checkout or as specified during the flow.</li>
          </ul>

          <h2 className={css.sectionTitle}>Recurring or subscription charges</h2>
          <p className={css.paragraph}>Unless explicitly stated on the listing, orders are one-time purchases. Any recurring charges will be clearly disclosed.</p>

          <h2 className={css.sectionTitle}>Refunds</h2>
          <p className={css.paragraph}>Refunds are governed by our Return & Refund Policy and may take 5–10 business days to appear on your statement after approval.</p>

          <h2 className={css.sectionTitle}>Disputes</h2>
          <p className={css.paragraph}>If you have an issue with a charge, contact the seller via your order conversation or reach out to support@domee.com.</p>

          <h2 className={css.sectionTitle}>Taxes and fees</h2>
          <p className={css.paragraph}>Applicable taxes and fees are shown at checkout. You are responsible for any required taxes or duties unless specified otherwise.</p>
          </div>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

export default PaymentBillingTermsPage;


