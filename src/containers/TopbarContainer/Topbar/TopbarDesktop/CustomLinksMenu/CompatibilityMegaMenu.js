import React from 'react';
import classNames from 'classnames';

import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  NamedLink,
  IconArrowHead,
} from '../../../../../components';
import { createResourceLocatorString } from '../../../../../util/routes';

import css from './MegaMenu.module.css';

/**
 * Compatibility mega dropdown menu component
 * Shows a wide panel with compatibility options that redirects to search page
 */
const CompatibilityMegaMenu = ({ currentPage, intl, history, routeConfiguration, isOpen, onRequestOpen, onRequestClose }) => {

  const getCurrentPageClass = page => {
    return currentPage === page ? css.currentPage : null;
  };

  // Ecosystems data
  const ecosystems = [
    { name: 'Google Home', value: 'google-home', icon: '🏠', description: 'Google Assistant ecosystem' },
    { name: 'Alexa', value: 'alexa', icon: '🔵', description: 'Amazon Alexa ecosystem' },
    { name: 'Apple HomeKit', value: 'homekit', icon: '🍎', description: 'Apple Home ecosystem' },
    { name: 'Home Assistant', value: 'home-assistant', icon: '🏡', description: 'Open source home automation' },
    { name: 'Samsung SmartThings', value: 'smartthings', icon: '📱', description: 'Samsung IoT platform' },
    { name: 'Hubitat', value: 'hubitat', icon: '🏢', description: 'Local home automation hub' },
  ];

  // Network connectivity data
  const connectivity = [
    { name: 'Wi-Fi', value: 'wifi', icon: '📶', description: 'Wireless internet connectivity' },
    { name: 'Zigbee', value: 'zigbee', icon: '🕷️', description: 'Low-power wireless mesh network' },
    { name: 'Z-Wave', value: 'zwave', icon: '🌊', description: 'Wireless mesh network protocol' },
    { name: 'Matter', value: 'matter', icon: '🔗', description: 'Unified smart home standard' },
    { name: 'Bluetooth', value: 'bluetooth', icon: '📡', description: 'Short-range wireless technology' },
    { name: 'Thread', value: 'thread', icon: '🧵', description: 'IPv6-based mesh network' },
  ];

  const handleCompatibilityClick = (compatibilityValue) => {
    // Redirect to search page with compatibility filter (public param)
    const searchParams = { compatibility: compatibilityValue };
    const to = createResourceLocatorString('SearchPage', routeConfiguration, {}, searchParams);
    history.push(to);
    onRequestClose && onRequestClose();
  };

  return (
    <Menu
      contentPlacementOffset={-12}
      contentPosition="left"
      isOpen={isOpen}
      onToggleActive={nextOpen => (nextOpen ? onRequestOpen && onRequestOpen() : onRequestClose && onRequestClose())}
    >
      <MenuLabel
        className={css.megaMenuLabel}
        isOpenClassName={css.megaMenuIsOpen}
        onMouseEnter={() => onRequestOpen && onRequestOpen()}
        onMouseLeave={() => onRequestClose && onRequestClose()}
      >
        <span className={css.megaMenuLabelWrapper}>
          {intl.formatMessage({ id: 'TopbarDesktop.compatibility.label' })}
          <IconArrowHead
            direction="down"
            size="small"
            rootClassName={css.arrowIcon}
            ariaLabel={intl.formatMessage({ id: 'TopbarDesktop.compatibility.label' })}
          />
        </span>
      </MenuLabel>
      <MenuContent
        className={css.megaMenuContent}
        onMouseEnter={() => onRequestOpen && onRequestOpen()}
        onMouseLeave={() => onRequestClose && onRequestClose()}
      >
        <MenuItem key="compatibility-header" className={css.megaMenuHeaderItem}>
          <div className={css.megaMenuHeader}>
            <h3 className={css.megaMenuTitle}>
              {intl.formatMessage({ id: 'TopbarDesktop.compatibility.title' })}
            </h3>
            <p className={css.megaMenuSubtitle}>
              {intl.formatMessage({ id: 'TopbarDesktop.compatibility.subtitle' })}
            </p>
          </div>
        </MenuItem>

        <MenuItem key="compatibility-ecosystems" className={css.megaMenuSectionItem}>
          <div className={css.megaMenuSection}>
            <h4 className={css.megaMenuSectionTitle}>
              {intl.formatMessage({ id: 'TopbarDesktop.compatibility.ecosystems' })}
            </h4>
            <div className={css.megaMenuGrid}>
              {ecosystems.map((ecosystem, index) => (
                <button
                  key={`ecosystem_${ecosystem.value}_${index}`}
                  className={css.megaMenuItem}
                  onClick={() => handleCompatibilityClick(ecosystem.value)}
                >
                  <span className={css.compatibilityIcon}>{ecosystem.icon}</span>
                  <div className={css.compatibilityContent}>
                    <span className={css.compatibilityName}>{ecosystem.name}</span>
                    <span className={css.compatibilityDescription}>{ecosystem.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </MenuItem>

        <MenuItem key="compatibility-connectivity" className={css.megaMenuSectionItem}>
          <div className={css.megaMenuSection}>
            <h4 className={css.megaMenuSectionTitle}>
              {intl.formatMessage({ id: 'TopbarDesktop.compatibility.connectivity' })}
            </h4>
            <div className={css.megaMenuGrid}>
              {connectivity.map((protocol, index) => (
                <button
                  key={`connectivity_${protocol.value}_${index}`}
                  className={css.megaMenuItem}
                  onClick={() => handleCompatibilityClick(protocol.value)}
                >
                  <span className={css.compatibilityIcon}>{protocol.icon}</span>
                  <div className={css.compatibilityContent}>
                    <span className={css.compatibilityName}>{protocol.name}</span>
                    <span className={css.compatibilityDescription}>{protocol.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </MenuItem>

        <MenuItem key="compatibility-footer" className={css.megaMenuFooterItem}>
          <div className={css.megaMenuFooter}>
            <NamedLink
              className={css.viewAllLink}
              name="CompatibilityPage"
            >
              {intl.formatMessage({ id: 'TopbarDesktop.compatibility.viewAll' })}
            </NamedLink>
          </div>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
};

export default CompatibilityMegaMenu;
