import React from 'react';
import { bool } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { propTypes } from '../../util/types';
import { withRouter } from 'react-router-dom';
import { Page, LayoutSingleColumn } from '../../components';

import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import css from './CompatibilityPage.module.css';

// Ecosystems data
const ecosystemsData = [
  {
    name: "Google Home",
    description: "Google Assistant ecosystem",
    icon: "🏠",
    color: "#4285F4",
    url: "/compatibility/google-home"
  },
  {
    name: "Alexa",
    description: "Amazon Alexa ecosystem",
    icon: "🔵",
    color: "#FF9900",
    url: "/compatibility/alexa"
  },
  {
    name: "Apple HomeKit",
    description: "Apple Home ecosystem",
    icon: "🍎",
    color: "#007AFF",
    url: "/compatibility/homekit"
  },
  {
    name: "Home Assistant",
    description: "Open source home automation",
    icon: "🏡",
    color: "#41BDF5",
    url: "/compatibility/home-assistant"
  },
  {
    name: "Samsung SmartThings",
    description: "Samsung IoT platform",
    icon: "📱",
    color: "#1428A0",
    url: "/compatibility/smartthings"
  },
  {
    name: "Hubitat",
    description: "Local home automation hub",
    icon: "🏢",
    color: "#FF6B35",
    url: "/compatibility/hubitat"
  }
];

// Network connectivity data
const connectivityData = [
  {
    name: "Wi-Fi",
    description: "Wireless internet connectivity",
    icon: "📶",
    color: "#00C851",
    url: "/compatibility/wifi"
  },
  {
    name: "Zigbee",
    description: "Low-power wireless mesh network",
    icon: "🕷️",
    color: "#FF6B6B",
    url: "/compatibility/zigbee"
  },
  {
    name: "Z-Wave",
    description: "Wireless mesh network protocol",
    icon: "🌊",
    color: "#4ECDC4",
    url: "/compatibility/zwave"
  },
  {
    name: "Matter",
    description: "Unified smart home standard",
    icon: "🔗",
    color: "#45B7D1",
    url: "/compatibility/matter"
  },
  {
    name: "Bluetooth",
    description: "Short-range wireless technology",
    icon: "📡",
    color: "#2E86AB",
    url: "/compatibility/bluetooth"
  },
  {
    name: "Thread",
    description: "IPv6-based mesh network",
    icon: "🧵",
    color: "#A23B72",
    url: "/compatibility/thread"
  },
  {
    name: "Cellular/LTE",
    description: "Mobile network connectivity",
    icon: "📱",
    color: "#9C27B0",
    url: "/compatibility/cellular-lte"
  },
  {
    name: "RF",
    description: "Radio frequency communication",
    icon: "📻",
    color: "#FF9800",
    url: "/compatibility/rf"
  }
];

export const CompatibilityPageComponent = props => {
  const { inProgress, error } = props;

  if (inProgress) {
    return (
      <Page
        title="Smart Home Compatibility | Domee"
        description="See which smart home devices work with Google Home, Alexa, HomeKit, SmartThings, Matter, Zigbee, Z-Wave, and more."
        scrollingDisabled={false}
      >
        <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
          <div className={css.root}>
            <div className={css.loading}>Loading compatibility information...</div>
          </div>
        </LayoutSingleColumn>
      </Page>
    );
  }

  if (error) {
    return (
      <Page
        title="Smart Home Compatibility | Domee"
        description="See which smart home devices work with Google Home, Alexa, HomeKit, SmartThings, Matter, Zigbee, Z-Wave, and more."
        scrollingDisabled={false}
      >
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

  const handleItemClick = (item, type) => {
    console.log(`${type} clicked:`, item);
  };

  return (
    <Page
      title="Smart Home Compatibility | Domee"
      description="Explore ecosystems and connectivity protocols like Matter, Zigbee, Z‑Wave, and Thread to ensure your smart devices work together."
      scrollingDisabled={false}
    >
      <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
        <div className={css.root}>
          <div className={css.container}>
            <h1 className={css.title}>Smart Home Compatibility</h1>
            <p className={css.subtitle}>Explore ecosystems and connectivity options for your smart home</p>

            {/* Ecosystems Section */}
            <section className={css.section}>
              <h2 className={css.sectionTitle}>Smart Home Ecosystems</h2>
              <p className={css.sectionDescription}>
                Choose your preferred smart home ecosystem to control and manage your devices
              </p>
              <div className={css.grid}>
                {ecosystemsData.map((ecosystem, index) => (
                  <div
                    key={index}
                    className={css.card}
                    onClick={() => handleItemClick(ecosystem, 'ecosystem')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleItemClick(ecosystem, 'ecosystem');
                      }
                    }}
                  >
                    <div className={css.iconContainer} style={{ backgroundColor: ecosystem.color + '20' }}>
                      <span className={css.icon}>{ecosystem.icon}</span>
                    </div>
                    <h3 className={css.cardTitle}>{ecosystem.name}</h3>
                    <p className={css.cardDescription}>{ecosystem.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Connectivity Section */}
            <section className={css.section}>
              <h2 className={css.sectionTitle}>Network Connectivity</h2>
              <p className={css.sectionDescription}>
                Understand different wireless protocols and connectivity options
              </p>
              <div className={css.grid}>
                {connectivityData.map((connectivity, index) => (
                  <div
                    key={index}
                    className={css.card}
                    onClick={() => handleItemClick(connectivity, 'connectivity')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleItemClick(connectivity, 'connectivity');
                      }
                    }}
                  >
                    <div className={css.iconContainer} style={{ backgroundColor: connectivity.color + '20' }}>
                      <span className={css.icon}>{connectivity.icon}</span>
                    </div>
                    <h3 className={css.cardTitle}>{connectivity.name}</h3>
                    <p className={css.cardDescription}>{connectivity.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

CompatibilityPageComponent.propTypes = {
  inProgress: bool,
  error: propTypes.error,
};

const mapStateToProps = state => {
  // In a real app, you would fetch compatibility data from Redux state
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
const CompatibilityPage = compose(connect(mapStateToProps), withRouter)(CompatibilityPageComponent);

export default CompatibilityPage;
