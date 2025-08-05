const React = require('react');
const ReactMarkdown = require('react-markdown');

const testText = `# Test Heading

This is a paragraph.

## List Test

- Item 1
- Item 2
- Item 3

## Numbered List

1. First item
2. Second item
3. Third item

## Mixed Content

- **Bold item**
- *Italic item*
- [Link item](https://example.com)
`;

console.log('Testing markdown list rendering...');
console.log('Input text:', testText);

// Test with basic ReactMarkdown
const basicResult = React.createElement(ReactMarkdown, {}, testText);
console.log('Basic result:', basicResult);

// Test with custom components
const components = {
  ul: props => {
    console.log('Custom ul component called with:', props);
    return React.createElement('ul', { ...props, className: 'test-list' });
  },
  ol: props => {
    console.log('Custom ol component called with:', props);
    return React.createElement('ol', { ...props, className: 'test-list' });
  },
  li: props => {
    console.log('Custom li component called with:', props);
    return React.createElement('li', { ...props, className: 'test-item' });
  }
};

const customResult = React.createElement(ReactMarkdown, { components }, testText);
console.log('Custom result:', customResult);
