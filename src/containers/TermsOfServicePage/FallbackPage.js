import React from 'react';
import loadable from '@loadable/component';

const PageBuilder = loadable(() =>
  import(/* webpackChunkName: "PageBuilder" */ '../PageBuilder/PageBuilder')
);

// NOTE: This is a complete Terms of Service used as a fallback.
// If hosted assets are not configured, this content will be rendered.
const fallbackTerms = `
# Terms of Service

Last updated: 2025-08-12

Welcome to Domee (the "Marketplace"). By accessing or using the Marketplace, you agree to be bound by these Terms of Service (the "Terms"). If you do not agree to these Terms, do not use the Marketplace.

## 1. Definitions
- **Marketplace**: The Domee website, application, and related services.
- **User**: Any individual or entity that visits or uses the Marketplace.
- **Buyer**: A User who purchases products or services through the Marketplace.
- **Seller**: A User who offers products or services through the Marketplace.
- **Listing**: Any product or service listed by a Seller on the Marketplace.
- **Order**: A purchase initiated by a Buyer for a Listing.

## 2. Eligibility and Accounts
- You must be at least 18 years old and capable of forming a binding contract to use the Marketplace.
- You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
- You agree to provide accurate, current, and complete information during registration and to keep it updated.

## 3. Marketplace Role
- Domee provides a platform that enables Buyers and Sellers to discover, list, and transact. Domee is not a party to agreements between Buyers and Sellers.
- Domee does not manufacture, supply, or guarantee Listings and is not responsible for the actions or omissions of Users.

## 4. Listings and Content
- Sellers are solely responsible for their Listings, including pricing, availability, descriptions, and compliance with applicable laws.
- Users must not post misleading, fraudulent, or infringing content.
- By providing content on the Marketplace, you grant Domee a non-exclusive, worldwide, royalty-free license to use, display, reproduce, adapt, and distribute such content for operating and improving the Marketplace.

## 5. Orders, Payments, and Fees
- Buyers agree to pay the total amount displayed at checkout, including price, taxes, shipping, and applicable fees.
- Payments may be processed by third-party payment providers (e.g., Stripe). You agree to their terms and privacy policies.
- Domee may charge service fees to Buyers and/or Sellers. Fees will be disclosed before you place an Order or publish a Listing.
- Sellers authorize Domee and its payment partners to collect, hold, and disburse funds in accordance with Order and payout schedules.

## 6. Shipping, Performance, Cancellations, and Refunds
- Sellers are responsible for fulfilling Orders (including shipping or service performance) within the promised timeframe and for providing valid tracking where applicable.
- Buyers must review Listings carefully before purchasing. Certain Orders may be non-cancellable or non-refundable as stated in the Listing.
- Where permitted by law and Marketplace policies, cancellations and refunds may be requested through the Marketplace. Final decisions may depend on Seller policies, product condition, and proof of delivery/performance.
- If a dispute arises, Users agree to cooperate in good faith to resolve the matter. Domee may facilitate communications but is not required to resolve disputes.

## 7. Prohibited Activities
You agree not to:
- Use the Marketplace for any unlawful purpose, or in violation of any applicable law or regulation.
- Post, upload, or transmit content that is defamatory, obscene, infringing, deceptive, or otherwise harmful.
- Interfere with or disrupt the integrity or performance of the Marketplace, including by introducing malware or scraping without permission.
- Attempt to circumvent fees, ratings, reviews, or any security or access controls.
- Engage in transactions outside the Marketplace that were initiated on the Marketplace in order to avoid fees.

## 8. Ratings and Reviews
- Buyers may leave reviews about Listings and Sellers. Reviews must be accurate and may not include offensive or unlawful content.
- Domee may remove or moderate reviews that violate these Terms or our policies.

## 9. Intellectual Property
- The Marketplace, including its content, features, and functionality, is owned by Domee or its licensors and is protected by intellectual property laws.
- You may not copy, modify, distribute, sell, or lease any part of the Marketplace except as expressly permitted by these Terms.

## 10. Third-Party Services
- The Marketplace may contain links to third-party websites or services. Domee is not responsible for third-party content, terms, or privacy policies.

## 11. Privacy
- Your use of the Marketplace is also governed by our Privacy Policy, available at /privacy-policy.

## 12. Disclaimers
- THE MARKETPLACE AND ALL CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. TO THE MAXIMUM EXTENT PERMITTED BY LAW, DOMEE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
- DOMEE DOES NOT WARRANT THAT THE MARKETPLACE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, OR THAT DEFECTS WILL BE CORRECTED.

## 13. Limitation of Liability
- TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL DOMEE OR ITS AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE MARKETPLACE; (B) ANY CONDUCT OR CONTENT OF ANY USER OR THIRD PARTY; (C) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR CONTENT OR INFORMATION.
- IN NO EVENT WILL DOMEE’S TOTAL LIABILITY FOR ALL CLAIMS RELATING TO THE MARKETPLACE EXCEED THE GREATER OF (I) THE AMOUNTS YOU PAID TO DOMEE (IF ANY) DURING THE TWELVE (12) MONTHS PRIOR TO THE EVENT GIVING RISE TO THE LIABILITY OR (II) ONE HUNDRED U.S. DOLLARS (US$100).

## 14. Indemnification
- You agree to indemnify, defend, and hold harmless Domee and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys’ fees) arising out of or in any way connected with your use of the Marketplace, your violation of these Terms, or your violation of any rights of another.

## 15. Termination
- We may suspend or terminate your access to the Marketplace at any time, with or without cause or notice, including for any violation of these Terms.
- Upon termination, provisions that by their nature should survive (e.g., intellectual property, disclaimers, limitations of liability, indemnification) shall survive.

## 16. Changes to the Terms
- We may update these Terms from time to time. If we make material changes, we will provide notice (e.g., by posting the updated Terms and updating the "Last updated" date). Your continued use of the Marketplace constitutes acceptance of the updated Terms.

## 17. Governing Law and Dispute Resolution
- These Terms are governed by the laws of your place of domicile as set out in the Marketplace’s legal disclosures, without regard to conflict-of-law principles. Jurisdiction and venue for any disputes shall lie exclusively in the competent courts of that jurisdiction unless mandatory law provides otherwise.
- You and Domee agree to attempt informal resolution before any formal dispute process.

## 18. Contact
If you have any questions about these Terms, please contact us at support@domee.com.
`;

// Create fallback content (array of sections) in page asset format:
export const fallbackSections = {
  sections: [
    {
      sectionType: 'article',
      sectionId: 'terms',
      appearance: { fieldType: 'customAppearance', backgroundColor: '#ffffff' },
      title: { fieldType: 'heading1', content: 'Terms of Service' },
      blocks: [
        {
          blockType: 'defaultBlock',
          blockId: 'hero-content',
          text: {
            fieldType: 'markdown',
            content: fallbackTerms,
          },
        },
      ],
    },
  ],
  meta: {
    pageTitle: {
      fieldType: 'metaTitle',
      content: 'Terms of service page',
    },
    pageDescription: {
      fieldType: 'metaDescription',
      content: 'Terms of service fetch failed',
    },
  },
};

// This is the fallback page, in case there's no Terms of Service asset defined in Console.
const FallbackPage = props => {
  return <PageBuilder pageAssetsData={fallbackSections} {...props} />;
};

export default FallbackPage;
