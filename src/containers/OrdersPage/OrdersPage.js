import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from '../../util/reactIntl';
import { ensureCurrentUser } from '../../util/data';
import { isScrollingDisabled } from '../../ducks/ui.duck';
import { useConfiguration } from '../../context/configurationContext';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { loadData } from './OrdersPage.duck';
import { useHistory } from 'react-router-dom';

import {
  H2,
  H3,
  Page,
  UserNav,
  NamedLink,
  LayoutSingleColumn,
  IconInquiry,
  IconCheckmark,
  IconClose,
  IconSpinner,
  IconSuccess,
  IconAlert,
  IconDate
} from '../../components';

import TopbarContainer from '../../containers/TopbarContainer/TopbarContainer';
import FooterContainer from '../../containers/FooterContainer/FooterContainer';

import css from './OrdersPage.module.css';

const OrderStatusBadge = ({ status, lastTransition }) => {
  const getStatusConfig = (status, lastTransition) => {
    // Map Sharetribe transaction states to user-friendly statuses
    switch (lastTransition) {
      case 'transition/request-payment':
        return {
          label: 'Payment Pending',
          className: css.statusPending,
          icon: IconDate
        };
      case 'transition/confirm-payment':
        return {
          label: 'Payment Confirmed',
          className: css.statusConfirmed,
          icon: IconCheckmark
        };
      case 'transition/mark-delivered':
      case 'transition/operator-mark-delivered':
        return {
          label: 'Shipped/Delivered',
          className: css.statusShipped,
          icon: IconSuccess
        };
      case 'transition/mark-received-from-purchased':
        return {
          label: 'Completed',
          className: css.statusCompleted,
          icon: IconCheckmark
        };
      case 'transition/cancel':
      case 'transition/auto-cancel':
        return {
          label: 'Cancelled',
          className: css.statusCancelled,
          icon: IconClose
        };
      case 'transition/expire-payment':
        return {
          label: 'Payment Expired',
          className: css.statusExpired,
          icon: IconAlert
        };
      default:
        return {
          label: 'Processing',
          className: css.statusDefault,
          icon: IconInquiry
        };
    }
  };

  const config = getStatusConfig(status, lastTransition);
  const Icon = config.icon;

  return (
    <span className={`${css.statusBadge} ${config.className}`}>
      <Icon className={css.statusIcon} />
      {config.label}
    </span>
  );
};

const OrderCard = ({ order, onViewDetails }) => {
  const {
    id,
    listing,
    lastTransition,
    lastTransitionedAt,
    payinTotal,
    lineItems,
    attributes
  } = order;

  const listingTitle = listing?.attributes?.title || 'Unknown Product';
  const listingImage = listing?.images?.[0]?.variants?.['square-small']?.url;
  const orderDate = new Date(lastTransitionedAt).toLocaleDateString();
  const total = payinTotal ? `$${parseFloat(payinTotal.amount / 100).toFixed(2)}` : 'N/A';

  const handleCardClick = () => {
    onViewDetails(id);
  };

  return (
    <div className={css.orderCard} onClick={handleCardClick}>
      <div className={css.orderImage}>
        {listingImage ? (
          <img src={listingImage} alt={listingTitle} />
        ) : (
          <div className={css.orderImagePlaceholder}>
            <IconInquiry className={css.placeholderIcon} />
          </div>
        )}
      </div>
      <div className={css.orderInfo}>
        <H3 as="h3" className={css.orderTitle}>
          {listingTitle}
        </H3>
        <div className={css.orderMeta}>
          <span className={css.orderDate}>{orderDate}</span>
          <span className={css.orderTotal}>{total}</span>
        </div>
        <OrderStatusBadge status={attributes?.processName} lastTransition={lastTransition} />
      </div>
      <div className={css.orderActions}>
        <button
          className={css.viewDetailsButton}
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click when button is clicked
            onViewDetails(id);
          }}
        >
          <FormattedMessage id="OrdersPage.viewDetails" />
        </button>
      </div>
    </div>
  );
};

