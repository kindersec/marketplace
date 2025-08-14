import React, { useState, useMemo } from 'react';

import { Page, LayoutSingleColumn } from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';
import css from './LegalPages.module.css';

const FAQPage = () => {
  const [openSections, setOpenSections] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const faqData = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click the "Sign Up" button in the top right corner. You can sign up with your email address or use Google/Facebook for faster registration. You\'ll need to verify your email before you can start buying or selling. You must be at least 18 years old to create an account and make purchases. Users 13-17 may use the marketplace only with parental consent and supervision.'
        },
        {
          question: 'Is it free to use the marketplace?',
          answer: 'Yes! Creating an account and browsing listings is completely free. There are no hidden fees for buyers. Sellers may have small transaction fees when they make sales (typically 5-10% of successful sales). There are no listing fees or monthly charges.'
        },
        {
          question: 'How do I search for products?',
          answer: 'Use the search bar at the top of any page. You can search by product name, brand, or category. Use the filters on the left to narrow down results by price, location, condition, and more. All listings are reviewed before publication to ensure compliance with our marketplace policies.'
        }
      ]
    },
    {
      id: 'buying',
      title: 'Buying & Shopping',
      icon: '🛒',
      questions: [
        {
          question: 'How do I place an order?',
          answer: 'Browse listings, add items to your cart, and proceed to checkout. You\'ll need to provide shipping information and payment details. The price shown at checkout includes taxes, shipping, and any applicable fees. Once confirmed, your order will be processed and you\'ll receive confirmation.'
        },
        {
          question: 'What payment methods are accepted?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All payments are processed securely through our trusted payment partners (e.g., Stripe). Your payment information is never stored on our servers. Some payment methods may place temporary holds or authorizations.'
        },
        {
          question: 'Can I cancel an order?',
          answer: 'Orders can typically be cancelled within 24 hours of placement, but this depends on the seller\'s policy and whether the item has been shipped. Check the order details page for cancellation options or contact customer support. For bookings, authorizations may be placed until the provider accepts the request.'
        },
        {
          question: 'How do I track my order?',
          answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also view order status and tracking information in your account dashboard under "My Orders." Tracking may take up to 24-48 hours to update after shipment. Sellers select the carrier and provide tracking where available.'
        }
      ]
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      icon: '📦',
      questions: [
        {
          question: 'How long does shipping take?',
          answer: 'Shipping times vary by seller and location. Most orders ship within 1-3 business days and arrive within 3-7 business days. Express shipping options are available for faster delivery at checkout. Estimated delivery windows are shown at checkout and on the listing page, though delays may occur due to carrier capacity, weather, customs, or other events outside our control.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes! We ship to most countries worldwide. International shipping rates and delivery times vary by location. You\'ll see exact costs and estimated delivery dates at checkout. Duties, taxes, and customs fees may apply and are the responsibility of the recipient unless noted otherwise.'
        },
        {
          question: 'What if my package is damaged?',
          answer: 'If your package arrives damaged, take photos immediately and contact customer support within 48 hours. We\'ll work with the seller to resolve the issue, which may include a replacement or refund. If the item is defective or incorrect, the seller may cover return shipping costs.'
        },
        {
          question: 'Can I change my shipping address?',
          answer: 'You can update your shipping address in your account settings. For existing orders, address changes must be made before the order ships. Contact customer support if you need to change an address for a shipped order. Lost or stolen packages should be reported to both the carrier and seller via your order conversation.'
        }
      ]
    },
    {
      id: 'returns',
      title: 'Returns & Refunds',
      icon: '↩️',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'Most items can be returned within 14 days of delivery in their original condition, with all original packaging and accessories. Some items may be non-returnable (e.g., perishable goods, hygiene-sensitive items, custom orders, or digital products). Check the product listing for specific return information. Items must be in the same condition you received them.'
        },
        {
          question: 'How do I start a return?',
          answer: 'Go to "My Orders" in your account, select the order, and contact the seller via the conversation. Provide your order ID, reason for return, and any supporting evidence (e.g., photos). Follow packaging and shipping instructions if a return is authorized. Unless otherwise stated, customers are responsible for return shipping costs.'
        },
        {
          question: 'How long do refunds take?',
          answer: 'Once we receive your return, refunds are typically processed within 5-10 business days to your original payment method. The time for the refund to appear in your account depends on your bank or payment provider. Refunds are governed by our Return & Refund Policy and may take 5-10 business days to appear on your statement after approval.'
        },
        {
          question: 'What if I received the wrong item?',
          answer: 'Contact customer support immediately if you receive the wrong item. We\'ll arrange for the correct item to be sent and provide a prepaid shipping label to return the incorrect item. If the item is defective or incorrect, the seller may cover return shipping costs. Provide photos and details for faster resolution.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account & Security',
      icon: '🔐',
      questions: [
        {
          question: 'I forgot my password. How do I reset it?',
          answer: 'Click "Forgot Password" on the login page and enter your email address. You\'ll receive a password reset link via email. Click the link to create a new password. Keep your sign-in details secure and consider enabling multi-factor authentication where available. You are responsible for all activity under your account.'
        },
        {
          question: 'How do I update my account information?',
          answer: 'Go to "Account Settings" in your profile menu. You can update your personal information, shipping addresses, payment methods, and notification preferences. Provide accurate, current information and keep it updated. Do not share your account or use a false identity. We may suspend or terminate your account for policy or legal violations.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Absolutely! We use industry-standard encryption and security measures to protect your data. We never share your personal information with third parties except as required to fulfill orders or comply with legal obligations. Your information may be processed outside your country, but we take steps to ensure adequate protections are in place. We use cookies and similar technologies for essential functionality and security.'
        },
        {
          question: 'How do I delete my account?',
          answer: 'Contact customer support to request account deletion. Note that this will permanently remove all your data, including order history and saved information. Outstanding orders must be completed before deletion. We keep information as long as necessary for the purposes outlined in our Privacy Policy and to comply with legal obligations.'
        }
      ]
    },
    {
      id: 'support',
      title: 'Customer Support',
      icon: '🆘',
      questions: [
        {
          question: 'How can I contact customer support?',
          answer: 'We offer multiple support channels: live chat (available 24/7), email support at support@domee.com, and phone support during business hours. You can also check our Help Center for answers to common questions. For legal matters, contact legal@domee.com. For privacy requests, contact privacy@domee.com.'
        },
        {
          question: 'What are your support hours?',
          answer: 'Live chat is available 24/7. Email support responds within 4 hours during business hours (Monday-Friday, 9 AM - 6 PM EST). Phone support is available Monday-Friday, 9 AM - 6 PM EST. For urgent issues with active orders, use the live chat for immediate assistance.'
        },
        {
          question: 'Can I speak to a real person?',
          answer: 'Yes! Our live chat connects you directly with a customer service representative. For complex issues, we can also arrange phone calls or video meetings if needed. We\'re committed to providing personalized support to resolve your concerns quickly and effectively.'
        }
      ]
    },
    {
      id: 'legal',
      title: 'Legal & Compliance',
      icon: '⚖️',
      questions: [
        {
          question: 'What items are prohibited from being sold?',
          answer: 'We prohibit firearms, ammunition, explosives, illegal drugs, recalled products, counterfeit goods, stolen property, hazardous materials, personal data, government IDs, and child exploitation material. Some products may be restricted and require compliance notices (e.g., FCC for electronics, CPSIA for children\'s products). Contact support@domee.com if you\'re unsure about an item.'
        },
        {
          question: 'How do I report a copyright violation?',
          answer: 'If you believe content infringes your copyright, send a DMCA notice to legal@domee.com with: your signature, the copyrighted work, the infringing material and location, your contact information, a statement of good-faith belief, and a statement under penalty of perjury. We may terminate repeat infringers.'
        },
        {
          question: 'What are my privacy rights?',
          answer: 'You can access, correct, or delete your account information in settings or by contacting us. California residents have additional CCPA/CPRA rights including knowing what data we collect, accessing specific data, deleting data, and opting out of data sharing. Contact privacy@domee.com for privacy requests. We do not sell personal information as defined by CCPA/CPRA.'
        },
        {
          question: 'How are disputes resolved?',
          answer: 'Disputes related to our Terms or marketplace are resolved through binding arbitration administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules. You and Domee waive any right to participate in class actions. You may opt out of arbitration by emailing legal@domee.com within 30 days of creating your account.'
        }
      ]
    }
  ];

  // Filter FAQ data based on search query and active category
  const filteredFaqData = useMemo(() => {
    let filtered = faqData;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(section => section.id === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.map(section => ({
        ...section,
        questions: section.questions.filter(q =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(section => section.questions.length > 0);
    }

    return filtered;
  }, [searchQuery, activeCategory]);

  // Get all categories for navigation
  const categories = [
    { id: 'all', title: 'All Questions', icon: '📋' },
    ...faqData.map(section => ({
      id: section.id,
      title: section.title,
      icon: section.icon
    }))
  ];

  return (
    <Page title="FAQ - Frequently Asked Questions" description="Find answers to common questions about buying, selling, shipping, returns, and more on our smart home marketplace." scrollingDisabled={false}>
      <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
        <div className={css.root}>
          <div className={css.container}>
            <div className={css.header}>
              <h1 className={css.title}>Frequently Asked Questions</h1>
              <p className={css.subtitle}>Find answers to the most common questions about our marketplace</p>
              <p className={css.updated}>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            {/* Search and Category Navigation */}
            <div className={css.navigationSection}>
              <div className={css.searchContainer}>
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={css.searchInput}
                />
                <span className={css.searchIcon}>🔍</span>
              </div>

              <div className={css.categoryNavigation}>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`${css.categoryButton} ${activeCategory === category.id ? css.categoryButtonActive : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <span className={css.categoryIcon}>{category.icon}</span>
                    <span className={css.categoryTitle}>{category.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Results */}
            <div className={css.faqContainer}>
              {filteredFaqData.length === 0 ? (
                <div className={css.noResults}>
                  <div className={css.noResultsIcon}>🤔</div>
                  <h3 className={css.noResultsTitle}>No questions found</h3>
                  <p className={css.noResultsText}>
                    Try adjusting your search terms or browse all categories to find what you're looking for.
                  </p>
                  <button
                    className={css.resetSearchButton}
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                  >
                    Reset Search
                  </button>
                </div>
              ) : (
                filteredFaqData.map((section) => (
                  <div key={section.id} className={css.faqSection}>
                    <button
                      className={`${css.sectionHeader} ${openSections[section.id] ? css.sectionHeaderOpen : ''}`}
                      onClick={() => toggleSection(section.id)}
                      aria-expanded={openSections[section.id]}
                    >
                      <span className={css.sectionIcon}>{section.icon}</span>
                      <h2 className={css.sectionTitle}>{section.title}</h2>
                      <span className={css.expandIcon}>
                        {openSections[section.id] ? '−' : '+'}
                      </span>
                    </button>

                    {openSections[section.id] && (
                      <div className={css.sectionContent}>
                        {section.questions.map((item, index) => (
                          <div key={index} className={css.questionItem}>
                            <h3 className={css.question}>{item.question}</h3>
                            <p className={css.answer}>{item.answer}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className={css.contactSection}>
              <h2 className={css.contactTitle}>Still have questions?</h2>
              <p className={css.contactText}>
                Can't find what you're looking for? Our customer support team is here to help!
              </p>
              <div className={css.contactButtons}>
                <a href="/contact" className={css.contactButton}>
                  Contact Support
                </a>
                <a href="mailto:support@domee.com" className={css.contactButtonSecondary}>
                  Email Support
                </a>
              </div>
              <div className={css.legalContacts}>
                <p className={css.legalContactsText}>
                  <strong>Legal & Privacy:</strong> For legal matters, contact <a href="mailto:legal@domee.com" className={css.legalLink}>legal@domee.com</a>.
                  For privacy requests, contact <a href="mailto:privacy@domee.com" className={css.legalLink}>privacy@domee.com</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

export default FAQPage;


