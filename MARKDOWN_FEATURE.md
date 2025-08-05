# Markdown Support for Product Descriptions

This feature adds markdown rendering support for product descriptions on listing pages. When enabled, product descriptions that contain markdown syntax will be rendered as formatted HTML instead of plain text.

## Features

- **Headings**: `# H1`, `## H2`, `### H3`, etc.
- **Paragraphs**: Regular text with automatic paragraph breaks
- **Lists**: Both ordered (`1. Item`) and unordered (`- Item`) lists
- **Links**: `[Link text](https://example.com)`
- **Emphasis**: `**bold**` and `*italic*` text
- **Code**: Inline `code` and code blocks
- **Blockquotes**: `> Quoted text`
- **Horizontal rules**: `---`

## Implementation

### Files Modified

1. **`src/util/markdown.js`** - New utility for markdown rendering using react-markdown
2. **`src/containers/ListingPage/SectionTextMaybe.js`** - Updated to support markdown rendering
3. **`src/containers/ListingPage/ListingPageCoverPhoto.js`** - Enabled markdown for description
4. **`src/containers/ListingPage/ListingPageCarousel.js`** - Enabled markdown for description
5. **`src/containers/ListingPage/ListingPage.module.css`** - Added markdown-specific styles

### How to Use

The markdown feature is automatically enabled for product descriptions. When a product description contains markdown syntax, it will be rendered as formatted HTML.

#### Example Description with Markdown

```
# Product Features

This amazing product includes:

## Key Benefits
- **High quality** materials
- *Elegant* design
- Easy to use

## Specifications
1. Size: 10x15cm
2. Weight: 500g
3. Color: Available in multiple colors

Visit our [website](https://example.com) for more information.
```

#### Rendered Output

The above markdown will be rendered as:
- A main heading "Product Features"
- A subheading "Key Benefits" with a bulleted list
- A subheading "Specifications" with a numbered list
- A clickable link to the website

### Styling

The markdown content uses the existing CSS classes from the listing page:
- Headings use the `.sectionHeading` class
- Paragraphs use the `.text` or `.ingress` class (depending on context)
- Links use the `.contactLink` class
- Additional markdown-specific styles are applied via the `.markdownContent` class

### Backward Compatibility

The implementation maintains backward compatibility:
- Existing plain text descriptions continue to work as before
- The `enableMarkdown` prop defaults to `false` for other uses of `SectionTextMaybe`
- Only product descriptions on listing pages have markdown enabled by default

### Security

The markdown renderer uses react-markdown which includes built-in security features:
- HTML is sanitized by default
- Only safe markdown syntax is rendered
- External links open in new tabs with `rel="noopener noreferrer"`

## Testing

Run the tests to verify markdown functionality:

```bash
npm test src/util/markdown.test.js
```

## Dependencies

The feature uses the following dependencies:
- `react-markdown` - React component for rendering markdown

The react-markdown library was added to the project as it provides a simpler and more reliable way to render markdown compared to the unified/remark/rehype stack.
