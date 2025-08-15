import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { IconSearch } from '../../../../../components';

import css from './MegaMenu.module.css';

/**
 * Search component for mega dropdown menus
 * Provides a beautiful and sober search bar with real-time filtering
 */
const MegaMenuSearch = ({
  placeholder = 'Search...',
  onSearch,
  className,
  rootClassName
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  }, [onSearch]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const rootClass = rootClassName || css.megaMenuSearch;
  const classes = classNames(rootClass, className);

  return (
    <div className={classes}>
      <div className={css.searchInputWrapper}>
        <IconSearch className={css.searchIcon} />
        <input
          type="text"
          className={css.searchInput}
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
        />
        {searchTerm && (
          <button
            className={css.clearButton}
            onClick={() => {
              setSearchTerm('');
              onSearch('');
            }}
            type="button"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default MegaMenuSearch;
