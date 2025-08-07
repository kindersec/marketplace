import React from 'react';
import classNames from 'classnames';
import css from './ListingPage.module.css';
import smartThingsBadge from '../../assets/Works with Samsung SmartThings_logo-07.png';
import homeAssistantBadge from '../../assets/wwha-blue.svg';

const CompatibilityBadges = ({ compatibility, config }) => {
  if (!compatibility) {
    return null;
  }

  // Helper function to get badge data for compatibility items
  const getBadgeData = (item) => {
    const badges = {
      'googlehome': {
        type: 'image',
        src: 'https://lh3.googleusercontent.com/4XhCiaAbMUlFg6fSSGziw79ndy-adRnBzdTC1MzqJFWTxfRJQRUicELTN3X6KyXObCc7JjQZfK79FGvZASg_YXPrCah1UfDxhe-1c0A_v-or0xq05JsW=w2048-v1-rw-e360',
        alt: 'Google Assistant',
        width: 80,
        height: 32
      },
      'alexa': {
        type: 'image',
        src: 'https://ds6yc8t7pnx74.cloudfront.net/content/dam/alexa/alexa-brand-guidelines-2021-refresh-/Screen%20Shot%202021-03-03%20at%202.24.33%20PM.png/_jcr_content/renditions/cq5dam.web.1280.1280.webp',
        alt: 'Amazon Alexa',
        width: 80,
        height: 32
      },
      'homekit': {
        type: 'image',
        src: 'https://developer.apple.com/apple-home/works-with-apple-home/images/works-with-apple-home.svg',
        alt: 'Works with Apple Home',
        width: 80,
        height: 32
      },
      'smartthings': {
        type: 'image',
        src: smartThingsBadge,
        alt: 'Works with Samsung SmartThings',
        width: 80,
        height: 32
      },
      'homeassistant': {
        type: 'image',
        src: homeAssistantBadge,
        alt: 'Works with Home Assistant',
        width: 80,
        height: 32
      },
      'wifi': {
        type: 'icon',
        icon: '📶',
        label: 'WiFi'
      },
      'bluetooth': {
        type: 'icon',
        icon: '📡',
        label: 'Bluetooth'
      },
      'zigbee': {
        type: 'icon',
        icon: '🔗',
        label: 'Zigbee'
      },
      'z-wave': {
        type: 'icon',
        icon: '🌊',
        label: 'Z-Wave'
      },
      'thread': {
        type: 'icon',
        icon: '🧵',
        label: 'Thread'
      },
      'matter': {
        type: 'icon',
        icon: '⚡',
        label: 'Matter'
      },
      'siri': {
        type: 'icon',
        icon: '💬',
        label: 'Siri'
      },
      'ifttt': {
        type: 'icon',
        icon: '🔗',
        label: 'IFTTT'
      },
      'webhook': {
        type: 'icon',
        icon: '🌐',
        label: 'Webhook'
      },
      'mqtt': {
        type: 'icon',
        icon: '📨',
        label: 'MQTT'
      },
      'http': {
        type: 'icon',
        icon: '🌍',
        label: 'HTTP'
      },
      'coap': {
        type: 'icon',
        icon: '📦',
        label: 'CoAP'
      },
      'lora': {
        type: 'icon',
        icon: '📡',
        label: 'LoRa'
      },
      'cellular': {
        type: 'icon',
        icon: '📞',
        label: 'Cellular'
      },
      'ethernet': {
        type: 'icon',
        icon: '🔌',
        label: 'Ethernet'
      }
    };
    return badges[item.toLowerCase()] || {
      type: 'icon',
      icon: '🔧',
      label: item
    };
  };

  // Helper function to get display value from config
  const getDisplayValue = (fieldKey, value) => {
    const fieldConfig = config.listing.listingFields?.find(field => field.key === fieldKey);
    if (!fieldConfig || !fieldConfig.enumOptions) return value;

    if (Array.isArray(value)) {
      return value.map(v => {
        const option = fieldConfig.enumOptions.find(opt => opt.option === v);
        return option ? option.label : v;
      });
    } else {
      const option = fieldConfig.enumOptions.find(opt => opt.option === value);
      return option ? [option.label] : [value];
    }
  };

  // Get compatibility values as an array
  const compatibilityValues = Array.isArray(compatibility)
    ? compatibility
    : getDisplayValue('compatibility', compatibility);

  if (!compatibilityValues || compatibilityValues.length === 0) {
    return null;
  }

  return (
    <div className={css.compatibilityBadgesContainer}>
      <div className={css.compatibilityBadgesGrid}>
        {compatibilityValues.map((item, index) => {
          const badgeData = getBadgeData(item);

          if (badgeData.type === 'image') {
            return (
              <div key={index} className={css.compatibilityBadgeImage}>
                <img
                  src={badgeData.src}
                  alt={badgeData.alt}
                  width={badgeData.width}
                  height={badgeData.height}
                  className={css.badgeImage}
                />
              </div>
            );
          } else {
            return (
              <div key={index} className={css.compatibilityBadge}>
                <span className={css.compatibilityBadgeIcon}>{badgeData.icon}</span>
                <span className={css.compatibilityBadgeText}>{badgeData.label}</span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default CompatibilityBadges;
