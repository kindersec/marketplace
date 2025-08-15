import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { FormattedMessage } from '../../../../util/reactIntl';
import { ACCOUNT_SETTINGS_PAGES } from '../../../../routing/routeConfiguration';
import {
  Avatar,
  InlineTextButton,
  LinkedLogo,
  Menu,
  MenuLabel,
  MenuContent,
  MenuItem,
  NamedLink,
  IconProfile,
  IconCart,
} from '../../../../components';

import TopbarSearchForm from '../TopbarSearchForm/TopbarSearchForm';
import CustomLinksMenu from './CustomLinksMenu/CustomLinksMenu';
import BrandsMegaMenu from './CustomLinksMenu/BrandsMegaMenu';
import CategoriesMegaMenu from './CustomLinksMenu/CategoriesMegaMenu';
import CompatibilityMegaMenu from './CustomLinksMenu/CompatibilityMegaMenu';

import css from './TopbarDesktop.module.css';

const ProfileIconLink = () => {
  return (
    <NamedLink name="LoginPage" className={css.topbarLink}>
      <span className={css.topbarLinkLabel}>
        <IconProfile className={css.profileIcon} />
      </span>
    </NamedLink>
  );
};

const InboxLink = ({ notificationCount, inboxTab }) => {
  const notificationDot = notificationCount > 0 ? <div className={css.notificationDot} /> : null;
  return (
    <NamedLink className={css.topbarLink} name="InboxPage" params={{ tab: inboxTab }}>
      <span className={css.topbarLinkLabel}>
        <FormattedMessage id="TopbarDesktop.inbox" />
        {notificationDot}
      </span>
    </NamedLink>
  );
};

const CartLink = ({ notificationCount = 0 }) => {
  const notificationBadge = notificationCount > 0 ? (
    <div className={css.cartNotificationBadge}>
      {notificationCount > 99 ? '99+' : notificationCount}
    </div>
  ) : null;

  return (
    <NamedLink className={css.cartIconLink} name="CartPage">
      <IconCart className={css.cartIcon} size="small" />
      {notificationBadge}
    </NamedLink>
  );
};

