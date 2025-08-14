import React from 'react';
import { FormattedMessage } from '../../../../util/reactIntl';
import { NamedLink } from '../../../../components';
import css from './TopbarSearchForm.module.css';

// Trend icon component
const TrendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 7V13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrendySearchesMegaMenu = ({ isVisible, onSearchSelect }) => {
  if (!isVisible) return null;

    // Simple list of trendy searches
  const trendySearches = [
    'Philips Hue',
    'Ring Doorbell',
    'Smart Plugs',
    'Amazon Echo',
    'Security Cameras',
    'Smart Bulbs',
    'Google Home',
    'Arlo Cameras'
  ];

  const handleSearchClick = (searchTerm) => {
    if (onSearchSelect) {
      onSearchSelect(searchTerm);
    }
  };

    return (
    <div className={css.trendySearchesMegaMenu}>
      <div className={css.trendySearchesHeader}>
        <h3 className={css.trendySearchesTitle}>
          <FormattedMessage id="TopbarSearchForm.trendySearches.title" defaultMessage="Trendy Searches" />
        </h3>
      </div>

      <div className={css.trendySearchesList}>
        {trendySearches.map((searchTerm, index) => (
          <button
            key={index}
            className={css.trendySearchItem}
            onClick={() => handleSearchClick(searchTerm)}
          >
            <div className={css.trendySearchContent}>
              <TrendIcon />
              <span className={css.trendySearchTerm}>{searchTerm}</span>
            </div>
            <span className={css.trendySearchArrow}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrendySearchesMegaMenu;
