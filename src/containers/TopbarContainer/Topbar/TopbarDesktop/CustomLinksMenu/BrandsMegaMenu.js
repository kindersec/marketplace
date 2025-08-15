import React, { useState, useMemo } from 'react';
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
import MegaMenuSearch from './MegaMenuSearch';

import css from './MegaMenu.module.css';

/**
 * Brands mega dropdown menu component
 * Shows a wide panel with brand options that redirects to search page
 */
const BrandsMegaMenu = ({ currentPage, intl, history, routeConfiguration, isOpen, onRequestOpen, onRequestClose }) => {

  const getCurrentPageClass = page => {
    return currentPage === page ? css.currentPage : null;
  };

  // Full brands data - using the same structure as the brands page
  const allBrands = [
    { brand: 'Adaprox', value: 'adaprox', logo_url: null, url: 'https://www.adaprox.io/' },
    { brand: 'Aeotec', value: 'aeotec', logo_url: 'https://aeotec.com/wp-content/uploads/2023/07/AEOTEC-3.svg', url: 'https://aeotec.com/' },
    { brand: 'A Hope Garden', value: 'a-hope-garden', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/a-hope-garden.png', url: 'https://ahopegarden.com/' },
    { brand: 'Alfred', value: 'alfred', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/alfred.png', url: 'https://alfredinc.com/' },
    { brand: 'Amazon', value: 'amazon', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/amazon.png', url: 'https://www.amazon.com/' },
    { brand: 'AeroGarden', value: 'aerogarden', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/aerogarden.png', url: 'https://aerogarden.com/' },
    { brand: 'Apple', value: 'apple', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/apple.png', url: 'https://www.apple.com/' },
    { brand: 'Aqara', value: 'aqara', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/aqara.png', url: 'https://www.aqara.com/en/' },
    { brand: 'Arlo', value: 'arlo', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/arlo.png', url: 'https://www.arlo.com/' },
    { brand: 'AUK', value: 'auk', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/auk.png', url: 'https://us.auk.com/' },
    { brand: 'August', value: 'august', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/august.png', url: 'https://august.com/' },
    { brand: 'Blink', value: 'blink', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/blink.png', url: 'https://blinkforhome.com/' },
    { brand: 'Bond', value: 'bond', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/bond.png', url: 'https://bondhome.io/' },
    { brand: 'Brilliant smart home', value: 'brilliant-smart-home', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/brilliant-smart-home.png', url: 'https://www.brilliant.tech/' },
    { brand: 'Chamberlain', value: 'chamberlain', logo_url: null, url: 'https://www.chamberlain.com/' },
    { brand: 'Click & Grow', value: 'click-&-grow', logo_url: 'https://support.clickandgrow.com/hc/theming_assets/01JAD6WHETQ33Q0CW3XFDVPHH9', url: 'https://www.clickandgrow.com/' },
    { brand: 'Cradlewise', value: 'cradlewise', logo_url: null, url: 'https://www.cradlewise.com/en-US' },
    { brand: 'Davis Instruments', value: 'davis-instruments', logo_url: null, url: 'https://www.davisinstruments.com' },
    { brand: 'Ecobee', value: 'ecobee', logo_url: 'https://logotyp.us/file/ecobee.svg', url: 'https://www.ecobee.com/en-us/' },
    { brand: 'Ecolink', value: 'ecolink', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/ecolink.png', url: 'https://discoverecolink.com/' },
    { brand: 'Ecovacs', value: 'ecovacs', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/ecovacs.png', url: 'https://www.ecovacs.com/us/' },
    { brand: 'Eero', value: 'eero', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/eero.png', url: 'https://eero.com/' },
    { brand: 'Enbrighten', value: 'enbrighten', logo_url: null, url: 'https://enbrightenme.com/' },
    { brand: 'Enphase', value: 'enphase', logo_url: null, url: 'https://enphase.com/' },
    { brand: 'Eufy', value: 'eufy', logo_url: 'https://logotyp.us/file/eufy.svg', url: 'https://www.eufylife.com/' },
    { brand: 'Fibaro', value: 'fibaro', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/fibaro.png', url: 'https://www.fibaro.com/' },
    { brand: 'Govee', value: 'govee', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/govee.png', url: 'https://www.govee.com/' },
    { brand: 'Google', value: 'google', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/google.png', url: 'https://store.google.com/' },
    { brand: 'Honeywell', value: 'honeywell', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/honeywell.png', url: 'https://www.honeywell.com/' },
    { brand: 'Hubitat', value: 'hubitat', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/hubitat.png', url: 'https://hubitat.com/' },
    { brand: 'IKEA', value: 'ikea', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/ikea.png', url: 'https://www.ikea.com/' },
    { brand: 'iRobot', value: 'irobot', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/irobot.png', url: 'https://www.irobot.com/' },
    { brand: 'Lutron', value: 'lutron', logo_url: null, url: 'https://www.lutron.com/' },
    { brand: 'Meross', value: 'meross', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/meross.png', url: 'https://www.meross.com/' },
    { brand: 'Nanoleaf', value: 'nanoleaf', logo_url: null, url: 'https://nanoleaf.me/' },
    { brand: 'Philips Hue', value: 'philips-hue', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/philips-hue.png', url: 'https://www.philips-hue.com/' },
    { brand: 'Ring', value: 'ring', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/ring.png', url: 'https://ring.com/' },
    { brand: 'Samsung', value: 'samsung', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/samsung.png', url: 'https://www.samsung.com/' },
    { brand: 'Shelly', value: 'shelly', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/shelly.png', url: 'https://shelly.cloud/' },
    { brand: 'Sonoff', value: 'sonoff', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/sonoff.png', url: 'https://sonoff.tech/' },
    { brand: 'Sonos', value: 'sonos', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/sonos.png', url: 'https://www.sonos.com/' },
    { brand: 'SwitchBot', value: 'switchbot', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/switchbot.png', url: 'https://www.switch-bot.com/' },
    { brand: 'TP-Link', value: 'tp-link', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/TPLINK_Logo_2.svg', url: 'https://www.tp-link.com/' },
    { brand: 'Ubiquiti', value: 'ubiquiti', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/ubiquiti.png', url: 'https://www.ui.com/' },
    { brand: 'Wyze', value: 'wyze', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/wyze.png', url: 'https://www.wyze.com/' },
    { brand: 'Yale', value: 'yale', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/yale.png', url: 'https://www.yale.com/' },
    { brand: 'Zooz', value: 'zooz', logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/zooz.png', url: 'https://www.getzooz.com/' },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  // Filter brands based on search term
  const filteredBrands = useMemo(() => {
    if (!searchTerm.trim()) {
      return allBrands;
    }

    const searchLower = searchTerm.toLowerCase();
    return allBrands.filter(brand =>
      brand.brand.toLowerCase().includes(searchLower) ||
      brand.value.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

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

        <MenuItem key="brands-search" className={css.megaMenuSearchItem}>
          <MegaMenuSearch
            placeholder="Search brands..."
            onSearch={handleSearch}
          />
        </MenuItem>

        <MenuItem key="brands-grid" className={css.megaMenuGridWrapper}>
          <div className={css.megaMenuGrid}>
            {filteredBrands.map((brand, index) => (
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
          {filteredBrands.length === 0 && (
            <div className={css.noResults}>
              <p>No brands found matching "{searchTerm}"</p>
            </div>
          )}
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
