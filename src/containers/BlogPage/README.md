# BlogPage Component

A modern, responsive blog page component for the smart home marketplace website.

## Features

- **Modern Design**: Consistent with the LandingPage styling using the same color scheme and design patterns
- **Responsive Layout**: Fully responsive design that works on desktop, tablet, and mobile devices
- **Featured Post Section**: Highlights the most important blog post with a larger, more prominent display
- **Category Filtering**: Interactive category filter buttons to filter posts by topic
- **Blog Post Cards**: Clean, modern card design for individual blog posts
- **Newsletter Signup**: Email subscription section to capture leads
- **Loading States**: Proper loading and error state handling

## Structure

### Hero Section
- Large title and subtitle introducing the blog
- Consistent with LandingPage hero styling

### Featured Post Section
- Prominently displays the featured blog post
- Two-column layout with image and content
- Includes post metadata (category, date, read time, author)

### Category Filter
- Interactive buttons to filter posts by category
- Active state styling for selected category
- Responsive design that wraps on smaller screens

### Blog Posts Grid
- Responsive grid layout for blog post cards
- Hover effects and smooth transitions
- Each card includes:
  - Post image placeholder
  - Category, date, and read time
  - Post title and excerpt
  - Author information
  - "Read More" button

### Newsletter Section
- Email subscription form
- Consistent with overall design theme
- Responsive layout

## Styling

The component uses CSS modules with a consistent design system:

- **Color Variables**: Defined CSS custom properties for consistent theming
- **Typography**: Consistent font sizes and weights
- **Spacing**: Uniform padding and margins
- **Shadows**: Subtle box shadows for depth
- **Transitions**: Smooth hover effects and animations
- **Responsive**: Mobile-first responsive design

## Usage

The BlogPage is accessible at `/blog` and includes:

1. **Route Configuration**: Added to `src/routing/routeConfiguration.js`
2. **Navigation**: Updated LandingPage to navigate to `/blog` instead of `/p/blog`
3. **Component Structure**: Follows the same pattern as other page components

## Data Structure

The component includes sample blog post data with the following structure:

```javascript
{
  id: number,
  title: string,
  excerpt: string,
  author: string,
  date: string,
  readTime: string,
  category: string,
  imageUrl: string,
  featured: boolean
}
```

## Future Enhancements

- Individual blog post pages
- Real data integration
- Search functionality
- Pagination
- Social sharing buttons
- Comments system
- Related posts
- SEO optimization
