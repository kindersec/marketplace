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

Welcome to Domee (the "Marketplace"). These Terms of Service (the "Terms") govern your access to and use of the Marketplace as a consumer. If you do not agree with these Terms, please do not use the Marketplace.

## 1. What we mean in these Terms
- **Marketplace**: The Domee website, application, and related services.
- **You** or **consumer**: An individual who visits or uses the Marketplace to browse or buy.
- **Listing**: A product or service shown on the Marketplace.
- **Order**: Your purchase of a Listing through the Marketplace.
- **Merchant**: A third party that offers or provides a Listing (sometimes called a seller or vendor).

## 2. Eligibility, accounts, and sign‑in
- You must be at least 18 years old to create an account and make purchases. The Marketplace is not directed to children under 13. If you are 13–17, you may use the Marketplace only with the consent and supervision of a parent or legal guardian who agrees to these Terms.
- Keep your sign‑in details secure. You are responsible for all activity under your account. Consider enabling multi‑factor authentication where available.
- Provide accurate, current information and keep it updated. Do not share your account or use a false identity.
- We may suspend or terminate your account for policy or legal violations, fraud risk, or security reasons.

## 3. How Domee’s Marketplace works
- Domee operates an online marketplace that helps you discover Listings and place Orders. Unless we clearly say otherwise, Domee is not a party to your contract with a Merchant and is not the seller of record for those Listings.
- Merchants are responsible for their Listings and for providing the products or services. In limited cases where Domee and a Merchant expressly agree in writing, Domee may be responsible for certain Listing content (for example, standardized product detail pages or compliance disclosures) to the extent described in that agreement. This does not make Domee a party to your purchase contract unless we clearly state so.

## 4. Shopping, pricing, taxes, and fees
- The price shown at checkout is the amount you agree to pay. It may include taxes, shipping, and any applicable fees. We will show you these amounts before you place your Order.
- Payment is processed by third‑party providers (e.g., Stripe). By paying, you agree to the provider’s terms and privacy policy.
- Some payment methods may place temporary holds or authorizations. If a charge fails, we may ask you to provide a different method.

## 5. Shipping, delivery, performance, and returns
- Delivery and performance are handled by the Merchant, unless we clearly state that Domee is providing the item or service. Estimated delivery dates are not guaranteed.
- Return, refund, and cancellation options depend on applicable law and the policy shown for the Listing or at checkout. We may facilitate the process, but final outcomes can depend on the condition of the item, proof of delivery or performance, and the Merchant’s stated policy.
- If there is a problem with your Order, contact us. We will work in good faith to help resolve the issue.

## 6. Your conduct and acceptable use
You agree not to:
- Use the Marketplace for anything unlawful or that violates these Terms.
- Post or share content that is deceptive, infringing, defamatory, obscene, or otherwise harmful.
- Interfere with the service (for example, by introducing malware, scraping without permission, or circumventing security or fees).
- Attempt to manipulate ratings or reviews, or conduct transactions outside the Marketplace to avoid fees that apply to your purchase.

## 7. Reviews
- Reviews help other consumers. Keep reviews honest, accurate, and respectful. Do not include unlawful or offensive content. If you received an incentive or have a material connection, disclose it in line with FTC endorsement guidelines.
- We may remove or moderate reviews that violate these Terms or our policies.

## 8. Intellectual property and DMCA
- The Marketplace and its content are owned by Domee or our licensors and are protected by law. You may not copy, modify, distribute, sell, or lease any part of the Marketplace unless we say you can.
- If you believe content on the Marketplace infringes your copyright, send a DMCA notice to legal@domee.com with: (a) your signature; (b) the copyrighted work; (c) the infringing material and its location; (d) your contact information; (e) a statement of good‑faith belief; and (f) a statement under penalty of perjury. We may terminate repeat infringers.

