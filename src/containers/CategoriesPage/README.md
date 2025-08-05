# CategoriesPage

A page component that displays a grid of smart home category cards.

## Features

- Responsive grid layout of category cards
- Displays category icons, names, and descriptions
- Loading and error states
- Accessible keyboard navigation
- Hover effects and smooth transitions
- 5 columns on laptop screens (1024px - 1439px)

## Usage

The page is accessible at `/categories` route.

## Data Structure

Each category object should have:
- `category`: Category name (string)
- `description`: Category description (string)
- `icon`: Emoji icon (string)
- `url`: Category URL (string)

## Categories Included

The component includes 12 smart home categories:
- Lights 💡
- Security Cameras 📹
- Doorbell 🚪
- Robot Vacuums 🤖
- Sensors 📡
- Smart Locks 🔒
- Irrigation 💧
- Blinds & Curtains 🪟
- Kitchen Appliances 🍳
- Pet Care 🐾
- Water Management 🚰
- Climate Control 🌡️

## Styling

The component uses CSS modules with responsive design:
- Desktop: 3+ columns
- Laptop: Exactly 5 columns
- Tablet: 2+ columns
- Mobile: Single column

## Future Enhancements

- Connect to real API for dynamic category data
- Add category filtering/search functionality
- Implement category detail pages
- Add analytics tracking
- Add category-specific search functionality
