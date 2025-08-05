# BrandsPage

A page component that displays a grid of smart home brand cards.

## Features

- Responsive grid layout of brand cards
- Displays brand logos and names
- Fallback placeholder for brands without logos
- Loading and error states
- Accessible keyboard navigation
- Hover effects and smooth transitions

## Usage

The page is accessible at `/brands` route.

## Data Structure

Each brand object should have:
- `brand`: Brand name (string)
- `logo_url`: URL to brand logo (string or null)
- `url`: Brand website URL (string)

## Styling

The component uses CSS modules with responsive design:
- Desktop: 3+ columns
- Tablet: 2+ columns
- Mobile: Single column

## Future Enhancements

- Connect to real API for dynamic brand data
- Add brand filtering/search functionality
- Implement brand detail pages
- Add analytics tracking
