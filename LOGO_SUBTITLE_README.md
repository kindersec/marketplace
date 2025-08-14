# Logo Subtitle Feature

This feature adds an elegant subtitle below the logo in the navbar, enhancing the branding and user experience of your website.

## Features

- **Elegant Design**: Subtitle appears below the logo with beautiful typography
- **Responsive**: Adapts to different screen sizes with appropriate font sizes
- **Configurable**: Easy to customize through configuration files
- **Automatic**: Works with both desktop and mobile layouts
- **Accessible**: Proper semantic structure and ARIA support

## Configuration

### Option 1: Branding Configuration File

Edit `src/config/configBranding.js` and modify the `logoSubtitle` variable:

```javascript
// Subtitle text that appears below the logo in the navbar
export const logoSubtitle = 'Your Custom Subtitle Here';
```

### Option 2: Environment Variable

Add this to your `.env` file:

```bash
REACT_APP_LOGO_SUBTITLE=Your Custom Subtitle Here
```

### Option 3: Hosted Asset Override

If you're using Sharetribe Console, you can override the subtitle through the branding asset configuration.

## Customization

### Styling

The subtitle styling can be customized in `src/components/Logo/Logo.module.css`:

```css
.subtitle {
  font-size: 11px;
  line-height: 1.2;
  color: var(--colorGrey600);
  font-weight: var(--fontWeightNormal);
  margin-top: 2px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}
```

### Responsive Breakpoints

- **Mobile**: 11px font size, 2px top margin
- **Medium screens**: 12px font size, 3px top margin
- **Large screens**: 13px font size, 4px top margin

## Usage Examples

### Basic Usage

The subtitle will automatically appear when you have a logo configured:

```jsx
<LinkedLogo layout="desktop" />
```

### Custom Subtitle

You can also pass a custom subtitle as a prop:

```jsx
<LinkedLogo layout="desktop" subtitle="Custom Subtitle" />
```

### No Subtitle

To hide the subtitle, set it to an empty string or null:

```jsx
<LinkedLogo layout="desktop" subtitle="" />
```

## Technical Details

### Components Updated

- `src/components/Logo/Logo.js` - Main logo component with subtitle support
- `src/components/Logo/LinkedLogo.js` - Clickable logo wrapper
- `src/components/Logo/Logo.module.css` - Styling for subtitle
- `src/config/configBranding.js` - Default subtitle configuration
- `src/util/configHelpers.js` - Configuration merging logic

### Props

The `Logo` component now accepts these additional props:

- `subtitle` (string, optional): Custom subtitle text to display below the logo

### State Management

The subtitle state is managed through:
- Configuration context for default values
- Component props for custom overrides
- CSS modules for styling

## Browser Support

The subtitle feature works in all modern browsers and gracefully degrades in older browsers. The CSS uses:

- Flexbox for layout
- CSS custom properties for theming
- Media queries for responsiveness
- CSS transitions for smooth animations

## Accessibility

- The subtitle is semantically structured as part of the logo
- Proper contrast ratios for readability
- Responsive text sizing for different devices
- Screen reader friendly markup

## Testing

Run the Logo component tests to verify functionality:

```bash
npm test -- --testPathPattern=Logo.test.js
```

## Troubleshooting

### Subtitle Not Appearing

1. Check that `logoSubtitle` is set in `configBranding.js`
2. Verify the configuration is being loaded correctly
3. Check browser console for any JavaScript errors

### Styling Issues

1. Ensure CSS modules are properly imported
2. Check that the `.subtitle` class is applied
3. Verify CSS custom properties are defined

### Performance

The subtitle feature has minimal performance impact:
- No additional network requests
- Efficient DOM updates
- Optimized CSS animations

## Future Enhancements

Potential improvements for future versions:
- Animated subtitle transitions
- Multiple subtitle rotation
- Custom subtitle fonts
- Dynamic subtitle content
- Localization support for subtitles
