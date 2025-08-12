import React from 'react';

import { Page, LayoutSingleColumn } from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';
import css from './LegalPages.module.css';

const ContactPage = () => {
  return (
    <Page title="Contact" description="How to contact customer support for the marketplace." scrollingDisabled={false}>
      <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
        <div className={css.root}>
          <div className={css.container}>
          <h1 className={css.title}>Contact / Customer Support</h1>
          <p className={css.updated}>Last updated: 2025-08-12</p>

          <p className={css.paragraph}><strong>Email:</strong> support@domee.com</p>
          <p className={css.paragraph}><strong>Business hours:</strong> Mon–Fri, 9am–5pm (local time)</p>
          <p className={css.paragraph}>We aim to respond within 1–2 business days.</p>
          </div>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

export default ContactPage;


