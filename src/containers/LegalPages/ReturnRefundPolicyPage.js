import React from 'react';

import { Page, LayoutSingleColumn } from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';
import css from './LegalPages.module.css';

const ReturnRefundPolicyPage = () => {
  return (
    <Page title="Return & Refund Policy" description="Return and refund terms for orders placed on the marketplace." scrollingDisabled={false}>
      <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
        <div className={css.root}>
          <div className={css.container}>
            <h1 className={css.title}>Return & Refund Policy</h1>
            <p className={css.updated}>Last updated: 2025-08-12</p>

          <h2 className={css.sectionTitle}>Overview</h2>
          <p className={css.paragraph}>
            We want you to be satisfied with your purchase. This policy explains eligibility, timelines, and
            how to request a return or refund for orders placed on the marketplace.
          </p>

          <h2 className={css.sectionTitle}>Eligibility</h2>
          <ul className={css.list}>
            <li>Items must be in the same condition you received them, with all original packaging and accessories.</li>
            <li>Some items may be non-returnable (e.g., perishable goods, hygiene-sensitive items, or custom orders). Check the listing details.</li>
            <li>Digital or downloadable products are typically non-refundable once delivered.</li>
          </ul>

          <h2 className={css.sectionTitle}>Timelines</h2>
          <ul className={css.list}>
            <li>Return window: unless otherwise stated on the listing, you may request a return within 14 days of delivery.</li>
            <li>Refund processing: approved refunds are typically processed within 5–10 business days to your original payment method.</li>
          </ul>

          <h2 className={css.sectionTitle}>Return shipping costs</h2>
          <ul className={css.list}>
            <li>Unless otherwise stated, customers are responsible for return shipping costs.</li>
            <li>If the item is defective or incorrect, the seller may cover return shipping. Provide photos and details.</li>
          </ul>

          <h2 className={css.sectionTitle}>How to request a return</h2>
          <ol className={css.list}>
            <li>Go to your order details page and contact the seller via the conversation.</li>
            <li>Provide your order ID, reason for the return, and any supporting evidence (e.g., photos).</li>
            <li>Follow packaging and shipping instructions if a return is authorized.</li>
          </ol>

          <h2 className={css.sectionTitle}>Damaged or defective items</h2>
          <p className={css.paragraph}>
            If your item arrives damaged or defective, contact us promptly with photos and details. We will work with
            the seller to remedy the issue per applicable law.
          </p>

          <h2 className={css.sectionTitle}>Exchanges</h2>
          <p className={css.paragraph}>Exchanges may be available at the seller’s discretion. Otherwise, return the item and place a new order.</p>

          <h2 className={css.sectionTitle}>Questions</h2>
          <p className={css.paragraph}>Need help? Contact support@domee.com.</p>
          </div>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

export default ReturnRefundPolicyPage;


