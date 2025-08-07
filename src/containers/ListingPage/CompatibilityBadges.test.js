import React from 'react';
import { render, screen } from '@testing-library/react';
import CompatibilityBadges from './CompatibilityBadges';

// Mock the CSS module
jest.mock('./ListingPage.module.css', () => ({
  compatibilityBadgesContainer: 'compatibilityBadgesContainer',
  compatibilityBadgesTitle: 'compatibilityBadgesTitle',
  compatibilityBadgesGrid: 'compatibilityBadgesGrid',
  compatibilityBadge: 'compatibilityBadge',
  compatibilityBadgeIcon: 'compatibilityBadgeIcon',
  compatibilityBadgeText: 'compatibilityBadgeText',
  compatibilityBadgeImage: 'compatibilityBadgeImage',
  badgeImage: 'badgeImage',
}));

describe('CompatibilityBadges', () => {
  const mockConfig = {
    listing: {
      listingFields: [
        {
          key: 'compatibility',
          enumOptions: [
            { option: 'wifi', label: 'Wi-Fi' },
            { option: 'bluetooth', label: 'Bluetooth' },
            { option: 'zigbee', label: 'Zigbee' },
            { option: 'homekit', label: 'Apple HomeKit' },
            { option: 'alexa', label: 'Amazon Alexa' },
          ],
        },
      ],
    },
  };

  it('renders nothing when compatibility is null', () => {
    const { container } = render(
      <CompatibilityBadges compatibility={null} config={mockConfig} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when compatibility is undefined', () => {
    const { container } = render(
      <CompatibilityBadges compatibility={undefined} config={mockConfig} />
    );
    expect(container.firstChild).toBeNull();
  });

    it('renders compatibility badges for array input', () => {
    const compatibility = ['wifi', 'bluetooth', 'zigbee'];
    render(
      <CompatibilityBadges compatibility={compatibility} config={mockConfig} />
    );

    expect(screen.getByText('Compatibility')).toBeInTheDocument();
    expect(screen.getByText('WiFi')).toBeInTheDocument();
    expect(screen.getByText('Bluetooth')).toBeInTheDocument();
    expect(screen.getByText('Zigbee')).toBeInTheDocument();
  });

    it('renders compatibility badges for single string input', () => {
    const compatibility = 'wifi';
    render(
      <CompatibilityBadges compatibility={compatibility} config={mockConfig} />
    );

    expect(screen.getByText('Compatibility')).toBeInTheDocument();
    expect(screen.getByText('WiFi')).toBeInTheDocument();
  });

  it('renders compatibility badges for unknown values', () => {
    const compatibility = ['unknown_protocol'];
    render(
      <CompatibilityBadges compatibility={compatibility} config={mockConfig} />
    );

    expect(screen.getByText('Compatibility')).toBeInTheDocument();
    expect(screen.getByText('unknown_protocol')).toBeInTheDocument();
  });

  it('renders nothing when compatibility array is empty', () => {
    const { container } = render(
      <CompatibilityBadges compatibility={[]} config={mockConfig} />
    );
    expect(container.firstChild).toBeNull();
  });

        it('renders image badges for Google, Alexa, Apple HomeKit, Samsung SmartThings, and Home Assistant', () => {
    const compatibility = ['googlehome', 'alexa', 'homekit', 'smartthings', 'homeassistant'];
    render(
      <CompatibilityBadges compatibility={compatibility} config={mockConfig} />
    );

    expect(screen.getByText('Compatibility')).toBeInTheDocument();
    expect(screen.getByAltText('Google Assistant')).toBeInTheDocument();
    expect(screen.getByAltText('Amazon Alexa')).toBeInTheDocument();
    expect(screen.getByAltText('Works with Apple Home')).toBeInTheDocument();
    expect(screen.getByAltText('Works with Samsung SmartThings')).toBeInTheDocument();
    expect(screen.getByAltText('Works with Home Assistant')).toBeInTheDocument();
  });
});
