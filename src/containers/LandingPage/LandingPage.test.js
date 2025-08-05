import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import { LandingPageComponent } from './LandingPage';

const { waitFor } = testingLibrary;

describe('LandingPage', () => {
  it('renders loading state', () => {
    const { getByText } = render(
      <LandingPageComponent inProgress={true} error={null} />
    );

    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const error = new Error('Test error');
    const { getByText } = render(
      <LandingPageComponent inProgress={false} error={error} />
    );

    expect(getByText('Oops, something went wrong!')).toBeInTheDocument();
    expect(getByText('Test error')).toBeInTheDocument();
  });

  it('renders the modern landing page content', async () => {
    const { getByText, getAllByText } = render(
      <LandingPageComponent inProgress={false} error={null} />
    );

    await waitFor(() => {
      // Hero section
      expect(getByText('Transform Your Home with Smart Technology')).toBeInTheDocument();
      expect(getByText('Discover the latest smart home devices from top brands. Control, automate, and enhance your living space with cutting-edge technology.')).toBeInTheDocument();
      expect(getByText('Explore Smart Devices')).toBeInTheDocument();
      expect(getByText('Learn More')).toBeInTheDocument();

      // Features section
      expect(getByText('Why Choose Smart Home?')).toBeInTheDocument();
      expect(getByText('Smart Home Control')).toBeInTheDocument();
      expect(getByText('Enhanced Security')).toBeInTheDocument();
      expect(getByText('Energy Efficiency')).toBeInTheDocument();
      expect(getByText('Voice Control')).toBeInTheDocument();

      // Categories section
      expect(getByText('Popular Categories')).toBeInTheDocument();
      expect(getByText('Smart Lighting')).toBeInTheDocument();
      expect(getByText('Security Cameras')).toBeInTheDocument();
      expect(getByText('Smart Thermostats')).toBeInTheDocument();
      expect(getByText('Smart Locks')).toBeInTheDocument();
      expect(getByText('Robot Vacuums')).toBeInTheDocument();
      expect(getByText('Smart Speakers')).toBeInTheDocument();
      expect(getByText('Doorbells')).toBeInTheDocument();
      expect(getByText('Smart Blinds')).toBeInTheDocument();
      expect(getByText('Robot Lawn Mower')).toBeInTheDocument();
      expect(getByText('Air Purifier')).toBeInTheDocument();

      // Testimonials section
      expect(getByText('What Our Customers Say')).toBeInTheDocument();
      expect(getByText('Sarah Johnson')).toBeInTheDocument();
      expect(getByText('Mike Chen')).toBeInTheDocument();
      expect(getByText('Emily Rodriguez')).toBeInTheDocument();

      // CTA section
      expect(getByText('Ready to Get Started?')).toBeInTheDocument();
      expect(getByText('Start Shopping Now')).toBeInTheDocument();
    });
  });

  it('handles category clicks', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const { getByText } = render(
      <LandingPageComponent inProgress={false} error={null} />
    );

    await waitFor(() => {
      const smartLightingCard = getByText('Smart Lighting').closest('div[role="button"]');
      smartLightingCard.click();

      expect(consoleSpy).toHaveBeenCalledWith('Category clicked:', {
        name: 'Smart Lighting',
        icon: '💡',
        count: '500+ Products'
      });
    });

    consoleSpy.mockRestore();
  });

  it('handles CTA button clicks', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const { getByText } = render(
      <LandingPageComponent inProgress={false} error={null} />
    );

    await waitFor(() => {
      const primaryButton = getByText('Explore Smart Devices');
      primaryButton.click();

      expect(consoleSpy).toHaveBeenCalledWith('Primary CTA clicked');
    });

    consoleSpy.mockRestore();
  });
});
