# Technical Specifications Implementation

## Overview

This implementation modifies the listing page to extract and display technical specifications from the listing's `publicData.tech_specs` attribute instead of using hardcoded placeholder values.

## Changes Made

### 1. Modified `src/containers/ListingPage/ListingPageCarousel.js`

- **Location**: Lines 168-220 (specifications table section)
- **Changes**:
  - Replaced hardcoded specifications table with dynamic content
  - Added JSON validation for `tech_specs` data
  - Supports both object and string JSON formats
  - Provides fallback message when no valid specs are available

### 2. Added CSS Styles in `src/containers/ListingPage/ListingPage.module.css`

- **Added**: `.noSpecsMessage` class for styling the fallback message
- **Features**:
  - Centered text alignment
  - Responsive padding and font sizes
  - Consistent with existing design system

### 3. Added Tests in `src/containers/ListingPage/ListingPage.test.js`

- **Added**: Three test cases for technical specifications functionality
- **Tests**:
  - Valid JSON object handling
  - JSON string parsing
  - Graceful handling of missing data

## How It Works

### Data Extraction
The component extracts `tech_specs` from the listing's `publicData`:

```javascript
const techSpecs = publicData.tech_specs;
```

### JSON Validation
The implementation handles multiple data formats:

1. **Object format**: Direct JavaScript object
2. **String format**: JSON string that needs parsing
3. **Invalid/missing**: Graceful fallback

### Display Logic
- If valid specs exist: Display as table with key-value pairs
- If no valid specs: Show fallback message
- Invalid JSON: Logs warning and shows fallback

## Usage

### For Listings with Technical Specifications

Add `tech_specs` to the listing's `publicData`:

```javascript
// Object format (recommended)
publicData: {
  tech_specs: {
    'Dimensions': '120mm x 80mm x 25mm',
    'Weight': '150g',
    'Power Supply': '5V DC, 2A',
    'Connectivity': 'WiFi 802.11 b/g/n, Bluetooth 4.2'
  }
}

// String format (also supported)
publicData: {
  tech_specs: JSON.stringify({
    'Dimensions': '120mm x 80mm x 25mm',
    'Weight': '150g'
  })
}
```

### For Listings without Technical Specifications

The system will automatically display a fallback message: "No technical specifications available for this product."

## Benefits

1. **Dynamic Content**: Specifications are now pulled from actual listing data
2. **Flexible Format**: Supports both object and string JSON formats
3. **Error Handling**: Graceful fallback for invalid or missing data
4. **Backward Compatible**: Existing listings without specs show appropriate message
5. **Maintainable**: Easy to update specifications without code changes

## Testing

The implementation includes comprehensive tests covering:
- Valid JSON object handling
- JSON string parsing
- Missing data scenarios
- Error handling

Run tests with: `npm test -- --testPathPattern=ListingPage.test.js`
