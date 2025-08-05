# ArticlesPage

A static page component that serves as an index for all smart home articles. This page displays articles in a responsive grid layout with cards showing article metadata, excerpts, and navigation links.

## Features

- **Responsive Grid Layout**: Articles are displayed in a 2-column grid on desktop and single column on mobile
- **Article Cards**: Each article is displayed in a card with:
  - Featured image placeholder
  - Category badge
  - Publication date
  - Article title with link
  - Article excerpt
  - Tags
- **Navigation**: Links to individual article pages
- **SEO Optimized**: Includes proper meta tags and schema markup

## Usage

The ArticlesPage component is designed to be used as a standalone page that lists all available articles. It imports article data from a static array and renders them in an attractive grid layout.

## Styling

The component uses CSS modules with:
- Modern gradient background
- Card-based layout with hover effects
- Responsive design for mobile and desktop
- Consistent typography and spacing
- Marketplace color theming

## Article Data Structure

Each article in the articles array should have:
- `id`: Unique identifier for routing
- `title`: Article title
- `excerpt`: Short description
- `date`: Publication date
- `author`: Author name
- `category`: Article category
- `tags`: Array of tags
- `image`: Featured image URL

## Related Components

- `SmartBathroomGadgetsPage`: Individual article page
- `UnderratedSmartDevicesPage`: Individual article page
- `NamedLink`: For navigation between pages
