import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { Logo } from './Logo';

// Mock the configuration context
const mockConfig = {
  branding: {
    logoImageDesktop: 'test-logo.png',
    logoImageMobile: 'test-logo.png',
    logoSettings: { format: 'image', height: 36 },
    logoSubtitle: 'Smart Home Solutions',
  },
  marketplaceName: 'Test Marketplace',
};

// Mock the useConfiguration hook
jest.mock('../../context/configurationContext', () => ({
  useConfiguration: () => mockConfig,
}));

const renderWithIntl = (component) => {
  return render(
    <IntlProvider locale="en">
      {component}
    </IntlProvider>
  );
};

describe('Logo', () => {
  it('renders logo with subtitle from config', () => {
    renderWithIntl(<Logo layout="desktop" />);

    const logo = screen.getByAltText('Test Marketplace');
    const subtitle = screen.getByText('Smart Home Solutions');

    expect(logo).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it('renders logo with custom subtitle prop', () => {
    renderWithIntl(<Logo layout="desktop" subtitle="Custom Subtitle" />);

    const logo = screen.getByAltText('Test Marketplace');
    const subtitle = screen.getByText('Custom Subtitle');

    expect(logo).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it('renders logo without subtitle when subtitle is empty', () => {
    renderWithIntl(<Logo layout="desktop" subtitle="" />);

    const logo = screen.getByAltText('Test Marketplace');
    const subtitle = screen.queryByText('Smart Home Solutions');

    expect(logo).toBeInTheDocument();
    expect(subtitle).not.toBeInTheDocument();
  });

  it('renders logo without subtitle when subtitle is null', () => {
    renderWithIntl(<Logo layout="desktop" subtitle={null} />);

    const logo = screen.getByAltText('Test Marketplace');
    const subtitle = screen.queryByText('Smart Home Solutions');

    expect(logo).toBeInTheDocument();
    expect(subtitle).not.toBeInTheDocument();
  });

  it('renders logo without subtitle when subtitle is undefined', () => {
    renderWithIntl(<Logo layout="desktop" subtitle={undefined} />);

    const logo = screen.getByAltText('Test Marketplace');
    const subtitle = screen.queryByText('Smart Home Solutions');

    expect(logo).toBeInTheDocument();
    expect(subtitle).not.toBeInTheDocument();
  });
});
