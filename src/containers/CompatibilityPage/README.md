# CompatibilityPage

A page component that displays smart home compatibility information in two sections: ecosystems and network connectivity.

## Features

- Two distinct sections: Smart Home Ecosystems and Network Connectivity
- Responsive grid layout for each section
- Colored icon containers with brand-specific colors
- Loading and error states
- Accessible keyboard navigation
- Hover effects and smooth transitions
- 5 columns on laptop screens (1024px - 1439px)

## Usage

The page is accessible at `/compatibility` route.

## Data Structure

Each compatibility item object should have:
- `name`: Item name (string)
- `description`: Item description (string)
- `icon`: Emoji icon (string)
- `color`: Brand color (string)
- `url`: Item URL (string)

## Ecosystems Included

The component includes 6 smart home ecosystems:
- Google Home 🏠 (Google Assistant ecosystem)
- Alexa 🔵 (Amazon Alexa ecosystem)
- Apple HomeKit 🍎 (Apple Home ecosystem)
- Home Assistant 🏡 (Open source home automation)
- Samsung SmartThings 📱 (Samsung IoT platform)
- Hubitat 🏢 (Local home automation hub)

## Network Connectivity Options

The component includes 6 connectivity protocols:
- Wi-Fi 📶 (Wireless internet connectivity)
- Zigbee 🕷️ (Low-power wireless mesh network)
- Z-Wave 🌊 (Wireless mesh network protocol)
- Matter 🔗 (Unified smart home standard)
- Bluetooth 📡 (Short-range wireless technology)
- Thread 🧵 (IPv6-based mesh network)

## Styling

The component uses CSS modules with responsive design:
- Desktop: 3+ columns per section
- Laptop: Exactly 5 columns per section
- Tablet: 2+ columns per section
- Mobile: Single column per section

## Color Coding

Each item has a brand-specific color that is applied to the icon container background with 20% opacity for a subtle effect.

## Future Enhancements

- Connect to real API for dynamic compatibility data
- Add compatibility matrix between ecosystems and protocols
- Implement detailed compatibility pages for each item
- Add device compatibility search functionality
- Add analytics tracking for compatibility selections
- Add user preference storage for compatibility choices
