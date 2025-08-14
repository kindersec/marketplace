import React, { useEffect } from 'react';
import classNames from 'classnames';
import css from './Toast.module.css';

const Toast = ({ visible, message, link, duration = 6000, onClose }) => {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(t);
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <div className={classNames(css.root, { [css.hide]: !visible })} role="status" aria-live="polite">
      <span>{message}</span>
      {link?.url ? (
        <a className={css.link} href={link.url} target="_self" rel="noopener noreferrer">
          {link.title || 'View'}
        </a>
      ) : null}
    </div>
  );
};

export default Toast;


