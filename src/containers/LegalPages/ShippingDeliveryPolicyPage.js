import React from 'react';

import { Page, LayoutSingleColumn } from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';
import css from './LegalPages.module.css';

const ShippingDeliveryPolicyPage = () => {
  return (
    <Page title="Shipping & Delivery Policy" description="Shipping methods, timelines, and carriers for marketplace orders." scrollingDisabled={false}>
      <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
        <div className={css.root}>
          <div className={css.container}>
          <h1 className={css.title}>Shipping & Delivery Policy</h1>
          <p className={css.updated}>Last updated: 2025-08-12</p>

          <h2 className={css.sectionTitle}>Delivery timelines</h2>
          <ul className={css.list}>
            <li>Estimated delivery windows are shown at checkout and on the listing page.</li>
            <li>Delays may occur due to carrier capacity, weather, customs, or other events outside our control.</li>
          </ul>

          <h2 className={css.sectionTitle}>Shipping costs</h2>
          <ul className={css.list}>
            <li>Shipping costs are shown at checkout and may vary by item, quantity, and destination.</li>
            <li>Some items may qualify for free or flat-rate shipping as specified on the listing.</li>
          </ul>

          <h2 className={css.sectionTitle}>Carriers & tracking</h2>
          <ul className={css.list}>
            <li>Sellers select the carrier and provide a tracking number where available.</li>
            <li>Tracking may take up to 24–48 hours to update after shipment.</li>
          </ul>

          <h2 className={css.sectionTitle}>Lost or stolen packages</h2>
          <p className={css.paragraph}>
            If tracking shows delivered but you cannot locate your package, check with household members and neighbors.
            Contact the carrier and the seller via your order conversation for assistance.
          </p>

          <h2 className={css.sectionTitle}>International shipments</h2>
          <p className={css.paragraph}>Duties, taxes, and customs fees may apply and are the responsibility of the recipient unless noted otherwise.</p>

          <h2 className={css.sectionTitle}>Questions</h2>
          <p className={css.paragraph}>Need help? Contact support@domee.com.</p>
          </div>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

export default ShippingDeliveryPolicyPage;


