import React from 'react';
import { bool } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { propTypes } from '../../util/types';
import { withRouter } from 'react-router-dom';
import { Page, LayoutSingleColumn } from '../../components';

import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import css from './BrandsPage.module.css';

// All brands exported from brands.json (sorted alphabetically)
const brandsData = [
  {
    brand: "Adaprox",
    value: "adaprox",
    logo_url: null,
    url: "https://www.adaprox.io/"
  },
  {
    brand: "Aeotec",
    value: "aeotec",
    logo_url: "https://aeotec.com/wp-content/uploads/2023/07/AEOTEC-3.svg",
    url: "https://aeotec.com/"
  },
  {
    brand: "A Hope Garden",
    value: "a-hope-garden",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/a-hope-garden.png",
    url: "https://ahopegarden.com/"
  },
  {
    brand: "Alfred",
    value: "alfred",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/alfred.png",
    url: "https://alfredinc.com/"
  },
  {
    brand: "Amazon",
    value: "amazon",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/amazon.png",
    url: "https://www.amazon.com/"
  },
  {
    brand: "AeroGarden",
    value: "aerogarden",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/aerogarden.png",
    url: "https://aerogarden.com/"
  },
  {
    brand: "Apple",
    value: "apple",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/apple.png",
    url: "https://www.apple.com/"
  },
  {
    brand: "Aqara",
    value: "aqara",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/aqara.png",
    url: "https://www.aqara.com/en/"
  },
  {
    brand: "Arlo",
    value: "arlo",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/arlo.png",
    url: "https://www.arlo.com/"
  },
  {
    brand: "AUK",
    value: "auk",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/auk.png",
    url: "https://us.auk.com/"
  },
  {
    brand: "August",
    value: "august",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/august.png",
    url: "https://august.com/"
  },
  {
    brand: "Blink",
    value: "blink",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/blink.png",
    url: "https://blinkforhome.com/"
  },
  {
    brand: "Bond",
    value: "bond",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/bond.png",
    url: "https://bondhome.io/"
  },
  {
    brand: "Brilliant smart home",
    value: "brilliant-smart-home",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/brilliant-smart-home.png",
    url: "https://www.brilliant.tech/"
  },
  {
    brand: "Chamberlain",
    value: "chamberlain",
    logo_url: null,
    url: "https://www.chamberlain.com/"
  },
  {
    brand: "Click & Grow",
    value: "click-&-grow",
    logo_url: "https://support.clickandgrow.com/hc/theming_assets/01JAD6WHETQ33Q0CW3XFDVPHH9",
    url: "https://www.clickandgrow.com/"
  },
  {
    brand: "Cradlewise",
    value: "cradlewise",
    logo_url: null,
    url: "https://www.cradlewise.com/en-US"
  },
  {
    brand: "Davis Instruments",
    value: "davis-instruments",
    logo_url: null,
    url: "https://www.davisinstruments.com"
  },
  {
    brand: "Ecobee",
    value: "ecobee",
    logo_url: "https://logotyp.us/file/ecobee.svg",
    url: "https://www.ecobee.com/en-us/"
  },
  {
    brand: "Ecolink",
    value: "ecolink",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/ecolink.png",
    url: "https://discoverecolink.com/"
  },
  {
    brand: "Ecovacs",
    value: "ecovacs",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/ecovacs.png",
    url: "https://www.ecovacs.com/us/"
  },
  {
    brand: "Eero",
    value: "eero",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/eero.png",
    url: "https://eero.com/"
  },
  {
    brand: "Enbrighten",
    value: "enbrighten",
    logo_url: null,
    url: "https://enbrightenme.com/"
  },
  {
    brand: "Enphase",
    value: "enphase",
    logo_url: null,
    url: "https://enphase.com/"
  },
  {
    brand: "Ermomix",
    value: "ermomix",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/ermomix.png",
    url: "https://ermonix.com/collections/all"
  },
  {
    brand: "Eufy",
    value: "eufy",
    logo_url: "https://logotyp.us/file/eufy.svg",
    url: "https://www.eufy.com/"
  },
  {
    brand: "Eve",
    value: "eve",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/eve.png",
    url: "https://www.evehome.com/en-us/"
  },
  {
    brand: "Ezlo",
    value: "ezlo",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/ezlo.png",
    url: "https://ezlo.com/"
  },
  {
    brand: "Fibaro",
    value: "fibaro",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/fibaro.png",
    url: "https://www.fibaro.com/us/"
  },
  {
    brand: "Flipr",
    value: "flipr",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/flipr.png",
    url: "https://flipr.shop/"
  },
  {
    brand: "Frient",
    value: "frient",
    logo_url: null,
    url: "https://frient.com/"
  },
  {
    brand: "Furbo",
    value: "furbo",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/furbo.png",
    url: "https://furbo.com/us/"
  },
  {
    brand: "Gardyn",
    value: "gardyn",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/gardyn.png",
    url: "https://mygardyn.com/"
  },
  {
    brand: "Google",
    value: "google",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/google.png",
    url: "https://store.google.com/"
  },
  {
    brand: "Govee",
    value: "govee",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/govee.png",
    url: "https://us.govee.com/"
  },
  {
    brand: "Haozee",
    value: "haozee",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/haozee.png",
    url: "http://haozee.com/"
  },
  {
    brand: "Honeywell",
    value: "honeywell",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/honeywell.png",
    url: "https://www.resideo.com/us/en/"
  },
  {
    brand: "Hubitat",
    value: "hubitat",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/hubitat.png",
    url: "https://hubitat.com/"
  },
  {
    brand: "Husqvarna",
    value: "husqvarna",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/husqvarna.png",
    url: "https://www.husqvarna.com/us"
  },
  {
    brand: "Ikea",
    value: "ikea",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/ikea.png",
    url: "https://www.ikea.com/us/en/"
  },
  {
    brand: "iRobot",
    value: "irobot",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/irobot.png",
    url: "https://www.irobot.com/en_US/"
  },
  {
    brand: "Inkbird",
    value: "inkbird",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/inkbird.png",
    url: "https://inkbird.com/"
  },
  {
    brand: "Kactoily",
    value: "kactoily",
    logo_url: null,
    url: "https://kactoily.com"
  },
  {
    brand: "Kwikset",
    value: "kwikset",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/kwikset.png",
    url: "https://www.kwikset.com/"
  },
  {
    brand: "LetPot",
    value: "letpot",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/letpot.png",
    url: "https://letpot.com/"
  },
  {
    brand: "Levoit",
    value: "levoit",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/levoit.png",
    url: "https://www.levoit.com/"
  },
  {
    brand: "Lutron Caseta",
    value: "lutron-caseta",
    logo_url: null,
    url: "https://www.casetawireless.com/us/en/"
  },
  {
    brand: "Maytronics",
    value: "maytronics",
    logo_url: null,
    url: "https://www.maytronics.com/en-us/"
  },
  {
    brand: "Meross",
    value: "meross",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/meross.png",
    url: "https://www.meross.com/"
  },
  {
    brand: "Minoston",
    value: "minoston",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/minoston.png",
    url: "https://minoston.com/"
  },
  {
    brand: "Moes",
    value: "moes",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/moes.png",
    url: "https://moeshouse.com/"
  },
  {
    brand: "Nabu Casa",
    value: "nabu-casa",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/nabu-casa.png",
    url: "https://www.home-assistant.io/"
  },
  {
    brand: "Navimow",
    value: "navimow",
    logo_url: null,
    url: "https://us.navimow.segway.com/"
  },
  {
    brand: "Neakasa",
    value: "neakasa",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/neakasa.png",
    url: "https://neakasa.com/products/neakasa-m1-cat-litter-box"
  },
  {
    brand: "Netatmo",
    value: "netatmo",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/netatmo.png",
    url: "https://www.netatmo.com/"
  },
  {
    brand: "Orbit B-hyve",
    value: "orbit-b-hyve",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/orbit-b-hyve.png",
    url: "https://www.orbitonline.com/"
  },
  {
    brand: "Philips Hue",
    value: "philips-hue",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/philips-hue.png",
    url: "https://www.philips-hue.com/en-us"
  },
  {
    brand: "Qubino",
    value: "qubino",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/qubino.png",
    url: "https://qubino.com/"
  },
  {
    brand: "Rachio",
    value: "rachio",
    logo_url: null,
    url: "https://rachio.com/"
  },
  {
    brand: "Reolink",
    value: "reolink",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/reolink.png",
    url: "https://reolink.com/"
  },
  {
    brand: "Ring",
    value: "ring",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/ring.png",
    url: "https://ring.com/"
  },
  {
    brand: "Roborock",
    value: "roborock",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/roborock.png",
    url: "https://us.roborock.com/"
  },
  {
    brand: "Samsung",
    value: "samsung",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/samsung.png",
    url: "https://www.samsung.com/us/"
  },
  {
    brand: "Schlage",
    value: "schlage",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/schlage.png",
    url: "https://www.schlage.com/en/home.html"
  },
  {
    brand: "Sengled",
    value: "sengled",
    logo_url: "https://mms.businesswire.com/media/20200105005104/en/765199/5/Sengled_Logo_Red_large_CMYK_highres.jpg?download=1",
    url: "https://us.sengled.com/"
  },
  {
    brand: "Shelly",
    value: "shelly",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/shelly.png",
    url: "https://us.shelly.com/"
  },
  {
    brand: "Shark",
    value: "shark",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/shark.png",
    url: "https://www.sharkclean.com/"
  },
  {
    brand: "Sonoff",
    value: "sonoff",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/sonoff.png",
    url: "https://sonoff.tech/"
  },
  {
    brand: "Sonos",
    value: "sonos",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/sonos.png",
    url: "https://www.sonos.com/"
  },
  {
    brand: "Surepetcare",
    value: "surepetcare",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/surepetcare.png",
    url: "https://www.surepetcare.com/en-us"
  },
  {
    brand: "Switchbot",
    value: "switchbot",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/switchbot.png",
    url: "https://www.switch-bot.com/"
  },
  {
    brand: "Tedee",
    value: "tedee",
    logo_url: "https://tedee.com/app/uploads/2021/04/logo-1.svg",
    url: "https://tedee.com/"
  },
  {
    brand: "Third Reality",
    value: "third-reality",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/third-reality.png",
    url: "https://3reality.com/"
  },
  {
    brand: "TP-Link",
    value: "tp-link",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/d/d0/TPLINK_Logo_2.svg",
    url: "https://www.tp-link.com/us/"
  },
  {
    brand: "Ubiquiti",
    value: "ubiquiti",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/ubiquiti.png",
    url: "https://store.ui.com/"
  },
  {
    brand: "Wybot",
    value: "wybot",
    logo_url: null,
    url: "https://wybotpool.com/"
  },
  {
    brand: "Wyze",
    value: "wyze",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/wyze.png",
    url: "https://wyze.com/"
  },
  {
    brand: "Xiaomi",
    value: "xiaomi",
    logo_url: null,
    url: "https://www.mi.com/us/"
  },
  {
    brand: "X-Sense",
    value: "x-sense",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/x-sense.png",
    url: "https://www.x-sense.com/"
  },
  {
    brand: "Yale",
    value: "yale",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/yale.png",
    url: "https://shopyalehome.com/pages/smart-locks"
  },
  {
    brand: "Yieryi",
    value: "yieryi",
    logo_url: null,
    url: "https://www.yieryi.com/"
  },
  {
    brand: "Zooz",
    value: "zooz",
    logo_url: "https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/zooz.png",
    url: "https://www.getzooz.com/"
  }
];

