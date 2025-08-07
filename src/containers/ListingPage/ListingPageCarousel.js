import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';

// Contexts
import { useConfiguration } from '../../context/configurationContext';
import { useRouteConfiguration } from '../../context/routeConfigurationContext';
// Utils
import { FormattedMessage, useIntl } from '../../util/reactIntl';
import { LISTING_STATE_PENDING_APPROVAL, LISTING_STATE_CLOSED, propTypes } from '../../util/types';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  LISTING_PAGE_DRAFT_VARIANT,
  LISTING_PAGE_PENDING_APPROVAL_VARIANT,
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_EDIT,
  createSlug,
  NO_ACCESS_PAGE_USER_PENDING_APPROVAL,
  NO_ACCESS_PAGE_VIEW_LISTINGS,
} from '../../util/urlHelpers';
import {
  isErrorNoViewingPermission,
  isErrorUserPendingApproval,
  isForbiddenError,
} from '../../util/errors.js';
import { hasPermissionToViewData, isUserAuthorized } from '../../util/userHelpers.js';
import { requireListingImage } from '../../util/configHelpers';
import {
  ensureListing,
  ensureOwnListing,
  ensureUser,
  userDisplayNameAsString,
} from '../../util/data';
import { richText } from '../../util/richText';
import {
  isBookingProcess,
  isPurchaseProcess,
  resolveLatestProcessName,
} from '../../transactions/transaction';

// Global ducks (for Redux actions and thunks)
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/ui.duck';
import { initializeCardPaymentData } from '../../ducks/stripe.duck.js';

// Shared components
import {
  H4,
  H3,
  Page,
  NamedLink,
  NamedRedirect,
  OrderPanel,
  LayoutSingleColumn,
} from '../../components';

// Related components and modules
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

import {
  sendInquiry,
  setInitialValues,
  fetchTimeSlots,
  fetchTransactionLineItems,
} from './ListingPage.duck';

import {
  LoadingPage,
  ErrorPage,
  priceData,
  listingImages,
  handleContactUser,
  handleSubmitInquiry,
  handleSubmit,
  priceForSchemaMaybe,
} from './ListingPage.shared';
import ActionBarMaybe from './ActionBarMaybe';
import SectionTextMaybe from './SectionTextMaybe';
import SectionDescriptionAndDetails from './SectionDescriptionAndDetails';
import SectionReviews from './SectionReviews';
import SectionAuthorMaybe from './SectionAuthorMaybe';
import SectionMapMaybe from './SectionMapMaybe';
import SectionGallery from './SectionGallery';
import CompatibilityBadges from './CompatibilityBadges';

import css from './ListingPage.module.css';

