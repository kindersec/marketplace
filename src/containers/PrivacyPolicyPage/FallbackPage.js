import React from 'react';
import loadable from '@loadable/component';

const PageBuilder = loadable(() =>
  import(/* webpackChunkName: "PageBuilder" */ '../PageBuilder/PageBuilder')
);

// CCPA/CPRA-friendly Privacy Policy fallback content
const fallbackPrivacyPolicy = `
# Privacy Policy

Last updated: 2025-08-12

This Privacy Policy explains how Domee ("we", "us", "our") collects, uses, shares, and protects your information when you use our marketplace (the "Service"). By using the Service, you agree to this Policy.

## 1. Information we collect
- Account information (name, email, phone)
- Profile information (display name, bio, profile photo)
- Order and transaction information
- Payment information (processed by our payment provider, e.g., Stripe)
- Communications (messages, reviews)
- Device and usage data (cookies, IP address, browser type)

## 2. How we use information
- Provide, operate, and improve the Service
- Facilitate purchases, payments, and payouts
- Communicate with you (including transactional emails)
- Prevent fraud, secure the Service, and comply with law
- Personalize content and measure performance/analytics

## 3. Cookies and tracking
We and our partners use cookies and similar technologies to enable essential functionality, remember preferences, measure performance, and improve the Service. You can manage cookies through your browser settings. Some features may not function without cookies.

## 4. Sharing of information
- With sellers and buyers as needed to fulfill transactions
- With service providers (e.g., hosting, analytics, payments) who act on our behalf
- For legal reasons (to comply with law, enforce Terms, protect rights, safety, and security)
- In connection with a corporate transaction (merger, acquisition)

We do not sell personal information as defined by the CCPA/CPRA. We may share limited data for "business purposes" with service providers under agreements that restrict their use.

## 5. Your choices and rights
- Access, correct, or delete your account information in settings or by contacting us
- Opt out of marketing communications by using the unsubscribe link
- Manage cookies via your browser

### California privacy rights (CCPA/CPRA)
California residents may request to:
- Know the categories of personal information we collect and use
- Access specific pieces of personal information we hold
- Delete personal information (subject to legal exceptions)
- Correct inaccurate personal information
- Opt out of sharing for cross-context behavioral advertising

To submit a request, contact us at privacy@domee.com. We will verify your request and respond as required by law. You may designate an authorized agent to make a request on your behalf.

## 6. Data retention and security
We keep information as long as necessary for the purposes outlined above and to comply with legal obligations. We use reasonable safeguards to protect information, but no system is 100% secure.

## 7. Children’s privacy
Our Service is not directed to children under 13. If we learn we have collected personal information from a child under 13, we will delete it.

## 8. International transfers
Your information may be processed outside your country. We take steps to ensure adequate protections are in place.

## 9. Changes to this Policy
We may update this Policy. If we make material changes, we will provide notice and update the "Last updated" date.

## 10. Contact us
Questions or requests? Contact privacy@domee.com.
`;

// Create fallback content (array of sections) in page asset format:
export const fallbackSections = {
  sections: [
    {
      sectionType: 'article',
      sectionId: 'privacy',
      appearance: { fieldType: 'customAppearance', backgroundColor: '#ffffff' },
      title: { fieldType: 'heading1', content: 'Privacy Policy' },
      blocks: [
        {
          blockType: 'defaultBlock',
          blockId: 'hero-content',
          text: {
            fieldType: 'markdown',
            content: fallbackPrivacyPolicy,
          },
        },
      ],
    },
  ],
  meta: {
    pageTitle: {
      fieldType: 'metaTitle',
      content: 'Privacy policy page',
    },
    pageDescription: {
      fieldType: 'metaDescription',
      content: 'Privacy policy fetch failed',
    },
  },
};

// This is the fallback page, in case there's no Privacy Policy asset defined in Console.
const FallbackPage = props => {
  return <PageBuilder pageAssetsData={fallbackSections} {...props} />;
};

export default FallbackPage;
