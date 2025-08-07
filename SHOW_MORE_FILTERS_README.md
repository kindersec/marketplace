# Show More Filters Implementation

## Overview

This implementation adds a "show more" functionality to filter components on the search page. By default, only 5 filter options are displayed, with a "more..." button to expand and show all available options.

## Changes Made

### 1. SelectMultipleFilter Component
- **File**: `src/containers/SearchPage/SelectMultipleFilter/SelectMultipleFilter.js`
- **Changes**:
  - Added `useState` hook to manage the "show all" state
  - Modified `GroupOfFieldCheckboxes` component to show only first 5 items by default
  - Added "more..." button that appears when there are more than 5 options
  - Button disappears after clicking to show all options

### 2. FieldSelectTree Component
- **File**: `src/components/FieldSelectTree/FieldSelectTree.js`
- **Changes**:
  - Added `useState` hook to manage the "show all" state
  - Modified `SelectOptions` component to show only first 5 items by default
  - Added "more..." button that appears when there are more than 5 options
  - Button disappears after clicking to show all options

### 3. CSS Styles
- **File**: `src/containers/SearchPage/SelectMultipleFilter/SelectMultipleFilter.module.css`
- **Changes**: Added `.showMoreButton` styles for the "more..." button

- **File**: `src/components/FieldSelectTree/FieldSelectTree.module.css`
- **Changes**: Added `.showMoreButton` styles for the "more..." button

### 4. Internationalization
Added translation keys for the "Show more" and "Show less" text in all language files:
- `src/translations/en.json`: `"SelectMultipleFilter.showMore": "Show more"`, `"SelectMultipleFilter.showLess": "Show less"`, `"FieldSelectTree.showMore": "Show more"`, and `"FieldSelectTree.showLess": "Show less"`
- `src/translations/fr.json`: `"SelectMultipleFilter.showMore": "Afficher plus"`, `"SelectMultipleFilter.showLess": "Afficher moins"`, `"FieldSelectTree.showMore": "Afficher plus"`, and `"FieldSelectTree.showLess": "Afficher moins"`
- `src/translations/de.json`: `"SelectMultipleFilter.showMore": "Mehr anzeigen"`, `"SelectMultipleFilter.showLess": "Weniger anzeigen"`, `"FieldSelectTree.showMore": "Mehr anzeigen"`, and `"FieldSelectTree.showLess": "Weniger anzeigen"`
- `src/translations/es.json`: `"SelectMultipleFilter.showMore": "Mostrar más"`, `"SelectMultipleFilter.showLess": "Mostrar menos"`, `"FieldSelectTree.showMore": "Mostrar más"`, and `"FieldSelectTree.showLess": "Mostrar menos"`

### 5. Tests
- **File**: `src/components/FieldSelectTree/FieldSelectTree.test.js`
- **Changes**: Added test case to verify the "show more" functionality works correctly

## How It Works

1. **Default Behavior**: When a filter has more than 5 options, only the first 5 are displayed initially
2. **Show More Button**: A "Show more" button appears below the options when there are more than 5 items
3. **Expand Functionality**: Clicking the "Show more" button reveals all remaining options
4. **Show Less Button**: When expanded, a "Show less" button appears to collapse the list back to 5 items
5. **Toggle Functionality**: Users can expand and collapse the list as needed

## Components Affected

- **SelectMultipleFilter**: Used for multi-select checkbox filters
- **SelectSingleFilter**: Uses FieldSelectTree for single-select dropdown filters
- **FieldSelectTree**: Used for nested category selection and other tree-structured filters

## Configuration

The number of items to show by default is set to 5 and can be modified by changing the `ITEMS_TO_SHOW` constant in both components:
- `src/containers/SearchPage/SelectMultipleFilter/SelectMultipleFilter.js` (line 23)
- `src/components/FieldSelectTree/FieldSelectTree.js` (line 108)

## Benefits

1. **Improved Performance**: Reduces initial rendering time for filters with many options
2. **Better UX**: Prevents overwhelming users with long lists of options
3. **Consistent Design**: Maintains the existing design language while adding progressive disclosure
4. **Accessibility**: The "more..." button is properly styled and accessible
5. **Internationalization**: Supports multiple languages through translation keys
