import React from 'react';
import { shallow } from 'enzyme';

import { CompatibilityPageComponent } from './CompatibilityPage';

// Mock the components that are imported
jest.mock('../../components', () => ({
  Page: ({ children }) => <div data-testid="page">{children}</div>,
  LayoutSingleColumn: ({ children }) => <div data-testid="layout">{children}</div>,
}));

jest.mock('../TopbarContainer/TopbarContainer', () => {
  return function TopbarContainer() {
    return <div data-testid="topbar">Topbar</div>;
  };
});

jest.mock('../FooterContainer/FooterContainer', () => {
  return function FooterContainer() {
    return <div data-testid="footer">Footer</div>;
  };
});

describe('CompatibilityPageComponent', () => {
  it('renders loading state correctly', () => {
    const props = {
      inProgress: true,
      error: null,
    };
    const wrapper = shallow(<CompatibilityPageComponent {...props} />);
    expect(wrapper.find('.loading')).toHaveLength(1);
  });

  it('renders error state correctly', () => {
    const props = {
      inProgress: false,
      error: { message: 'Test error' },
    };
    const wrapper = shallow(<CompatibilityPageComponent {...props} />);
    expect(wrapper.find('.error')).toHaveLength(1);
    expect(wrapper.find('.error h2').text()).toBe('Oops, something went wrong!');
    expect(wrapper.find('.error p').text()).toBe('Test error');
  });

  it('renders both sections correctly', () => {
    const props = {
      inProgress: false,
      error: null,
    };
    const wrapper = shallow(<CompatibilityPageComponent {...props} />);
    expect(wrapper.find('.section')).toHaveLength(2);
    expect(wrapper.find('.sectionTitle')).toHaveLength(2);
  });

  it('renders ecosystems section with correct title', () => {
    const props = {
      inProgress: false,
      error: null,
    };
    const wrapper = shallow(<CompatibilityPageComponent {...props} />);
    const sectionTitles = wrapper.find('.sectionTitle');
    expect(sectionTitles.first().text()).toBe('Smart Home Ecosystems');
  });

  it('renders connectivity section with correct title', () => {
    const props = {
      inProgress: false,
      error: null,
    };
    const wrapper = shallow(<CompatibilityPageComponent {...props} />);
    const sectionTitles = wrapper.find('.sectionTitle');
    expect(sectionTitles.last().text()).toBe('Network Connectivity');
  });

  it('renders correct number of ecosystem cards', () => {
    const props = {
      inProgress: false,
      error: null,
    };
    const wrapper = shallow(<CompatibilityPageComponent {...props} />);
    const sections = wrapper.find('.section');
    const firstSectionCards = sections.first().find('.card');
    expect(firstSectionCards).toHaveLength(6); // 6 ecosystems
  });

  it('renders correct number of connectivity cards', () => {
    const props = {
      inProgress: false,
      error: null,
    };
    const wrapper = shallow(<CompatibilityPageComponent {...props} />);
    const sections = wrapper.find('.section');
    const secondSectionCards = sections.last().find('.card');
    expect(secondSectionCards).toHaveLength(6); // 6 connectivity options
  });

  it('renders ecosystem card with correct content', () => {
    const props = {
      inProgress: false,
      error: null,
    };
    const wrapper = shallow(<CompatibilityPageComponent {...props} />);
    const sections = wrapper.find('.section');
    const firstCard = sections.first().find('.card').first();

    expect(firstCard.find('.cardTitle').text()).toBe('Google Home');
    expect(firstCard.find('.icon').text()).toBe('🏠');
    expect(firstCard.find('.cardDescription').text()).toBe('Google Assistant ecosystem');
  });

  it('renders connectivity card with correct content', () => {
    const props = {
      inProgress: false,
      error: null,
    };
    const wrapper = shallow(<CompatibilityPageComponent {...props} />);
    const sections = wrapper.find('.section');
    const firstCard = sections.last().find('.card').first();

    expect(firstCard.find('.cardTitle').text()).toBe('Wi-Fi');
    expect(firstCard.find('.icon').text()).toBe('📶');
    expect(firstCard.find('.cardDescription').text()).toBe('Wireless internet connectivity');
  });

  it('handles ecosystem click correctly', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const props = {
      inProgress: false,
      error: null,
    };
    const wrapper = shallow(<CompatibilityPageComponent {...props} />);
    const sections = wrapper.find('.section');
    const firstCard = sections.first().find('.card').first();

    firstCard.simulate('click');

    expect(consoleSpy).toHaveBeenCalledWith('ecosystem clicked:', {
      name: 'Google Home',
      description: 'Google Assistant ecosystem',
      icon: '🏠',
      color: '#4285F4',
      url: '/compatibility/google-home'
    });

    consoleSpy.mockRestore();
  });

  it('handles connectivity click correctly', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const props = {
      inProgress: false,
      error: null,
    };
    const wrapper = shallow(<CompatibilityPageComponent {...props} />);
    const sections = wrapper.find('.section');
    const firstCard = sections.last().find('.card').first();

    firstCard.simulate('click');

    expect(consoleSpy).toHaveBeenCalledWith('connectivity clicked:', {
      name: 'Wi-Fi',
      description: 'Wireless internet connectivity',
      icon: '📶',
      color: '#00C851',
      url: '/compatibility/wifi'
    });

    consoleSpy.mockRestore();
  });
});
