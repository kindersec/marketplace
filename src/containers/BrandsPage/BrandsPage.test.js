import React from 'react';
import { shallow } from 'enzyme';

import { BrandsPageComponent } from './BrandsPage';

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

describe('BrandsPageComponent', () => {
  it('renders loading state correctly', () => {
    const props = {
      inProgress: true,
      error: null,
    };
    const wrapper = shallow(<BrandsPageComponent {...props} />);
    expect(wrapper.find('.loading')).toHaveLength(1);
  });

  it('renders error state correctly', () => {
    const props = {
      inProgress: false,
      error: { message: 'Test error' },
    };
    const wrapper = shallow(<BrandsPageComponent {...props} />);
    expect(wrapper.find('.error')).toHaveLength(1);
    expect(wrapper.find('.error h2').text()).toBe('Oops, something went wrong!');
    expect(wrapper.find('.error p').text()).toBe('Test error');
  });

  it('renders brands grid correctly', () => {
    const props = {
      inProgress: false,
      error: null,
    };
    const wrapper = shallow(<BrandsPageComponent {...props} />);
    expect(wrapper.find('.brandsGrid')).toHaveLength(1);
    expect(wrapper.find('.brandCard')).toHaveLength(10); // 10 brands in the data
  });

  it('renders brand cards with correct content', () => {
    const props = {
      inProgress: false,
      error: null,
    };
    const wrapper = shallow(<BrandsPageComponent {...props} />);
    const firstBrandCard = wrapper.find('.brandCard').first();

    expect(firstBrandCard.find('.brandName').text()).toBe('Meross');
    expect(firstBrandCard.find('.brandImage')).toHaveLength(1);
  });

  it('handles brand click correctly', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const props = {
      inProgress: false,
      error: null,
    };
    const wrapper = shallow(<BrandsPageComponent {...props} />);
    const firstBrandCard = wrapper.find('.brandCard').first();

    firstBrandCard.simulate('click');

    expect(consoleSpy).toHaveBeenCalledWith('Brand clicked:', {
      brand: 'Meross',
      logo_url: 'https://storage.googleapis.com/domeeeeee.firebasestorage.app/brand_logos/meross.png',
      url: 'https://www.meross.com/'
    });

    consoleSpy.mockRestore();
  });
});
