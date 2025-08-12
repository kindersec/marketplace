import React from 'react';

import { Page, LayoutSingleColumn } from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';
import css from './LegalPages.module.css';

const ProhibitedItemsPage = () => {
  return (
    <Page title="Prohibited Items" description="Items that are not allowed to be listed or sold in the marketplace." scrollingDisabled={false}>
      <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
        <div className={css.root}>
          <div className={css.container}>
          <h1 className={css.title}>Prohibited Items</h1>
          <p className={css.updated}>Last updated: 2025-08-12</p>

          <p>The following items are prohibited. This list is not exhaustive and may be updated. Listings that violate these rules may be removed and accounts may face action.</p>

          <ul className={css.list}>
            <li>Firearms, ammunition, explosives, and related parts or accessories that enable prohibited use</li>
            <li>Illegal drugs, controlled substances, or paraphernalia</li>
            <li>Recalled or unsafe products</li>
            <li>Counterfeit or infringing goods</li>
            <li>Stolen property</li>
            <li>Hazardous materials prohibited by law or carrier policies</li>
            <li>Personal data or government-issued IDs</li>
            <li>Child exploitation material or anything encouraging illegal activity</li>
          </ul>

          <h2 className={css.sectionTitle}>Regulated products</h2>
          <p className={css.paragraph}>Some products may be restricted and require compliance notices (e.g., FCC for electronics, CPSIA for children’s products). Sellers are responsible for compliance with all applicable laws and regulations.</p>

          <h2 className={css.sectionTitle}>Questions</h2>
          <p className={css.paragraph}>Not sure if your item is allowed? Contact support@domee.com before listing.</p>
          </div>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

export default ProhibitedItemsPage;


