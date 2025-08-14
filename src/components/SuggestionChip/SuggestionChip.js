import React from 'react';
import css from './SuggestionChip.module.css';

export const SuggestionChip = ({ label, href, onClick }) => {
  const handleClick = e => {
    if (onClick) onClick(e);
  };
  return (
    <a
      className={css.root}
      href={href}
      onClick={handleClick}
      target="_self"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
    >
      <svg className={css.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M10.59 13.41 9.17 12l4.24-4.24 1.41 1.41L12 12l2.83 2.83-1.41 1.41z"/>
      </svg>
      <span className={css.label}>{label}</span>
    </a>
  );
};

export const SuggestionChipContainer = ({ children }) => (
  <div className={css.container}>{children}</div>
);

export default SuggestionChip;


