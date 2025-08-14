import React from 'react';
import classNames from 'classnames';

import css from './Topbar.module.css';

/**
 * Menu icon (hamburger icon)
 *
 * @component
 * @param {Object} props
 * @param {string?} props.className add more style rules in addition to components own css.root
 * @param {string?} props.rootClassName overwrite components own css.root
 * @returns {JSX.Element} menu icon
 */
const MenuIcon = props => {
  const { className, rootClassName, ariaLabel } = props;
  const classes = classNames(rootClassName || css.rootMenuIcon, className);

  return (
    <svg
      className={classes}
      width="20"
      height="16"
      viewBox="0 0 20 16"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
    >
      <g fillRule="evenodd">
        <rect width="20" height="2" rx="1" />
        <rect y="7" width="20" height="2" rx="1" />
        <rect y="14" width="20" height="2" rx="1" />
      </g>
    </svg>
  );
};

export default MenuIcon;
