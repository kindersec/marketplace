# Chatbot Enhancement: Site Structure Awareness

## Overview

The chatbot has been enhanced to be aware of the website's structure and can now recommend relevant pages to users based on their queries. This allows users to easily navigate to helpful resources like FAQ pages, setup guides, policy information, and more.

## Features

### 1. Intelligent Page Recommendations
- **Contextual Suggestions**: The chatbot analyzes user queries and suggests relevant pages
- **Multiple Recommendations**: Can suggest up to 3 relevant pages at once
- **Smart Matching**: Uses keyword mapping and semantic analysis to find the best matches

### 2. Comprehensive Site Coverage
The chatbot is aware of all major sections of the website:

#### Main Navigation
- Home, Products, Categories, Brands
- About Us, Contact

#### Customer Support
- FAQ, Chat Support
- Shipping & Delivery, Returns & Refunds
- Payment & Billing, Prohibited Items

#### Legal & Policies
- Terms of Service, Privacy Policy

#### Educational Content
- Smart Home Articles (Smart Bulbs, Smart Locks, etc.)
- Setup Guides and Tutorials
- Technical Glossaries
- Compatibility Information

#### User Account (Authenticated)
- Profile Dashboard, Orders, Listings
- Messages, Shopping Cart

### 3. Smart Query Understanding
The chatbot can understand various types of queries:

- **Policy Questions**: "How do I get a refund?" → Returns & Refunds page
- **Technical Help**: "Smart bulb setup help" → Smart Bulb Guide
- **General Information**: "What's your shipping policy?" → Shipping & Delivery page
- **Troubleshooting**: "WiFi issues" → WiFi Guide + Compatibility page

## Technical Implementation

### Backend Changes

#### `server/api/chat-support.js`
- Added site structure configuration
- Implemented `getRelevantPages()` function for intelligent page matching
- Enhanced system prompt to encourage page recommendations
- Returns multiple suggested links (pages + listings)

#### Key Functions
```javascript
// Find relevant pages based on user query
const relevantPages = getRelevantPages(lastUser.content);
const topRelevantPages = relevantPages.slice(0, 3);

// Build context for AI model
let contextNotes = '';
if (topRelevantPages.length > 0) {
  contextNotes += 'Relevant pages on our website:\n';
  topRelevantPages.forEach(page => {
    contextNotes += `- ${page.title}: ${page.description} (${page.path})\n`;
  });
}
```

**Title Cleaning**: Link titles are automatically cleaned of leading slashes both in the backend (before sending to frontend) and in the frontend (before displaying) to ensure clean, user-friendly presentation.

### Frontend Changes

#### `src/components/FloatingChatBubble/FloatingChatBubble.js`
- Updated to handle multiple suggested links
- Enhanced UI to display page recommendations clearly
- Added suggestions header with icon and description

#### `src/containers/ChatSupportPage/ChatSupportPage.js`
- Same enhancements as FloatingChatBubble
- Consistent user experience across both chat interfaces

### Configuration

#### `src/config/siteStructure.js`
- Centralized site structure definition
- Categorized pages by type and purpose
- Helper functions for searching and relevance scoring

## User Experience

### Before Enhancement
- Chatbot could only suggest marketplace listings
- Users had to manually navigate to find relevant pages
- Limited context about available resources

### After Enhancement
- Chatbot proactively suggests relevant pages
- Users get immediate access to helpful resources
- Clear visual indicators for recommendations
- Seamless navigation to suggested content
- **Clean link titles**: Leading slashes are automatically removed for better readability

### Example Interaction

**User**: "I'm having trouble setting up my smart bulb"

**Chatbot Response**:
```
I can help you with smart bulb setup! Here are some common issues and solutions:

1. Make sure your bulb is compatible with your smart home system
2. Check that your WiFi network is stable
3. Ensure the bulb is properly screwed in and powered on
4. Try resetting the bulb if it's not responding

For detailed setup instructions and troubleshooting, I recommend checking our Smart Bulb Guide.
```

**Suggested Pages**:
- 💡 Smart Bulb Guide (/articles/smart-bulb)
- 💡 Smart Bulb Glossary (/articles/smart-bulb-glossary)
- 💡 Smart Home Devices (/articles/smart-home-devices)

## Testing

### Test Script
Run `scripts/test-chatbot.js` to verify:
- Page search functionality
- Relevance scoring
- Keyword mapping
- Category-specific queries

### Manual Testing
Test with various user queries:
- Policy questions (refunds, shipping, etc.)
- Technical help (setup, troubleshooting)
- General information (about, contact)
- Educational content (guides, articles)

## Benefits

1. **Improved User Experience**: Users get immediate access to relevant resources
2. **Reduced Support Load**: Chatbot can direct users to self-service resources
3. **Better Navigation**: Users discover helpful content they might not know exists
4. **Consistent Recommendations**: AI-powered suggestions based on actual site structure
5. **Enhanced Engagement**: Users spend more time on relevant content

## Future Enhancements

1. **Analytics Integration**: Track which recommendations are most helpful
2. **Personalization**: Tailor suggestions based on user history
3. **A/B Testing**: Test different recommendation strategies
4. **Feedback Loop**: Allow users to rate recommendation helpfulness
5. **Dynamic Content**: Include real-time content updates in recommendations

## Maintenance

### Adding New Pages
1. Update `src/config/siteStructure.js`
2. Add relevant keywords to `keywordMappings`
3. Test with `scripts/test-chatbot.js`
4. Verify chatbot recommendations work correctly

### Updating Existing Pages
1. Modify page metadata in site structure
2. Update keyword mappings if needed
3. Test relevance scoring
4. Monitor user feedback

## Conclusion

This enhancement significantly improves the chatbot's utility by making it a true navigation assistant. Users can now get contextual help and easily find relevant resources, leading to better self-service and improved overall user satisfaction.
