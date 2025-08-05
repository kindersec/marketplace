import React from 'react';

import css from './IconProfile.module.css';

/**
 * Profile icon.
 *
 * @component
 * @param {Object} props
 * @param {string?} props.className add more style rules in addition to components own css.root
 * @returns {JSX.Element} SVG icon
 */
const IconProfile = props => {
  const { className } = props;
  return (
    <svg
      className={className}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g className={css.strokeMarketplaceColor} transform="translate(-2.000000, -2.000000)">
          <g transform="translate(2.000000, 2.000000)">
            <path
              d="M20,21 L20,19 C20,17.9391 19.5786,16.9217 18.8284,16.1716 C18.0783,15.4214 17.0609,15 16,15 L8,15 C6.9391,15 5.9217,15.4214 5.1716,16.1716 C4.4214,16.9217 4,17.9391 4,19 L4,21"
              strokeWidth="2"
            />
            <circle cx="12" cy="7" r="4" strokeWidth="2" />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default IconProfile;
