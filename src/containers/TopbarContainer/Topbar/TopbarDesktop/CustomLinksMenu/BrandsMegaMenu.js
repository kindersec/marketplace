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
 * Brands mega dropdown menu component
 * Shows a wide panel with brand options that redirects to search page
 */
const BrandsMegaMenu = ({ currentPage, intl, history, routeConfiguration, isOpen, onRequestOpen, onRequestClose }) => {

  const getCurrentPageClass = page => {
    return currentPage === page ? css.currentPage : null;
  };

  // Popular brands data - using the same structure as the brands page
  const popularBrands = [
    { brand: 'Apple', value: 'apple', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/apple.png' },
    { brand: 'Amazon', value: 'amazon', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/amazon.png' },
    { brand: 'Google', value: 'google', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/google.png' },
    { brand: 'Samsung', value: 'samsung', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/samsung.png' },
    { brand: 'Philips Hue', value: 'philips-hue', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/philips-hue.png' },
    { brand: 'Ring', value: 'ring', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/ring.png' },
    { brand: 'Arlo', value: 'arlo', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/arlo.png' },
    { brand: 'August', value: 'august', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/august.png' },
    { brand: 'Eufy', value: 'eufy', logo_url: 'https://logotyp.us/file/eufy.svg' },
    { brand: 'Wyze', value: 'wyze', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/wyze.png' },
    { brand: 'Nanoleaf', value: 'nanoleaf', logo_url: null },
    { brand: 'Lutron', value: 'lutron', logo_url: null },
    { brand: 'Eve', value: 'eve', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/eve.png' },
    { brand: 'Fibaro', value: 'fibaro', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/fibaro.png' },
    { brand: 'Govee', value: 'govee', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/govee.png' },
    { brand: 'Honeywell', value: 'honeywell', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/honeywell.png' },
    { brand: 'Hubitat', value: 'hubitat', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/hubitat.png' },
    { brand: 'IKEA', value: 'ikea', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/ikea.png' },
    { brand: 'iRobot', value: 'irobot', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/irobot.png' },
    { brand: 'Meross', value: 'meross', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/meross.png' },
    { brand: 'Shelly', value: 'shelly', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/shelly.png' },
    { brand: 'Sonoff', value: 'sonoff', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/sonoff.png' },
    { brand: 'Sonos', value: 'sonos', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/sonos.png' },
    { brand: 'SwitchBot', value: 'switchbot', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/switchbot.png' },
    { brand: 'TP-Link', value: 'tp-link', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/TPLINK_Logo_2.svg' },
    { brand: 'Ubiquiti', value: 'ubiquiti', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/ubiquiti.png' },
    { brand: 'Yale', value: 'yale', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/yale.png' },
    { brand: 'Zooz', value: 'zooz', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/zooz.png' },
  ];

  const handleBrandClick = (brandValue) => {
    // Redirect to search page with brand filter (public param)
    const searchParams = { brand: brandValue };
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
          {intl.formatMessage({ id: 'TopbarDesktop.brands.label' })}
          <IconArrowHead
            direction="down"
            size="small"
            rootClassName={css.arrowIcon}
            ariaLabel={intl.formatMessage({ id: 'TopbarDesktop.brands.label' })}
          />
        </span>
      </MenuLabel>
      <MenuContent
        className={css.megaMenuContent}
        onMouseEnter={() => onRequestOpen && onRequestOpen()}
        onMouseLeave={() => onRequestClose && onRequestClose()}
      >
        <MenuItem key="brands-header" className={css.megaMenuHeaderItem}>
          <div className={css.megaMenuHeader}>
            <h3 className={css.megaMenuTitle}>
              {intl.formatMessage({ id: 'TopbarDesktop.brands.title' })}
            </h3>
            <p className={css.megaMenuSubtitle}>
              {intl.formatMessage({ id: 'TopbarDesktop.brands.subtitle' })}
            </p>
          </div>
        </MenuItem>

        <MenuItem key="brands-grid" className={css.megaMenuGridWrapper}>
          <div className={css.megaMenuGrid}>
            {popularBrands.map((brand, index) => (
              <button
                key={`${brand.value}_${index}`}
                className={css.megaMenuItem}
                onClick={() => handleBrandClick(brand.value)}
              >
                <div className={css.brandLogoContainer}>
                  {brand.logo_url ? (
                    <img
                      src={brand.logo_url}
                      alt={`${brand.brand} logo`}
                      className={css.brandLogo}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  {!brand.logo_url && (
                    <span className={css.brandFallback}>
                      {brand.brand.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className={css.brandName}>{brand.brand}</span>
              </button>
            ))}
          </div>
        </MenuItem>

        <MenuItem key="brands-footer" className={css.megaMenuFooterItem}>
          <div className={css.megaMenuFooter}>
            <NamedLink
              className={css.viewAllLink}
              name="BrandsPage"
            >
              {intl.formatMessage({ id: 'TopbarDesktop.brands.viewAll' })}
            </NamedLink>
          </div>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
};

export default BrandsMegaMenu;
