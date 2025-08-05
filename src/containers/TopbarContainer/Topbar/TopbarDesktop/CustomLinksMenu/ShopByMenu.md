# ShopByMenu Component

## Overview

The `ShopByMenu` component is a dropdown menu that provides navigation to the Brands, Categories, and Compatibility pages. It's integrated into the topbar navigation and appears between the search form and the custom links menu.

## Features

- **Dropdown Navigation**: Provides a clean dropdown interface for shop-related navigation
- **Internationalization**: Supports multiple languages (English, French, Spanish, German)
- **Active State**: Highlights the current page when on Brands, Categories, or Compatibility pages
- **Responsive Design**: Follows the existing topbar styling patterns

## Implementation Details

### Component Structure

```jsx
<Menu>
  <MenuLabel>
    <span>
      "Shop By" text + arrow icon
    </span>
  </MenuLabel>
  <MenuContent>
    <MenuItem>
      <NamedLink to="BrandsPage">Brands</NamedLink>
    </MenuItem>
    <MenuItem>
      <NamedLink to="CategoriesPage">Categories</NamedLink>
    </MenuItem>
    <MenuItem>
      <NamedLink to="CompatibilityPage">Compatibility</NamedLink>
    </MenuItem>
  </MenuContent>
</Menu>
```

### Translation Keys

The component uses the following translation keys:
- `TopbarDesktop.shopBy.label`: "Shop By" (English), "Acheter par" (French), "Comprar por" (Spanish), "Einkaufen nach" (German)
- `TopbarDesktop.shopBy.brands`: "Brands" / "Marques" / "Marcas" / "Marken"
- `TopbarDesktop.shopBy.categories`: "Categories" / "Catégories" / "Categorías" / "Kategorien"
- `TopbarDesktop.shopBy.compatibility`: "Compatibility" / "Compatibilité" / "Compatibilidad" / "Kompatibilität"

### Styling

The component uses CSS modules with styles that match the existing topbar design:
- Consistent with other topbar menu items
- Hover effects and active states
- Proper spacing and typography
- Dropdown positioning and shadows

## Usage

The component is automatically included in the `TopbarDesktop` component and requires no additional configuration. It receives the following props:

- `currentPage`: The current page name for active state detection
- `intl`: The internationalization object for translations

## Routes

The component links to the following routes:
- `/brands` - BrandsPage
- `/categories` - CategoriesPage
- `/compatibility` - CompatibilityPage

These routes are already configured in the application's route configuration.
