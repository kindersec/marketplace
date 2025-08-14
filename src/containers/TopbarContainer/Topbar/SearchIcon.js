import React from 'react';
import classNames from 'classnames';

import css from './Topbar.module.css';

/**
 * Search icon (magnifier icon)
 *
 * @component
 * @param {Object} props
 * @param {string?} props.className add more style rules in addition to components own css.root
 * @param {string?} props.rootClassName overwrite components own css.root
 * @returns {JSX.Element} search icon
 */
const SearchIcon = props => {
  const { className, rootClassName, ariaLabel } = props;
  const classes = classNames(rootClassName || css.rootSearchIcon, className);

  return (
    <svg
      className={classes}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
    >
      <g
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13.5 13.5l4.5 4.5" />
        <circle cx="8" cy="8" r="6" />
      </g>
    </svg>
  );
};

export default SearchIcon;