const ProfileMenu = ({ currentPage, currentUser, onLogout, showManageListingsLink }) => {
  const currentPageClass = page => {
    const isAccountSettingsPage =
      page === 'AccountSettingsPage' && ACCOUNT_SETTINGS_PAGES.includes(currentPage);
    return currentPage === page || isAccountSettingsPage ? css.currentPage : null;
  };

  // Check if user is of type "provider" to apply reduced width styling
  const isProvider = currentUser?.attributes?.profile?.publicData?.userType === 'provider';
  const profileMenuLabelClass = classNames(
    css.profileMenuLabel,
    { [css.profileMenuLabelProvider]: isProvider }
  );

  return (
    <Menu>
      <MenuLabel className={profileMenuLabelClass} isOpenClassName={css.profileMenuIsOpen}>
        <Avatar className={css.avatar} user={currentUser} disableProfileLink />
      </MenuLabel>
      <MenuContent className={css.profileMenuContent}>
        {showManageListingsLink ? (
          <MenuItem key="ManageListingsPage">
            <NamedLink
              className={classNames(css.menuLink, currentPageClass('ManageListingsPage'))}
              name="ManageListingsPage"
            >
              <span className={css.menuItemBorder} />
              <FormattedMessage id="TopbarDesktop.yourListingsLink" />
            </NamedLink>
          </MenuItem>
        ) : null}
        <MenuItem key="ProfileSettingsPage">
          <NamedLink
            className={classNames(css.menuLink, currentPageClass('ProfileSettingsPage'))}
            name="ProfileSettingsPage"
          >
            <span className={css.menuItemBorder} />
            <FormattedMessage id="TopbarDesktop.profileSettingsLink" />
          </NamedLink>
        </MenuItem>
        <MenuItem key="AccountSettingsPage">
          <NamedLink
            className={classNames(css.menuLink, currentPageClass('AccountSettingsPage'))}
            name="AccountSettingsPage"
          >
            <span className={css.menuItemBorder} />
            <FormattedMessage id="TopbarDesktop.accountSettingsLink" />
          </NamedLink>
        </MenuItem>
        <MenuItem key="logout">
          <InlineTextButton rootClassName={css.logoutButton} onClick={onLogout}>
            <span className={css.menuItemBorder} />
            <FormattedMessage id="TopbarDesktop.logout" />
          </InlineTextButton>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
};

/**
 * Topbar for desktop layout
 *
 * @component
 * @param {Object} props
 * @param {string?} props.className add more style rules in addition to components own css.root
 * @param {string?} props.rootClassName overwrite components own css.root
 * @param {CurrentUser} props.currentUser API entity
 * @param {string?} props.currentPage
 * @param {boolean} props.isAuthenticated
 * @param {number} props.notificationCount
 * @param {Function} props.onLogout
 * @param {Function} props.onSearchSubmit
 * @param {Object?} props.initialSearchFormValues
 * @param {Object} props.intl
 * @param {Object} props.config
 * @param {boolean} props.showSearchForm
 * @param {boolean} props.showCreateListingsLink
 * @param {string} props.inboxTab
 * @returns {JSX.Element} search icon
 */
const TopbarDesktop = props => {
  const {
    className,
    config,
    customLinks,
    currentUser,
    currentPage,
    rootClassName,
    notificationCount = 0,
    intl,
    isAuthenticated,
    onLogout,
    onSearchSubmit,
    initialSearchFormValues = {},
    showSearchForm,
    showCreateListingsLink,
    inboxTab,
    history,
    routeConfiguration,
  } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const marketplaceName = config.marketplaceName;
  const authenticatedOnClientSide = mounted && isAuthenticated;
  const isAuthenticatedOrJustHydrated = isAuthenticated || !mounted;

  const giveSpaceForSearch = customLinks == null || customLinks?.length === 0;
  const classes = classNames(rootClassName || css.root, className);

  // Track which topbar mega menu is open (brands | categories | compatibility)
  const [activeMegaMenuId, setActiveMegaMenuId] = useState(null);

  const inboxLinkMaybe = null; // Removed inbox button for logged-in users

  const profileMenuMaybe = authenticatedOnClientSide ? (
    <ProfileMenu
      currentPage={currentPage}
      currentUser={currentUser}
      onLogout={onLogout}
      showManageListingsLink={showCreateListingsLink}
    />
  ) : null;

  const profileIconLinkMaybe = isAuthenticatedOrJustHydrated ? null : <ProfileIconLink />;

  const searchFormMaybe = showSearchForm ? (
    <TopbarSearchForm
      className={classNames(css.searchLink, { [css.takeAvailableSpace]: giveSpaceForSearch })}
      desktopInputRoot={css.topbarSearchWithLeftPadding}
      onSubmit={onSearchSubmit}
      initialValues={initialSearchFormValues}
      appConfig={config}
    />
  ) : (
    <div
      className={classNames(css.spacer, css.topbarSearchWithLeftPadding, {
        [css.takeAvailableSpace]: giveSpaceForSearch,
      })}
    />
  );

  return (
    <nav className={classes}>
      <LinkedLogo
        className={css.logoLink}
        layout="desktop"
        alt={intl.formatMessage({ id: 'TopbarDesktop.logo' }, { marketplaceName })}
        linkToExternalSite={config?.topbar?.logoLink}
      />
      {searchFormMaybe}

      <CustomLinksMenu
        currentPage={currentPage}
        customLinks={customLinks}
        intl={intl}
        hasClientSideContentReady={authenticatedOnClientSide || !isAuthenticatedOrJustHydrated}
        showCreateListingsLink={showCreateListingsLink}
      />

      <BrandsMegaMenu
        currentPage={currentPage}
        intl={intl}
        history={history}
        routeConfiguration={routeConfiguration}
        isOpen={activeMegaMenuId === 'brands'}
        onRequestOpen={() => setActiveMegaMenuId('brands')}
        onRequestClose={() => setActiveMegaMenuId(null)}
      />
      <CategoriesMegaMenu
        currentPage={currentPage}
        intl={intl}
        history={history}
        routeConfiguration={routeConfiguration}
        isOpen={activeMegaMenuId === 'categories'}
        onRequestOpen={() => setActiveMegaMenuId('categories')}
        onRequestClose={() => setActiveMegaMenuId(null)}
      />
      <CompatibilityMegaMenu
        currentPage={currentPage}
        intl={intl}
        history={history}
        routeConfiguration={routeConfiguration}
        isOpen={activeMegaMenuId === 'compatibility'}
        onRequestOpen={() => setActiveMegaMenuId('compatibility')}
        onRequestClose={() => setActiveMegaMenuId(null)}
      />
      {inboxLinkMaybe}
      <CartLink notificationCount={notificationCount} />
      {profileMenuMaybe}
      {profileIconLinkMaybe}
    </nav>
  );
};

export default TopbarDesktop;
