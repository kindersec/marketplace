import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useConfiguration } from '../../context/configurationContext';
import { FormattedMessage, useIntl } from '../../util/reactIntl';
import { ensureCurrentUser } from '../../util/data';
import { showPaymentDetailsForUser } from '../../util/userHelpers';
import { isScrollingDisabled } from '../../ducks/ui.duck';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';


import {
  H2,
  H3,
  Page,
  UserNav,
  NamedLink,
  LayoutSingleColumn,
  Avatar,
  IconEdit,
  IconInquiry,
  IconProfile
} from '../../components';

import TopbarContainer from '../../containers/TopbarContainer/TopbarContainer';
import FooterContainer from '../../containers/FooterContainer/FooterContainer';

import css from './ProfileDashboardPage.module.css';

const ProfileCard = ({ title, children, className, icon: Icon }) => (
  <div className={`${css.profileCard} ${className || ''}`}>
    <div className={css.cardHeader}>
      {Icon && <Icon className={css.cardIcon} />}
      <H3 as="h3" className={css.cardTitle}>{title}</H3>
    </div>
    <div className={css.cardContent}>
      {children}
    </div>
  </div>
);

const ProfileActionCard = ({ title, description, icon: Icon, linkName, linkParams, className }) => (
  <NamedLink
    className={`${css.actionCard} ${className || ''}`}
    name={linkName}
    params={linkParams}
  >
    <div className={css.actionCardContent}>
      {Icon && <Icon className={css.actionIcon} />}
      <div className={css.actionText}>
        <H3 as="h3" className={css.actionTitle}>{title}</H3>
        <p className={css.actionDescription}>{description}</p>
      </div>
    </div>
  </NamedLink>
);

