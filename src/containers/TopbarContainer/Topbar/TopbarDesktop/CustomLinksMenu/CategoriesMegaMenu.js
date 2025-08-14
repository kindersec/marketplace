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
import { createResourceLocatorString } from '../../../../../util/routes';

import css from './MegaMenu.module.css';

/**
 * Categories mega dropdown menu component
 * Shows a wide panel with category options that redirects to search page
 */
const CategoriesMegaMenu = ({ currentPage, intl, history, routeConfiguration }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getCurrentPageClass = page => {
    return currentPage === page ? css.currentPage : null;
  };

  // Smart home categories data
  const categories = [
    { name: 'Lights', value: 'lights', icon: '💡', description: 'Smart lighting solutions' },
    { name: 'Security Cameras', value: 'security-cameras', icon: '📹', description: 'Home security and surveillance' },
    { name: 'Doorbell', value: 'doorbell', icon: '🚪', description: 'Smart doorbell systems' },
    { name: 'Robot Vacuums', value: 'robot-vacuums', icon: '🤖', description: 'Automated cleaning devices' },
    { name: 'Sensors', value: 'sensors', icon: '📡', description: 'Environmental monitoring' },
    { name: 'Smart Locks', value: 'smart-locks', icon: '🔒', description: 'Keyless entry systems' },
    { name: 'Irrigation', value: 'irrigation', icon: '💧', description: 'Automated watering systems' },
    { name: 'Blinds & Curtains', value: 'blinds-curtains', icon: '🪟', description: 'Automated window coverings' },
    { name: 'Kitchen Appliances', value: 'kitchen-appliances', icon: '🍳', description: 'Smart kitchen devices' },
    { name: 'Pet Care', value: 'pet-care', icon: '🐾', description: 'Automated pet solutions' },
    { name: 'Water Management', value: 'water-management', icon: '🚰', description: 'Smart water systems' },
    { name: 'Climate Control', value: 'climate-control', icon: '🌡️', description: 'Smart HVAC systems' },
  ];

  const handleCategoryClick = (categoryValue) => {
    // Redirect to search page with category filter
    const searchParams = { pub_category: categoryValue };
    const to = createResourceLocatorString('SearchPage', routeConfiguration, {}, searchParams);
    history.push(to);
    setIsOpen(false);
  };

  return (
    <Menu
      contentPlacementOffset={-12}
      contentPosition="left"
      isOpen={isOpen}
      onToggleActive={setIsOpen}
    >
      <MenuLabel className={css.megaMenuLabel} isOpenClassName={css.megaMenuIsOpen}>
        <span className={css.megaMenuLabelWrapper}>
          {intl.formatMessage({ id: 'TopbarDesktop.categories.label' })}
          <IconArrowHead
            direction="down"
            size="small"
            rootClassName={css.arrowIcon}
            ariaLabel={intl.formatMessage({ id: 'TopbarDesktop.categories.label' })}
          />
        </span>
      </MenuLabel>
      <MenuContent className={css.megaMenuContent}>
        <MenuItem key="categories-header" className={css.megaMenuHeaderItem}>
          <div className={css.megaMenuHeader}>
            <h3 className={css.megaMenuTitle}>
              {intl.formatMessage({ id: 'TopbarDesktop.categories.title' })}
            </h3>
            <p className={css.megaMenuSubtitle}>
              {intl.formatMessage({ id: 'TopbarDesktop.categories.subtitle' })}
            </p>
          </div>
        </MenuItem>

        <MenuItem key="categories-grid" className={css.megaMenuGridWrapper}>
          <div className={css.megaMenuGrid}>
            {categories.map((category, index) => (
              <button
                key={`${category.value}_${index}`}
                className={css.megaMenuItem}
                onClick={() => handleCategoryClick(category.value)}
              >
                <span className={css.categoryIcon}>{category.icon}</span>
                <div className={css.categoryContent}>
                  <span className={css.categoryName}>{category.name}</span>
                  <span className={css.categoryDescription}>{category.description}</span>
                </div>
              </button>
            ))}
          </div>
        </MenuItem>

        <MenuItem key="categories-footer" className={css.megaMenuFooterItem}>
          <div className={css.megaMenuFooter}>
            <NamedLink
              className={css.viewAllLink}
              name="CategoriesPage"
            >
              {intl.formatMessage({ id: 'TopbarDesktop.categories.viewAll' })}
            </NamedLink>
          </div>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
};

export default CategoriesMegaMenu;
