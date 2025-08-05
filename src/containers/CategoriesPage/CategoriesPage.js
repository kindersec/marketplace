import React from 'react';
import { bool } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { propTypes } from '../../util/types';
import { withRouter } from 'react-router-dom';
import { Page, LayoutSingleColumn } from '../../components';

import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import css from './CategoriesPage.module.css';

// Smart home categories data
const categoriesData = [
  {
    category: "Lights",
    description: "Smart lighting solutions",
    icon: "💡",
    url: "/s/lights"
  },
  {
    category: "Security Cameras",
    description: "Home security and surveillance",
    icon: "📹",
    url: "/s/security-cameras"
  },
  {
    category: "Doorbell",
    description: "Smart doorbell systems",
    icon: "🚪",
    url: "/s/doorbell"
  },
  {
    category: "Robot Vacuums",
    description: "Automated cleaning devices",
    icon: "🤖",
    url: "/s/robot-vacuums"
  },
  {
    category: "Sensors",
    description: "Environmental monitoring",
    icon: "📡",
    url: "/s/sensors"
  },
  {
    category: "Smart Locks",
    description: "Keyless entry systems",
    icon: "🔒",
    url: "/s/smart-locks"
  },
  {
    category: "Irrigation",
    description: "Automated watering systems",
    icon: "💧",
    url: "/s/irrigation"
  },
  {
    category: "Blinds & Curtains",
    description: "Automated window coverings",
    icon: "🪟",
    url: "/s/blinds-curtains"
  },
  {
    category: "Kitchen Appliances",
    description: "Smart kitchen devices",
    icon: "🍳",
    url: "/s/kitchen-appliances"
  },
  {
    category: "Pet Care",
    description: "Automated pet solutions",
    icon: "🐾",
    url: "/s/pet-care"
  },
  {
    category: "Water Management",
    description: "Smart water systems",
    icon: "🚰",
    url: "/s/water-management"
  },
  {
    category: "Climate Control",
    description: "Smart HVAC systems",
    icon: "🌡️",
    url: "/s/climate-control"
  }
];

export const CategoriesPageComponent = props => {
  const { inProgress, error } = props;
  const [searchTerm, setSearchTerm] = React.useState('');

  if (inProgress) {
    return (
      <Page title="Smart Home Categories" scrollingDisabled={false}>
        <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
          <div className={css.root}>
            <div className={css.loading}>Loading categories...</div>
          </div>
        </LayoutSingleColumn>
      </Page>
    );
  }

  if (error) {
    return (
      <Page title="Smart Home Categories" scrollingDisabled={false}>
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

  const handleCategoryClick = (category) => {
    // In a real app, you might navigate to a category-specific page
    // or open the category's search results
    console.log('Category clicked:', category);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCategories = categoriesData.filter(category =>
    category.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Page title="Smart Home Categories" scrollingDisabled={false}>
      <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
        <div className={css.root}>
          <div className={css.container}>
            <h1 className={css.title}>Smart Home Categories</h1>
            <p className={css.subtitle}>Explore different types of smart home devices</p>

            {/* Search Bar */}
            <div className={css.searchSection}>
              <div className={css.searchContainer}>
                <input
                  type="text"
                  placeholder="Search categories by name or description..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className={css.searchInput}
                />
                <div className={css.searchIcon}>🔍</div>
              </div>
              {searchTerm && (
                <div className={css.searchResults}>
                  Found {filteredCategories.length} categor{filteredCategories.length !== 1 ? 'ies' : 'y'}
                </div>
              )}
            </div>

            <div className={css.categoriesGrid}>
              {filteredCategories.map((category, index) => (
                <div
                  key={index}
                  className={css.categoryCard}
                  onClick={() => handleCategoryClick(category)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCategoryClick(category);
                    }
                  }}
                >
                  <div className={css.categoryIconContainer}>
                    <span className={css.categoryIcon}>{category.icon}</span>
                  </div>
                  <h2 className={css.categoryName}>{category.category}</h2>
                  <p className={css.categoryDescription}>{category.description}</p>
                </div>
              ))}
            </div>

            {searchTerm && filteredCategories.length === 0 && (
              <div className={css.noResults}>
                <p>No categories found matching "{searchTerm}"</p>
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

CategoriesPageComponent.propTypes = {
  inProgress: bool,
  error: propTypes.error,
};

const mapStateToProps = state => {
  // In a real app, you would fetch categories data from Redux state
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
const CategoriesPage = compose(connect(mapStateToProps), withRouter)(CategoriesPageComponent);

export default CategoriesPage;