export const ProfileDashboardPageComponent = props => {
  const config = useConfiguration();
  const intl = useIntl();
  const { currentUser, scrollingDisabled } = props;

  const user = ensureCurrentUser(currentUser);
  const { firstName, lastName, displayName, bio, publicData } = user?.attributes?.profile || {};
  const { email, emailVerified } = user?.attributes || {};
  const profileImage = user?.profileImage;

  const { showPayoutDetails, showPaymentMethods } = showPaymentDetailsForUser(config, currentUser);

  // Get order statistics from Redux state
  const { transactionRefs } = props;
  const orders = transactionRefs.map(ref => {
    const entity = getMarketplaceEntities(props, [ref])[0];
    return entity;
  }).filter(Boolean);

  // Calculate completed orders and total spent
  const completedOrders = orders.filter(order =>
    order.lastTransition === 'transition/mark-received-from-purchased'
  ).length;

  const totalSpent = orders.reduce((total, order) => {
    if (order.payinTotal && order.payinTotal.amount) {
      return total + parseFloat(order.payinTotal.amount);
    }
    return total;
  }, 0);

  const orderStats = { completedOrders, totalSpent };

  const title = intl.formatMessage({ id: 'ProfileDashboardPage.title' });
  const displayNameToShow = displayName || `${firstName} ${lastName}`;

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
            currentPage="ProfileDashboardPage"
            rootClassName={css.userNav}
          />

          {/* Profile Header */}
          <div className={css.profileHeader}>
            <div className={css.profileImageSection}>
              <Avatar
                user={user}
                className={css.profileImage}
                size="large"
              />
              <NamedLink
                className={css.editProfileButton}
                name="ProfileSettingsPage"
              >
                <IconEdit className={css.editIcon} />
                <FormattedMessage id="ProfileDashboardPage.editProfile" />
              </NamedLink>
            </div>
            <div className={css.profileInfo}>
              <H2 as="h1" className={css.profileName}>
                {displayNameToShow}
              </H2>
              {bio && <p className={css.profileBio}>{bio}</p>}
              <div className={css.profileStats}>
                <div className={css.statItem}>
                  <span className={css.statNumber}>{orderStats.completedOrders || 0}</span>
                  <span className={css.statLabel}>
                    <FormattedMessage id="ProfileDashboardPage.completedOrders" />
                  </span>
                </div>
                <div className={css.statItem}>
                  <span className={css.statNumber}>${(orderStats.totalSpent || 0).toFixed(2)}</span>
                  <span className={css.statLabel}>
                    <FormattedMessage id="ProfileDashboardPage.totalSpent" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={css.quickActions}>
            <H3 as="h2" className={css.sectionTitle}>
              <FormattedMessage id="ProfileDashboardPage.quickActions" />
            </H3>
            <div className={css.actionGrid}>
              <ProfileActionCard
                title={<FormattedMessage id="ProfileDashboardPage.viewOrders" />}
                description={<FormattedMessage id="ProfileDashboardPage.viewOrdersDesc" />}
                icon={IconInquiry}
                linkName="OrdersPage"
                className={css.ordersCard}
              />
              <ProfileActionCard
                title={<FormattedMessage id="ProfileDashboardPage.browseProducts" />}
                description={<FormattedMessage id="ProfileDashboardPage.browseProductsDesc" />}
                icon={IconProfile}
                linkName="SearchPage"
                className={css.browseCard}
              />
            </div>
          </div>

          {/* Account Settings */}
          <div className={css.accountSettings}>
            <H3 as="h2" className={css.sectionTitle}>
              <FormattedMessage id="ProfileDashboardPage.accountSettings" />
            </H3>
            <div className={css.settingsGrid}>
              <ProfileCard
                title={<FormattedMessage id="ProfileDashboardPage.contactInfo" />}
                icon={IconProfile}
                className={css.contactCard}
              >
                <div className={css.settingItem}>
                  <span className={css.settingLabel}>
                    <FormattedMessage id="ProfileDashboardPage.email" />
                  </span>
                  <span className={css.settingValue}>
                    {email}
                    {emailVerified ? (
                      <span className={css.verifiedBadge}>
                        <FormattedMessage id="ProfileDashboardPage.verified" />
                      </span>
                    ) : (
                      <span className={css.unverifiedBadge}>
                        <FormattedMessage id="ProfileDashboardPage.unverified" />
                      </span>
                    )}
                  </span>
                </div>
                <NamedLink
                  className={css.editSettingLink}
                  name="ContactDetailsPage"
                >
                  <FormattedMessage id="ProfileDashboardPage.editContactInfo" />
                </NamedLink>
              </ProfileCard>

              <ProfileCard
                title={<FormattedMessage id="ProfileDashboardPage.security" />}
                icon={IconProfile}
                className={css.securityCard}
              >
                <div className={css.settingItem}>
                  <span className={css.settingLabel}>
                    <FormattedMessage id="ProfileDashboardPage.password" />
                  </span>
                  <span className={css.settingValue}>••••••••</span>
                </div>
                <NamedLink
                  className={css.editSettingLink}
                  name="PasswordChangePage"
                >
                  <FormattedMessage id="ProfileDashboardPage.changePassword" />
                </NamedLink>
              </ProfileCard>

              {showPaymentMethods && (
                <ProfileCard
                  title={<FormattedMessage id="ProfileDashboardPage.paymentMethods" />}
                  icon={IconProfile}
                  className={css.paymentCard}
                >
                  <div className={css.settingItem}>
                    <span className={css.settingLabel}>
                      <FormattedMessage id="ProfileDashboardPage.paymentMethods" />
                    </span>
                    <span className={css.settingValue}>
                      <FormattedMessage id="ProfileDashboardPage.managePaymentMethods" />
                    </span>
                  </div>
                  <NamedLink
                    className={css.editSettingLink}
                    name="PaymentMethodsPage"
                  >
                    <FormattedMessage id="ProfileDashboardPage.managePaymentMethods" />
                  </NamedLink>
                </ProfileCard>
              )}

              {showPayoutDetails && (
                <ProfileCard
                  title={<FormattedMessage id="ProfileDashboardPage.payoutDetails" />}
                  icon={IconProfile}
                  className={css.payoutCard}
                >
                  <div className={css.settingItem}>
                    <span className={css.settingLabel}>
                      <FormattedMessage id="ProfileDashboardPage.payoutDetails" />
                    </span>
                    <span className={css.settingValue}>
                      <FormattedMessage id="ProfileDashboardPage.managePayoutDetails" />
                    </span>
                  </div>
                  <NamedLink
                    className={css.editSettingLink}
                    name="StripePayoutPage"
                  >
                    <FormattedMessage id="ProfileDashboardPage.managePayoutDetails" />
                  </NamedLink>
                </ProfileCard>
              )}
            </div>
          </div>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const { transactionRefs } = state.OrdersPage;
  return {
    currentUser,
    scrollingDisabled: isScrollingDisabled(state),
    transactionRefs,
  };
};

const ProfileDashboardPage = compose(connect(mapStateToProps))(ProfileDashboardPageComponent);

export default ProfileDashboardPage;
