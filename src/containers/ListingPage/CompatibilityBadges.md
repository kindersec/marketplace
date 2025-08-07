# CompatibilityBadges Component

A React component that displays compatibility badges for smart home devices on the listing page.

## Features

- Displays compatibility badges below the image gallery on listing pages
- Supports both array and single string compatibility values
- Uses emoji icons for different compatibility types
- Responsive design with hover effects
- Integrates with the existing listing field configuration
- Works with both ListingPageCarousel and ListingPageCoverPhoto layouts

## Usage

The component is automatically included in both listing page variants and will display when compatibility data is available in the listing's publicData.

```jsx
<CompatibilityBadges
  compatibility={compatibility}
  config={config}
/>
```

## Props

- `compatibility` (string|array): The compatibility data from the listing's publicData
- `config` (object): The marketplace configuration object containing listing field definitions

## Data Structure

The compatibility data can be:
- A single string (e.g., "wifi")
- An array of strings (e.g., ["wifi", "bluetooth", "zigbee"])

## Supported Compatibility Types

The component includes both image badges and icon badges for different compatibility types:

### Image Badges
- **Google Assistant**: Official Google Assistant badge
- **Amazon Alexa**: Official Amazon Alexa badge
- **Apple HomeKit**: Official "Works with Apple Home" badge
- **Samsung SmartThings**: Official "Works with Samsung SmartThings" badge
- **Home Assistant**: Official "Works with Home Assistant" badge

### Icon Badges
- WiFi: 📶
- Bluetooth: 📡
- Zigbee: 🔗
- Z-Wave: 🌊
- Thread: 🧵
- Matter: ⚡
- Siri: 💬
- IFTTT: 🔗
- Webhook: 🌐
- MQTT: 📨
- HTTP: 🌍
- CoAP: 📦
- LoRa: 📡
- Cellular: 📞
- Ethernet: 🔌

Unknown compatibility types will display with a generic wrench icon (🔧).

## Styling

The component uses CSS modules with the following classes:
- `.compatibilityBadgesContainer`: Main container with background and border
- `.compatibilityBadgesTitle`: Section title styling
- `.compatibilityBadgesGrid`: Flex container for badge layout
- `.compatibilityBadge`: Individual badge styling with hover effects
- `.compatibilityBadgeIcon`: Icon styling
- `.compatibilityBadgeText`: Text styling

## Integration

The component is integrated into:
- `ListingPageCarousel.js`: Below the image gallery in the carousel layout
- `ListingPageCoverPhoto.js`: Below the hero section in the cover photo layout

## Testing

The component includes comprehensive tests covering:
- Null/undefined compatibility data
- Array and string input formats
- Unknown compatibility types
- Empty compatibility arrays
- Proper rendering of badges with icons and text