// Tabs Component
const Tabs = ({ activeTab, onTabChange, publicData }) => {
  const tabs = [
    { id: 'features', label: 'Features' },
    { id: 'specs', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'more', label: 'More' }
  ];

  const tabContent = {
    features: (
      <div className={css.tabContent}>
        {/* <h3>Product Features</h3> */}

        <div className={css.featuresGrid}>
          {(() => {
            // Extract features from public data
            const features = [];
            for (let i = 1; i <= 5; i++) {
              const title = publicData[`feature_${i}_title`];
              const text = publicData[`feature_${i}_text`];
              const icon = publicData[`feature_${i}_icon`];

              if (title && text) {
                features.push({
                  title,
                  text,
                  icon: icon || '🔧', // Default icon if none provided
                  index: i
                });
              }
            }

            // If no features found, show a message
            if (features.length === 0) {
              return (
                <div className={css.noFeaturesMessage}>
                  <p>No product features available for this item.</p>
                </div>
              );
            }

            // Render features
            return features.map((feature, index) => (
              <div key={feature.index} className={css.featureCard}>
                {index % 2 === 0 ? (
                  <>
                    <div className={css.featureImage}>
                      <div className={css.featureIcon}>{feature.icon}</div>
                    </div>
                    <div className={css.featureContent}>
                      <h4>{feature.title}</h4>
                      <p>{feature.text}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={css.featureContent}>
                      <h4>{feature.title}</h4>
                      <p>{feature.text}</p>
                    </div>
                    <div className={css.featureImage}>
                      <div className={css.featureIcon}>{feature.icon}</div>
                    </div>
                  </>
                )}
              </div>
            ));
          })()}
        </div>

        {publicData.extended_description && (
          <div className={css.extendedDescriptionSection}>
            <h4>Detailed Description</h4>
            <div className={css.extendedDescription}>
              {publicData.extended_description}
            </div>
          </div>
        )}
      </div>
    ),
    specs: (
      <div className={css.tabContent}>
        <h3>Technical Specifications</h3>
        <div className={css.specsTableContainer}>
          {(() => {
            // Extract tech_specs from publicData
            const techSpecs = publicData.tech_specs;

            // Validate that tech_specs exists and is valid JSON
            let parsedSpecs = null;
            if (techSpecs) {
              try {
                // If it's already an object, use it directly
                if (typeof techSpecs === 'object' && techSpecs !== null) {
                  parsedSpecs = techSpecs;
                } else if (typeof techSpecs === 'string') {
                  // If it's a string, try to parse it as JSON
                  parsedSpecs = JSON.parse(techSpecs);
                }
              } catch (error) {
                console.warn('Invalid tech_specs JSON:', error);
                parsedSpecs = null;
              }
            }

            // If we have valid specs, display them
            if (parsedSpecs && typeof parsedSpecs === 'object' && Object.keys(parsedSpecs).length > 0) {
                             return (
                 <table className={css.specsTable}>
                   <tbody>
                     {Object.entries(parsedSpecs).map(([key, value]) => (
                       <tr key={key}>
                         <td>{key}</td>
                         <td>{value}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               );
            } else {
              // Fallback to placeholder content if no valid tech_specs
              return (
                <div className={css.noSpecsMessage}>
                  <p>No technical specifications available for this product.</p>
                </div>
              );
            }
          })()}
        </div>
      </div>
    ),
    reviews: (
      <div className={css.tabContent}>
        <h3>Customer Reviews</h3>
        <div className={css.reviewsContainer}>
          <div className={css.reviewItem}>
            <div className={css.reviewHeader}>
              <div className={css.reviewStars}>★★★★★</div>
              <div className={css.reviewAuthor}>Sarah M.</div>
              <div className={css.reviewDate}>2 weeks ago</div>
            </div>
            <p>"Excellent product! The setup was incredibly easy and it works flawlessly with my smart home system. Highly recommend!"</p>
          </div>
          <div className={css.reviewItem}>
            <div className={css.reviewHeader}>
              <div className={css.reviewStars}>★★★★★</div>
              <div className={css.reviewAuthor}>Mike R.</div>
              <div className={css.reviewDate}>1 month ago</div>
            </div>
            <p>"Great value for money. The features are exactly what I needed and the build quality is solid. Very satisfied with my purchase."</p>
          </div>
          <div className={css.reviewItem}>
            <div className={css.reviewHeader}>
              <div className={css.reviewStars}>★★★★☆</div>
              <div className={css.reviewAuthor}>Jennifer L.</div>
              <div className={css.reviewDate}>3 weeks ago</div>
            </div>
            <p>"Good product overall. Easy to install and works well. The only minor issue is the app could be a bit more intuitive, but it's manageable."</p>
          </div>
        </div>
      </div>
    ),
    more: (
      <div className={css.tabContent}>
        <h3>More Resources</h3>

        {/* Related YouTube Videos Section */}
        {publicData.youtube_links && (() => {
          // Handle different data types for youtube_links
          let youtubeLinks = publicData.youtube_links;

          // If it's a string, try to parse it as JSON
          if (typeof youtubeLinks === 'string') {
            try {
              youtubeLinks = JSON.parse(youtubeLinks);
            } catch (error) {
              console.warn('Failed to parse youtube_links as JSON:', error);
              youtubeLinks = null;
            }
          }

          // Ensure it's an array and has content
          if (!Array.isArray(youtubeLinks) || youtubeLinks.length === 0) {
            return null;
          }

          return (
            <div className={css.moreSection}>
              <h4>Related YouTube Videos</h4>
              <div className={css.videoGrid}>
                {(() => {
                  // Helper function to extract video ID from YouTube URL
                  const extractVideoId = (url) => {
                    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
                    const match = url.match(regex);
                    return match ? match[1] : null;
                  };

                  // Helper function to generate thumbnail URL
                  const getThumbnailUrl = (videoId) => {
                    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                  };

                  // Helper function to generate embed URL
                  const getEmbedUrl = (videoId) => {
                    return `https://www.youtube.com/embed/${videoId}`;
                  };

                  return youtubeLinks.map((url, index) => {
                    const videoId = extractVideoId(url);

                    if (!videoId) {
                      return null; // Skip invalid URLs
                    }

                    return (
                      <div key={index} className={`${css.videoEmbed} ${css.videoCard}`}>
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={`Product Video ${index + 1}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className={css.videoIframe}
                        />
                      </div>
                    );
                  }).filter(Boolean); // Remove null entries
                })()}
              </div>
            </div>
          );
        })()}

        {/* Related Blog Posts Section */}
        <div className={css.moreSection}>
          <h4>Related Blog Posts</h4>
          <div className={css.blogGrid}>
            <div className={css.blogCard}>
              <div className={css.blogImage}></div>
              <div className={css.blogInfo}>
                <h5>How to Choose the Perfect Smart Lock</h5>
                <p>Comprehensive guide to selecting the right smart lock for your home security needs</p>
                <span className={css.blogDate}>March 15, 2024</span>
              </div>
            </div>
            <div className={css.blogCard}>
              <div className={css.blogImage}></div>
              <div className={css.blogInfo}>
                <h5>Smart Home Security Best Practices</h5>
                <p>Essential security tips and best practices for protecting your smart home</p>
                <span className={css.blogDate}>March 8, 2024</span>
              </div>
            </div>
            <div className={css.blogCard}>
              <div className={css.blogImage}></div>
              <div className={css.blogInfo}>
                <h5>Integration with Home Assistant</h5>
                <p>Step-by-step guide to integrating your device with Home Assistant</p>
                <span className={css.blogDate}>March 1, 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Reddit Posts Section */}
        {publicData.reddit_links && (() => {
          // Handle different data types for reddit_links
          let redditLinks = publicData.reddit_links;

          // If it's a string, try to parse it as JSON
          if (typeof redditLinks === 'string') {
            try {
              redditLinks = JSON.parse(redditLinks);
            } catch (error) {
              console.warn('Failed to parse reddit_links as JSON:', error);
              redditLinks = null;
            }
          }

          // Ensure it's an array and has content
          if (!Array.isArray(redditLinks) || redditLinks.length === 0) {
            return null;
          }

          // Limit to 3 posts
          const limitedRedditLinks = redditLinks.slice(0, 3);

          return (
            <div className={css.moreSection}>
              <h4>Related Reddit Discussions</h4>
              <div className={css.redditCarousel}>
                <div className={css.redditCarouselContainer}>
                  {(() => {
                    // Helper function to extract Reddit post info from URL
                    const extractRedditInfo = (url) => {
                      const regex = /reddit\.com\/r\/([^\/]+)\/comments\/([^\/]+)\/([^\/\?]+)/;
                      const match = url.match(regex);
                      if (match) {
                        return {
                          subreddit: match[1],
                          postId: match[2],
                          postTitle: decodeURIComponent(match[3].replace(/_/g, ' ')),
                          originalUrl: url
                        };
                      }
                      return null;
                    };

                    return limitedRedditLinks.map((url, index) => {
                      const redditInfo = extractRedditInfo(url);

                      if (!redditInfo) {
                        return null; // Skip invalid URLs
                      }

                      return (
                        <div key={index} className={css.redditCard}>
                          <div className={css.redditVoteSection}>
                            <div className={css.redditUpvote}>
                              <span className={css.redditVoteIcon}>▲</span>
                            </div>
                            <span className={css.redditScore}>+{Math.floor(Math.random() * 200) + 50}</span>
                            <div className={css.redditDownvote}>
                              <span className={css.redditVoteIcon}>▼</span>
                            </div>
                          </div>
                          <div className={css.redditContent}>
                            <div className={css.redditHeader}>
                              <span className={css.redditSubreddit}>r/{redditInfo.subreddit}</span>
                            </div>
                            <h5 className={css.redditTitle}>{redditInfo.postTitle}</h5>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={css.redditLink}
                            >
                              View on Reddit
                            </a>
                          </div>
                        </div>
                      );
                    }).filter(Boolean); // Remove null entries
                  })()}
                </div>
                {limitedRedditLinks.length > 1 && (
                  <div className={css.redditCarouselControls}>
                    <button className={css.redditCarouselButton} onClick={() => {}}>
                      ‹
                    </button>
                    <div className={css.redditCarouselDots}>
                      {limitedRedditLinks.map((_, index) => (
                        <span key={index} className={css.redditCarouselDot}></span>
                      ))}
                    </div>
                    <button className={css.redditCarouselButton} onClick={() => {}}>
                      ›
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </div>
    )
  };

  return (
    <div className={css.tabsContainer}>
      <div className={css.tabsHeader}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={classNames(css.tabButton, {
              [css.activeTab]: activeTab === tab.id
            })}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={css.tabBody}>
        {tabContent[activeTab]}
      </div>
    </div>
  );
};

const MIN_LENGTH_FOR_LONG_WORDS_IN_TITLE = 16;

const { UUID } = sdkTypes;

export const ListingPageComponent = props => {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(
    props.inquiryModalOpenForListingId === props.params.id
  );
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    isAuthenticated,
    currentUser,
    getListing,
    getOwnListing,
    intl,
    onManageDisableScrolling,
    params: rawParams,
    location,
    scrollingDisabled,
    showListingError,
    reviews = [],
    fetchReviewsError,
    sendInquiryInProgress,
    sendInquiryError,
    history,
    callSetInitialValues,
    onSendInquiry,
    onInitializeCardPaymentData,
    config,
    routeConfiguration,
    showOwnListingsOnly,
    ...restOfProps
  } = props;

  const listingConfig = config.listing;
  const listingId = new UUID(rawParams.id);
  const isVariant = rawParams.variant != null;
  const isPendingApprovalVariant = rawParams.variant === LISTING_PAGE_PENDING_APPROVAL_VARIANT;
  const isDraftVariant = rawParams.variant === LISTING_PAGE_DRAFT_VARIANT;
  const currentListing =
    isPendingApprovalVariant || isDraftVariant || showOwnListingsOnly
      ? ensureOwnListing(getOwnListing(listingId))
      : ensureListing(getListing(listingId));

  const listingSlug = rawParams.slug || createSlug(currentListing.attributes.title || '');
  const params = { slug: listingSlug, ...rawParams };

  const listingPathParamType = isDraftVariant
    ? LISTING_PAGE_PARAM_TYPE_DRAFT
    : LISTING_PAGE_PARAM_TYPE_EDIT;
  const listingTab = isDraftVariant ? 'photos' : 'details';

  const isApproved =
    currentListing.id && currentListing.attributes.state !== LISTING_STATE_PENDING_APPROVAL;

  const pendingIsApproved = isPendingApprovalVariant && isApproved;

  // If a /pending-approval URL is shared, the UI requires
  // authentication and attempts to fetch the listing from own
  // listings. This will fail with 403 Forbidden if the author is
  // another user. We use this information to try to fetch the
  // public listing.
  const pendingOtherUsersListing =
    (isPendingApprovalVariant || isDraftVariant) &&
    showListingError &&
    showListingError.status === 403;
  const shouldShowPublicListingPage = pendingIsApproved || pendingOtherUsersListing;

  if (shouldShowPublicListingPage) {
    return <NamedRedirect name="ListingPage" params={params} search={location.search} />;
  }

  const topbar = <TopbarContainer />;

  if (showListingError && showListingError.status === 404) {
    // 404 listing not found
    return <NotFoundPage staticContext={props.staticContext} />;
  } else if (showListingError) {
    // Other error in fetching listing
    return <ErrorPage topbar={topbar} scrollingDisabled={scrollingDisabled} intl={intl} />;
  } else if (!currentListing.id) {
    // Still loading the listing
    return <LoadingPage topbar={topbar} scrollingDisabled={scrollingDisabled} intl={intl} />;
  }

  const {
    description = '',
    geolocation = null,
    price = null,
    title = '',
    publicData = {},
    metadata = {},
  } = currentListing.attributes;

  const shortDescription = publicData.shortdescription;
  const brand = publicData.brand;
  const worksWithHomeAssistant = publicData.works_with_home_assistant;
  const connectivity = publicData.connectivity;
  const compatibility = publicData.compatibility;
  const homeAssistantIntegrationLink = publicData.home_assistant_integration_link;

  // Extract product features from public data
  const productFeatures = [
    publicData.short_feature_1,
    publicData.short_feature_2,
    publicData.short_feature_3,
    publicData.short_feature_4,
    publicData.short_feature_5
  ].filter(feature => feature && feature.trim() !== '');

  // Get brand display name from config
  const brandFieldConfig = config.listing.listingFields?.find(field => field.key === 'brand');
  const brandEnumOptions = brandFieldConfig?.enumOptions || [];
  const getBrandDisplayName = (brandValue) => {
    if (!brandValue) return null;
    const brandOption = brandEnumOptions.find(option => option.option === brandValue);
    return brandOption ? brandOption.label : brandValue;
  };
  const brandDisplayName = getBrandDisplayName(brand);

  // Helper function to get pictogram for connectivity/compatibility items
  const getPictogram = (item) => {
    const pictograms = {
      'wifi': '📶',
      'bluetooth': '📡',
      'zigbee': '🔗',
      'z-wave': '🌊',
      'thread': '🧵',
      'matter': '⚡',
      'homekit': '🏠',
      'alexa': '🔊',
      'google': '🎤',
      'siri': '💬',
      'smartthings': '📱',
      'homeassistant': '🏠',
      'ifttt': '🔗',
      'webhook': '🌐',
      'mqtt': '📨',
      'http': '🌍',
      'coap': '📦',
      'lora': '📡',
      'cellular': '📞',
      'ethernet': '🔌'
    };
    return pictograms[item.toLowerCase()] || '🔧';
  };

  // Helper function to get display value from config
  const getDisplayValue = (fieldKey, value) => {
    const fieldConfig = config.listing.listingFields?.find(field => field.key === fieldKey);
    if (!fieldConfig || !fieldConfig.enumOptions) return value;

    if (Array.isArray(value)) {
      return value.map(v => {
        const option = fieldConfig.enumOptions.find(opt => opt.option === v);
        return option ? option.label : v;
      }).join(', ');
    } else {
      const option = fieldConfig.enumOptions.find(opt => opt.option === value);
      return option ? option.label : value;
    }
  };

  const richTitle = (
    <span>
      {richText(title, {
        longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_TITLE,
        longWordClass: css.longWord,
      })}
    </span>
  );

  const authorAvailable = currentListing && currentListing.author;
  const userAndListingAuthorAvailable = !!(currentUser && authorAvailable);
  const isOwnListing =
    userAndListingAuthorAvailable && currentListing.author.id.uuid === currentUser.id.uuid;

  const { listingType, transactionProcessAlias, unitType } = publicData;
  if (!(listingType && transactionProcessAlias && unitType)) {
    // Listing should always contain listingType, transactionProcessAlias and unitType)
    return (
      <ErrorPage topbar={topbar} scrollingDisabled={scrollingDisabled} intl={intl} invalidListing />
    );
  }
  const validListingTypes = listingConfig.listingTypes;
  const foundListingTypeConfig = validListingTypes.find(conf => conf.listingType === listingType);
  const showListingImage = requireListingImage(foundListingTypeConfig);

  const processName = resolveLatestProcessName(transactionProcessAlias.split('/')[0]);
  const isBooking = isBookingProcess(processName);
  const isPurchase = isPurchaseProcess(processName);
  const processType = isBooking ? 'booking' : isPurchase ? 'purchase' : 'inquiry';

  const currentAuthor = authorAvailable ? currentListing.author : null;
  const ensuredAuthor = ensureUser(currentAuthor);
  const noPayoutDetailsSetWithOwnListing =
    isOwnListing && (processType !== 'inquiry' && !currentUser?.attributes?.stripeConnected);
  const payoutDetailsWarning = noPayoutDetailsSetWithOwnListing ? (
    <span className={css.payoutDetailsWarning}>
      <FormattedMessage id="ListingPage.payoutDetailsWarning" values={{ processType }} />
      <NamedLink name="StripePayoutPage">
        <FormattedMessage id="ListingPage.payoutDetailsWarningLink" />
      </NamedLink>
    </span>
  ) : null;

  // When user is banned or deleted the listing is also deleted.
  // Because listing can be never showed with banned or deleted user we don't have to provide
  // banned or deleted display names for the function
  const authorDisplayName = userDisplayNameAsString(ensuredAuthor, '');

  const { formattedPrice } = priceData(price, config.currency, intl);

  const commonParams = { params, history, routes: routeConfiguration };
  const onContactUser = handleContactUser({
    ...commonParams,
    currentUser,
    callSetInitialValues,
    location,
    setInitialValues,
    setInquiryModalOpen,
  });
  // Note: this is for inquiry state in booking and purchase processes. Inquiry process is handled through handleSubmit.
  const onSubmitInquiry = handleSubmitInquiry({
    ...commonParams,
    getListing,
    onSendInquiry,
    setInquiryModalOpen,
  });
  const onSubmit = handleSubmit({
    ...commonParams,
    currentUser,
    callSetInitialValues,
    getListing,
    onInitializeCardPaymentData,
  });

  const handleOrderSubmit = values => {
    const isCurrentlyClosed = currentListing.attributes.state === LISTING_STATE_CLOSED;
    if (isOwnListing || isCurrentlyClosed) {
      window.scrollTo(0, 0);
    } else {
      onSubmit(values);
    }
  };

  const facebookImages = listingImages(currentListing, 'facebook');
  const twitterImages = listingImages(currentListing, 'twitter');
  const schemaImages = listingImages(
    currentListing,
    `${config.layout.listingImage.variantPrefix}-2x`
  ).map(img => img.url);
  const marketplaceName = config.marketplaceName;
  const schemaTitle = intl.formatMessage(
    { id: 'ListingPage.schemaTitle' },
    { title, price: formattedPrice, marketplaceName }
  );
  // You could add reviews, sku, etc. into page schema
  // Read more about product schema
  // https://developers.google.com/search/docs/advanced/structured-data/product
  const productURL = `${config.marketplaceRootURL}${location.pathname}${location.search}${location.hash}`;
  const currentStock = currentListing.currentStock?.attributes?.quantity || 0;
  const schemaAvailability = !currentListing.currentStock
    ? null
    : currentStock > 0
    ? 'https://schema.org/InStock'
    : 'https://schema.org/OutOfStock';

  const availabilityMaybe = schemaAvailability ? { availability: schemaAvailability } : {};

  return (
    <Page
      title={schemaTitle}
      scrollingDisabled={scrollingDisabled}
      author={authorDisplayName}
      description={description}
      facebookImages={facebookImages}
      twitterImages={twitterImages}
      schema={{
        '@context': 'http://schema.org',
        '@type': 'Product',
        description: description,
        name: schemaTitle,
        image: schemaImages,
        offers: {
          '@type': 'Offer',
          url: productURL,
          ...priceForSchemaMaybe(price),
          ...availabilityMaybe,
        },
      }}
    >
      <LayoutSingleColumn className={css.pageRoot} topbar={topbar} footer={<FooterContainer />}>
        <div className={css.contentWrapperForProductLayout}>
          <div className={css.imageColumnForProductLayout}>
            {mounted && currentListing.id && noPayoutDetailsSetWithOwnListing ? (
              <ActionBarMaybe
                className={css.actionBarForProductLayout}
                isOwnListing={isOwnListing}
                listing={currentListing}
                showNoPayoutDetailsSet={noPayoutDetailsSetWithOwnListing}
                currentUser={currentUser}
              />
            ) : null}
            {mounted && currentListing.id ? (
              <ActionBarMaybe
                className={css.actionBarForProductLayout}
                isOwnListing={isOwnListing}
                listing={currentListing}
                currentUser={currentUser}
                editParams={{
                  id: listingId.uuid,
                  slug: listingSlug,
                  type: listingPathParamType,
                  tab: listingTab,
                }}
              />
            ) : null}
            {showListingImage && (
              <SectionGallery
                listing={currentListing}
                variantPrefix={config.layout.listingImage.variantPrefix}
              />
            )}

            {/* Compatibility Badges Section */}
            <CompatibilityBadges
              compatibility={compatibility}
              config={config}
            />
          </div>

          <div className={css.middleColumnForProductLayout}>
            <div className={css.productInfo}>
              <div className={css.productHeader}>
                {brandDisplayName && (
                  <h2 className={css.productBrand}>{brandDisplayName}</h2>
                )}
                <h3 className={css.productTitle}>{richTitle}</h3>
              </div>
              {shortDescription && (
                <p className={css.productShortDescription}>{shortDescription}</p>
              )}
              {productFeatures.length > 0 && (
                <ul className={css.productFeatures}>
                  {productFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              )}
              {worksWithHomeAssistant === "true" && (
                <div className={css.homeAssistantBadge}>
                  <img
                    src="https://works-with.home-assistant.io/img/wwha-blue.svg"
                    alt="Works with Home Assistant"
                    className={css.homeAssistantImage}
                  />
                </div>
              )}

              {/* Connectivity and Compatibility Section - following key features */}
              {connectivity && getDisplayValue('connectivity', connectivity) && (
                <div className={css.connectivityCompatibilityContainer}>
                  <div className={css.connectivityColumn}>
                    <span className={css.sectionLabel}>Connectivity:</span>
                    <span className={css.sectionValue}>
                      {getDisplayValue('connectivity', connectivity)}
                    </span>
                  </div>
                </div>
              )}

              {/* Home Assistant Integration Link */}
              {/* Integration Links Row */}
              {(homeAssistantIntegrationLink || publicData.zigbee_2_mqtt_link) && (
                <div className={css.integrationLinksRow}>
                  {homeAssistantIntegrationLink && (
                    <a
                      href={homeAssistantIntegrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={css.homeAssistantIntegrationLink}
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/ab/New_Home_Assistant_logo.svg"
                        alt="Home Assistant"
                        className={css.integrationLogo}
                      />
                      Home Assistant
                    </a>
                  )}
                  {publicData.zigbee_2_mqtt_link && (
                    <a
                      href={publicData.zigbee_2_mqtt_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={css.homeAssistantIntegrationLink}
                    >
                      <img
                        src="https://www.zigbee2mqtt.io/logo.png"
                        alt="Zigbee2mqtt"
                        className={css.integrationLogo}
                      />
                      Zigbee2mqtt
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className={css.orderColumnForProductLayout}>
            <div
              className={showListingImage ? css.mobileHeading : css.noListingImageHeadingProduct}
            >
              {showListingImage ? (
                <H4 as="h1" className={css.orderPanelTitle}>
                  <FormattedMessage id="ListingPage.orderTitle" values={{ title: richTitle }} />
                </H4>
              ) : (
                <H3 as="h1" className={css.orderPanelTitle}>
                  <FormattedMessage id="ListingPage.orderTitle" values={{ title: richTitle }} />
                </H3>
              )}
            </div>
            <OrderPanel
              className={classNames(css.productOrderPanel, {
                [css.imagesEnabled]: showListingImage,
              })}
              listing={currentListing}
              isOwnListing={isOwnListing}
              onSubmit={handleOrderSubmit}
              authorLink={
                <NamedLink
                  className={css.authorNameLink}
                  name={isVariant ? 'ListingPageVariant' : 'ListingPage'}
                  params={params}
                  to={{ hash: '#author' }}
                >
                  {authorDisplayName}
                </NamedLink>
              }
              title={<FormattedMessage id="ListingPage.orderTitle" values={{ title: richTitle }} />}
              titleDesktop={
                <H4 as="h1" className={css.orderPanelTitle}>
                  <FormattedMessage id="ListingPage.orderTitle" values={{ title: richTitle }} />
                </H4>
              }
              payoutDetailsWarning={payoutDetailsWarning}
              author={ensuredAuthor}
              onManageDisableScrolling={onManageDisableScrolling}
              onContactUser={onContactUser}
              {...restOfProps}
              validListingTypes={config.listing.listingTypes}
              marketplaceCurrency={config.currency}
              dayCountAvailableForBooking={config.stripe.dayCountAvailableForBooking}
              marketplaceName={config.marketplaceName}
              showListingImage={showListingImage}
            />
          </div>
        </div>

        {/* Tabs Section */}
        <div className={css.tabsSection}>
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} publicData={publicData} />
        </div>

        {/* Full-width description and details section */}
        {/* <div className={css.fullWidthDescriptionContainer}>
          <SectionDescriptionAndDetails
            text={description}
            showAsIngress
            enableMarkdown
            publicData={publicData}
            metadata={metadata}
            listingFieldConfigs={listingConfig.listingFields}
            categoryConfiguration={config.categoryConfiguration}
            intl={intl}
          />
        </div> */}

        <div className={css.contentWrapperForProductLayout}>
          <div className={css.mainColumnForProductLayout}>
            <SectionMapMaybe
              geolocation={geolocation}
              publicData={publicData}
              listingId={currentListing.id}
              mapsConfig={config.maps}
            />
            <SectionReviews reviews={reviews} fetchReviewsError={fetchReviewsError} />
            <SectionAuthorMaybe
              title={title}
              listing={currentListing}
              authorDisplayName={authorDisplayName}
              onContactUser={onContactUser}
              isInquiryModalOpen={isAuthenticated && inquiryModalOpen}
              onCloseInquiryModal={() => setInquiryModalOpen(false)}
              sendInquiryError={sendInquiryError}
              sendInquiryInProgress={sendInquiryInProgress}
              onSubmitInquiry={onSubmitInquiry}
              currentUser={currentUser}
              onManageDisableScrolling={onManageDisableScrolling}
            />
          </div>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

/**
 * The ListingPage component with carousel layout.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.params - The path params object
 * @param {string} props.params.id - The listing id
 * @param {string} props.params.slug - The listing slug
 * @param {LISTING_PAGE_DRAFT_VARIANT | LISTING_PAGE_PENDING_APPROVAL_VARIANT} props.params.variant - The listing variant
 * @param {Function} props.onManageDisableScrolling - The on manage disable scrolling function
 * @param {boolean} props.isAuthenticated - Whether the user is authenticated
 * @param {Function} props.getListing - The get listing function
 * @param {Function} props.getOwnListing - The get own listing function
 * @param {Object} props.currentUser - The current user
 * @param {boolean} props.scrollingDisabled - Whether scrolling is disabled
 * @param {string} props.inquiryModalOpenForListingId - The inquiry modal open for the specific listing id
 * @param {propTypes.error} props.showListingError - The show listing error
 * @param {Function} props.callSetInitialValues - The call setInitialValues function, which is given to this function as a parameter
 * @param {Array<propTypes.review>} props.reviews - The reviews
 * @param {propTypes.error} props.fetchReviewsError - The fetch reviews error
 * @param {Object<string, Object>} props.monthlyTimeSlots - The monthly time slots. E.g. { '2019-11': { timeSlots: [], fetchTimeSlotsInProgress: false, fetchTimeSlotsError: null } }
 * @param {Object<string, Object>} props.timeSlotsForDate - The time slots for date. E.g. { '2019-11-01': { timeSlots: [], fetchedAt: 1572566400000, fetchTimeSlotsError: null, fetchTimeSlotsInProgress: false } }
 * @param {boolean} props.sendInquiryInProgress - Whether the send inquiry is in progress
 * @param {propTypes.error} props.sendInquiryError - The send inquiry error
 * @param {Function} props.onSendInquiry - The on send inquiry function
 * @param {Function} props.onInitializeCardPaymentData - The on initialize card payment data function
 * @param {Function} props.onFetchTimeSlots - The on fetch time slots function
 * @param {Function} props.onFetchTransactionLineItems - The on fetch transaction line items function
 * @param {Array<propTypes.transactionLineItem>} props.lineItems - The line items
 * @param {boolean} props.fetchLineItemsInProgress - Whether the fetch line items is in progress
 * @param {propTypes.error} props.fetchLineItemsError - The fetch line items error
 * @returns {JSX.Element} listing page component
 */
const EnhancedListingPage = props => {
  const config = useConfiguration();
  const routeConfiguration = useRouteConfiguration();
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();

  const showListingError = props.showListingError;
  const isVariant = props.params?.variant != null;
  const currentUser = props.currentUser;
  if (isForbiddenError(showListingError) && !isVariant && !currentUser) {
    // This can happen if private marketplace mode is active
    return (
      <NamedRedirect
        name="SignupPage"
        state={{ from: `${location.pathname}${location.search}${location.hash}` }}
      />
    );
  }

  const isPrivateMarketplace = config.accessControl.marketplace.private === true;
  const isUnauthorizedUser = currentUser && !isUserAuthorized(currentUser);
  const hasNoViewingRights = currentUser && !hasPermissionToViewData(currentUser);
  const hasUserPendingApprovalError = isErrorUserPendingApproval(showListingError);

  if ((isPrivateMarketplace && isUnauthorizedUser) || hasUserPendingApprovalError) {
    return (
      <NamedRedirect
        name="NoAccessPage"
        params={{ missingAccessRight: NO_ACCESS_PAGE_USER_PENDING_APPROVAL }}
      />
    );
  } else if (
    (hasNoViewingRights && isForbiddenError(showListingError)) ||
    isErrorNoViewingPermission(showListingError)
  ) {
    // If the user has no viewing rights, fetching anything but their own listings
    // will return a 403 error. If that happens, redirect to NoAccessPage.
    return (
      <NamedRedirect
        name="NoAccessPage"
        params={{ missingAccessRight: NO_ACCESS_PAGE_VIEW_LISTINGS }}
      />
    );
  }

  return (
    <ListingPageComponent
      config={config}
      routeConfiguration={routeConfiguration}
      intl={intl}
      history={history}
      location={location}
      showOwnListingsOnly={hasNoViewingRights}
      {...props}
    />
  );
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.auth;
  const {
    showListingError,
    reviews,
    fetchReviewsError,
    monthlyTimeSlots,
    timeSlotsForDate,
    sendInquiryInProgress,
    sendInquiryError,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
    inquiryModalOpenForListingId,
  } = state.ListingPage;
  const { currentUser } = state.user;

  const getListing = id => {
    const ref = { id, type: 'listing' };
    const listings = getMarketplaceEntities(state, [ref]);
    return listings.length === 1 ? listings[0] : null;
  };

  const getOwnListing = id => {
    const ref = { id, type: 'ownListing' };
    const listings = getMarketplaceEntities(state, [ref]);
    return listings.length === 1 ? listings[0] : null;
  };

  return {
    isAuthenticated,
    currentUser,
    getListing,
    getOwnListing,
    scrollingDisabled: isScrollingDisabled(state),
    inquiryModalOpenForListingId,
    showListingError,
    reviews,
    fetchReviewsError,
    monthlyTimeSlots, // for OrderPanel
    timeSlotsForDate, // for OrderPanel
    lineItems, // for OrderPanel
    fetchLineItemsInProgress, // for OrderPanel
    fetchLineItemsError, // for OrderPanel
    sendInquiryInProgress,
    sendInquiryError,
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  callSetInitialValues: (setInitialValues, values, saveToSessionStorage) =>
    dispatch(setInitialValues(values, saveToSessionStorage)),
  onFetchTransactionLineItems: params => dispatch(fetchTransactionLineItems(params)), // for OrderPanel
  onSendInquiry: (listing, message) => dispatch(sendInquiry(listing, message)),
  onInitializeCardPaymentData: () => dispatch(initializeCardPaymentData()),
  onFetchTimeSlots: (listingId, start, end, timeZone, options) =>
    dispatch(fetchTimeSlots(listingId, start, end, timeZone, options)), // for OrderPanel
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const ListingPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EnhancedListingPage);

export default ListingPage;
