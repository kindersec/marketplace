import React from 'react';
import { shallow } from 'enzyme';

import { CategoriesPageComponent } from './CategoriesPage';

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

describe('CategoriesPageComponent', () => {
  it('renders loading state correctly', () => {
    const props = {
      inProgress: true,
      error: null,
    };
    const wrapper = shallow(<CategoriesPageComponent {...props} />);
    expect(wrapper.find('.loading')).toHaveLength(1);
  });

  it('renders error state correctly', () => {
    const props = {
      inProgress: false,
      error: { message: 'Test error' },
    };
    const wrapper = shallow(<CategoriesPageComponent {...props} />);
    expect(wrapper.find('.error')).toHaveLength(1);
    expect(wrapper.find('.error h2').text()).toBe('Oops, something went wrong!');
    expect(wrapper.find('.error p').text()).toBe('Test error');
  });

  it('renders categories grid correctly', () => {
    const props = {
      inProgress: false,
      error: null,
    };
    const wrapper = shallow(<CategoriesPageComponent {...props} />);
    expect(wrapper.find('.categoriesGrid')).toHaveLength(1);
    expect(wrapper.find('.categoryCard')).toHaveLength(12); // 12 categories in the data
  });

  it('renders category cards with correct content', () => {
    const props = {
      inProgress: false,
      error: null,
    };
    const wrapper = shallow(<CategoriesPageComponent {...props} />);
    const firstCategoryCard = wrapper.find('.categoryCard').first();

    expect(firstCategoryCard.find('.categoryName').text()).toBe('Lights');
    expect(firstCategoryCard.find('.categoryIcon').text()).toBe('💡');
    expect(firstCategoryCard.find('.categoryDescription').text()).toBe('Smart lighting solutions');
  });

  it('handles category click correctly', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const props = {
      inProgress: false,
      error: null,
    };
    const wrapper = shallow(<CategoriesPageComponent {...props} />);
    const firstCategoryCard = wrapper.find('.categoryCard').first();

    firstCategoryCard.simulate('click');

    expect(consoleSpy).toHaveBeenCalledWith('Category clicked:', {
      category: 'Lights',
      description: 'Smart lighting solutions',
      icon: '💡',
      url: '/s/lights'
    });

    consoleSpy.mockRestore();
  });
});
