import React from 'react';
import classNames from 'classnames';

import css from './IconCart.module.css';

/**
 * Cart icon component
 *
 * @component
 * @param {Object} props
 * @param {string?} props.className add more style rules in addition to components own css.root
 * @param {string?} props.rootClassName overwrite components own css.root
 * @param {string?} props.color color of the icon
 * @param {string?} props.size size of the icon
 * @returns {JSX.Element} cart icon
 */
const IconCart = props => {
  const { className, rootClassName, color, size = 'medium' } = props;
  const classes = classNames(rootClassName || css.root, className, css[size]);

  return (
    <svg
      className={classes}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Shopping cart"
      style={{ color: color }}
    >
      <g
        fill="currentColor"
        fillRule="evenodd"
        stroke="none"
        strokeWidth="1"
      >
        {/* Main cart body */}
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
      </g>
    </svg>
  );
};

export default IconCart;
