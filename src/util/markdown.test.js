import React from 'react';
import { renderMarkdown, renderMarkdownWithStyles } from './markdown';

describe('markdown utility', () => {
  describe('renderMarkdown', () => {
    it('should render basic markdown headings', () => {
      const text = '# Heading 1\n## Heading 2\n### Heading 3';
      const result = renderMarkdown(text);

      // The result should be a React element
      expect(result).toBeDefined();
      expect(typeof result.type).toBe('string');
    });

    it('should render paragraphs', () => {
      const text = 'This is a paragraph.\n\nThis is another paragraph.';
      const result = renderMarkdown(text);

      expect(result).toBeDefined();
    });

    it('should render lists', () => {
      const text = '- Item 1\n- Item 2\n- Item 3';
      const result = renderMarkdown(text);

      expect(result).toBeDefined();
    });

    it('should render links', () => {
      const text = '[Link text](https://example.com)';
      const result = renderMarkdown(text);

      expect(result).toBeDefined();
    });

    it('should handle non-string input', () => {
      const result = renderMarkdown(null);
      expect(result).toBeNull();
    });

    it('should handle empty string', () => {
      const result = renderMarkdown('');
      expect(result).toBeDefined();
    });
  });

  describe('renderMarkdownWithStyles', () => {
    it('should render with custom styling classes', () => {
      const text = '# Heading\nThis is a paragraph.';
      const options = {
        headingClassName: 'custom-heading',
        paragraphClassName: 'custom-paragraph'
      };

      const result = renderMarkdownWithStyles(text, options);
      expect(result).toBeDefined();
    });

    it('should handle empty options', () => {
      const text = '# Heading\nThis is a paragraph.';
      const result = renderMarkdownWithStyles(text);
      expect(result).toBeDefined();
    });
  });
});