export const BrandsPageComponent = props => {
  const { inProgress, error } = props;
  const [searchTerm, setSearchTerm] = React.useState('');

  if (inProgress) {
    return (
      <Page title="Smart Home Brands" scrollingDisabled={false}>
        <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
          <div className={css.root}>
            <div className={css.loading}>Loading brands...</div>
          </div>
        </LayoutSingleColumn>
      </Page>
    );
  }

  if (error) {
    return (
      <Page title="Smart Home Brands" scrollingDisabled={false}>
        <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
          <div className={css.root}>
            <div className={css.error}>
              <h2>Oops, something went wrong!</h2>
              <p>{error.message}</p>
            </div>
          </div>
        </LayoutSingleColumn>
      </Page>
    );
  }

  const handleBrandClick = (brand) => {
    // Redirect to search page with brand filter (public param)
    const searchUrl = `/products?brand=${encodeURIComponent(brand.value)}`;
    window.location.href = searchUrl;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBrands = brandsData.filter(brand =>
    brand.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Page title="Smart Home Brands" scrollingDisabled={false}>
      <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
        <div className={css.root}>
          <div className={css.container}>
            <h1 className={css.title}>Smart Home Brands</h1>
            <p className={css.subtitle}>Discover top smart home device manufacturers</p>

            {/* Search Bar */}
            <div className={css.searchSection}>
              <div className={css.searchContainer}>
                <input
                  type="text"
                  placeholder="Search brands by name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className={css.searchInput}
                />
                <div className={css.searchIcon}>🔍</div>
              </div>
              {searchTerm && (
                <div className={css.searchResults}>
                  Found {filteredBrands.length} brand{filteredBrands.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>

            <div className={css.brandsGrid}>
              {filteredBrands.map((brand, index) => (
                <div
                  key={index}
                  className={css.brandCard}
                  onClick={() => handleBrandClick(brand)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleBrandClick(brand);
                    }
                  }}
                >
                  <div className={css.brandImageContainer}>
                    {brand.logo_url ? (
                      <img
                        src={brand.logo_url}
                        alt={brand.brand}
                        className={css.brandImage}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <div
                      className={css.brandPlaceholder}
                      style={{ display: brand.logo_url ? 'none' : 'block' }}
                    >
                      {brand.brand}
                    </div>
                  </div>
                  <h2 className={css.brandName}>{brand.brand}</h2>
                </div>
              ))}
            </div>

            {searchTerm && filteredBrands.length === 0 && (
              <div className={css.noResults}>
                <p>No brands found matching "{searchTerm}"</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className={css.clearSearchButton}
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

BrandsPageComponent.propTypes = {
  inProgress: bool,
  error: propTypes.error,
};

const mapStateToProps = state => {
  // In a real app, you would fetch brands data from Redux state
  return {
    inProgress: false,
    error: null,
  };
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const BrandsPage = compose(connect(mapStateToProps), withRouter)(BrandsPageComponent);

export default BrandsPage;