## 9. Privacy, analytics, cookies, and tracking
- Your use of the Marketplace is also governed by our Privacy Policy (see \/privacy-policy).
- We and service providers use cookies, device identifiers, web beacons, SDKs, and similar technologies to provide core features (like sign‑in and security), remember preferences, perform analytics, measure performance, and deliver relevant content. You can manage certain preferences via your browser and any cookie tools we provide; some features may not work without cookies.

## 10. Third‑party services
- We may link to or integrate third‑party sites or services. Domee is not responsible for their content, terms, or privacy practices.

## 11. Disclaimers
- THE MARKETPLACE AND ALL CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE". TO THE MAXIMUM EXTENT PERMITTED BY LAW, DOMEE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON‑INFRINGEMENT.
- WE DO NOT GUARANTEE CONTINUOUS, SECURE, OR ERROR‑FREE OPERATION.

## 12. Limits on liability
- TO THE MAXIMUM EXTENT PERMITTED BY LAW, DOMEE AND ITS AFFILIATES ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES (INCLUDING LOST PROFITS OR DATA) ARISING FROM YOUR USE OF THE MARKETPLACE.
- IN ANY CASE, DOMEE’S TOTAL LIABILITY FOR ALL CLAIMS RELATING TO THE MARKETPLACE WILL NOT EXCEED THE GREATER OF (I) AMOUNTS YOU PAID TO DOMEE (IF ANY) IN THE 12 MONTHS BEFORE THE EVENT GIVING RISE TO LIABILITY OR (II) US$100. THESE LIMITS DO NOT APPLY WHERE PROHIBITED BY LAW.

## 13. Your responsibility to Domee
- You agree to indemnify and hold Domee and its affiliates, officers, directors, employees, and agents harmless from any claims, damages, losses, and expenses (including reasonable attorneys’ fees) arising from your violation of these Terms or your misuse of the Marketplace.

## 14. Arbitration and class action waiver
- YOU AND DOMEE AGREE TO RESOLVE DISPUTES RELATED TO THESE TERMS OR THE MARKETPLACE THROUGH BINDING ARBITRATION (NOT IN COURT), ADMINISTERED BY THE AMERICAN ARBITRATION ASSOCIATION (AAA) UNDER ITS CONSUMER ARBITRATION RULES, BEFORE A SINGLE ARBITRATOR. THE FEDERAL ARBITRATION ACT APPLIES.
- EXCEPT WHERE PROHIBITED BY LAW, YOU AND DOMEE WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION OR CLASS ARBITRATION. CLAIMS MAY BE BROUGHT ONLY ON AN INDIVIDUAL BASIS.
- YOU MAY OPT OUT OF ARBITRATION BY EMAILING LEGAL@DOMEE.COM WITHIN 30 DAYS OF CREATING YOUR ACCOUNT.

## 15. Termination
- We may suspend or terminate your access at any time for any reason, including if you violate these Terms. Sections that by their nature should survive (e.g., intellectual property, disclaimers, limits on liability, indemnity, arbitration) will survive termination.

## 16. Governing law and venue
- These Terms are governed by Delaware law, except that the Federal Arbitration Act governs the arbitration section. Subject to the arbitration section, the exclusive venue for any non‑arbitrable action is the state or federal courts in New Castle County, Delaware, and you consent to their jurisdiction.

## 17. Export and sanctions compliance
- You represent you are not located in, under the control of, or a national or resident of any country or territory subject to U.S. embargoes or sanctions, and you are not on any U.S. government list of prohibited or restricted parties.

## 18. Electronic communications and notices
- You consent to receive notices and communications electronically, and agree they satisfy any legal requirement that communications be in writing.

## 19. Changes to these Terms
- We may update these Terms from time to time. If we make material changes, we will provide notice (for example, by posting the updated Terms and updating the "Last updated" date). Your continued use of the Marketplace means you accept the updated Terms.

## 20. Contact us
Questions? Contact support@domee.com.
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
