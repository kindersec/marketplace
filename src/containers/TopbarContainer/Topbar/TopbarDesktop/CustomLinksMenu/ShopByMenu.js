import React, { useState } from 'react';
import classNames from 'classnames';

import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  NamedLink,
  IconArrowHead,
} from '../../../../../components';

import css from './ShopByMenu.module.css';

/**
 * Shop By dropdown menu component
 * Shows a dropdown with navigation options for Brands, Categories, and Compatibility
 */
const ShopByMenu = ({ currentPage, intl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getCurrentPageClass = page => {
    return currentPage === page ? css.currentPage : null;
  };

  const shopByLinks = [
    {
      name: 'BrandsPage',
      text: intl.formatMessage({ id: 'TopbarDesktop.shopBy.brands' }),
      params: {},
    },
    {
      name: 'CategoriesPage',
      text: intl.formatMessage({ id: 'TopbarDesktop.shopBy.categories' }),
      params: {},
    },
    {
      name: 'CompatibilityPage',
      text: intl.formatMessage({ id: 'TopbarDesktop.shopBy.compatibility' }),
      params: {},
    },
  ];

  return (
    <Menu
      contentPlacementOffset={-12}
      contentPosition="left"
      isOpen={isOpen}
      onToggleActive={setIsOpen}
    >
      <MenuLabel className={css.shopByMenuLabel} isOpenClassName={css.shopByMenuIsOpen}>
        <span className={css.shopByMenuLabelWrapper}>
          {intl.formatMessage({ id: 'TopbarDesktop.shopBy.label' })}
          <IconArrowHead
            direction="down"
            size="small"
            rootClassName={css.arrowIcon}
            ariaLabel={intl.formatMessage({ id: 'TopbarDesktop.shopBy.label' })}
          />
        </span>
      </MenuLabel>
      <MenuContent className={css.shopByMenuContent}>
        {shopByLinks.map((linkConfig, index) => {
          return (
            <MenuItem key={`${linkConfig.name}_${index}`}>
              <NamedLink
                className={classNames(css.menuLink, getCurrentPageClass(linkConfig.name))}
                name={linkConfig.name}
                params={linkConfig.params}
              >
                <span className={css.menuItemBorder} />
                {linkConfig.text}
              </NamedLink>
            </MenuItem>
          );
        })}
      </MenuContent>
    </Menu>
  );
};

export default ShopByMenu;