export const OrdersPageComponent = props => {
  const intl = useIntl();
  const config = useConfiguration();
  const history = useHistory();
  const { currentUser, scrollingDisabled, loadOrdersData } = props;

  const user = ensureCurrentUser(currentUser);

  // Load orders when component mounts
  useEffect(() => {
    loadOrdersData();
  }, [loadOrdersData]);

  // Get orders from Redux state
  const { fetchInProgress, fetchOrdersError, transactionRefs, pagination, transactions } = props;
  const orders = transactions || [];

  // Debug logging
  console.log('🛒 OrdersPage Component:', {
    fetchInProgress,
    fetchOrdersError,
    transactionRefsCount: transactionRefs?.length || 0,
    ordersCount: orders.length,
    orders: orders.slice(0, 2) // Show first 2 orders for debugging
  });



  const handleViewDetails = (orderId) => {
    // Navigate to order page using transaction ID
    const transactionId = orderId.uuid || orderId;
    console.log('🛒 Navigating to order:', transactionId);
    history.push(`/order/${transactionId}`);
  };

  const title = intl.formatMessage({ id: 'OrdersPage.title' });

  return (
    <Page className={css.root} title={title} robots="noindex, nofollow" scrollingDisabled={scrollingDisabled}>
      <LayoutSingleColumn
        topbar={
          <TopbarContainer />
        }
        footer={<FooterContainer />}
      >
        <div className={css.content}>
          {/* User Navigation */}
          <UserNav
            currentPage="OrdersPage"
            rootClassName={css.userNav}
          />

          <div className={css.header}>
            <H2 as="h1" className={css.pageTitle}>
              <FormattedMessage id="OrdersPage.heading" />
            </H2>
            <p className={css.pageDescription}>
              <FormattedMessage id="OrdersPage.description" />
            </p>
          </div>

          <div className={css.ordersSection}>
            {fetchInProgress ? (
              <div className={css.loadingContainer}>
                <IconSpinner className={css.loadingSpinner} />
                <p className={css.loadingText}>
                  <FormattedMessage id="OrdersPage.loading" />
                </p>
              </div>
            ) : fetchOrdersError ? (
              <div className={css.errorContainer}>
                <IconAlert className={css.errorIcon} />
                <H3 as="h3" className={css.errorTitle}>
                  <FormattedMessage id="OrdersPage.errorTitle" />
                </H3>
                <p className={css.errorDescription}>
                  {fetchOrdersError.message}
                </p>
                <button
                  className={css.retryButton}
                  onClick={() => window.location.reload()}
                >
                  <FormattedMessage id="OrdersPage.retry" />
                </button>
              </div>
            ) : orders.length > 0 ? (
              <div className={css.ordersGrid}>
                {orders.map(order => (
                  <OrderCard
                    key={order.id.uuid}
                    order={order}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className={css.emptyState}>
                <IconInquiry className={css.emptyStateIcon} />
                <H3 as="h3" className={css.emptyStateTitle}>
                  <FormattedMessage id="OrdersPage.noOrdersTitle" />
                </H3>
                <p className={css.emptyStateDescription}>
                  <FormattedMessage id="OrdersPage.noOrdersDescription" />
                </p>
                <NamedLink className={css.browseButton} name="SearchPage">
                  <FormattedMessage id="OrdersPage.browseProducts" />
                </NamedLink>
              </div>
            )}
          </div>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const ordersPageState = state.OrdersPage || {};
  const {
    fetchInProgress = false,
    fetchOrdersError = null,
    transactionRefs = [],
    pagination = null
  } = ordersPageState;

  return {
    currentUser,
    scrollingDisabled: isScrollingDisabled(state),
    fetchInProgress,
    fetchOrdersError,
    transactionRefs,
    transactions: getMarketplaceEntities(state, transactionRefs),
    pagination,
  };
};

const mapDispatchToProps = dispatch => ({
  loadOrdersData: () => dispatch(loadData()),
});

const OrdersPage = compose(connect(mapStateToProps, mapDispatchToProps))(OrdersPageComponent);

// Add loadData function for server-side rendering
OrdersPage.loadData = loadData;

export default OrdersPage;
