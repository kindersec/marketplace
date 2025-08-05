import React from 'react';
import ReactMarkdown from 'react-markdown';

/**
 * Renders markdown text as React components
 *
 * @param {string} text - The markdown text to render
 * @param {Object} options - Options for rendering
 * @param {Object} options.components - Custom React components to use for specific HTML elements
 * @returns {React.Element} The rendered markdown as React components
 */
export const renderMarkdown = (text, options = {}) => {
  if (typeof text !== 'string') {
    return text;
  }

  const { components = {} } = options;

  try {
    console.log('Rendering markdown with text:', text.substring(0, 200));
    console.log('Components:', Object.keys(components));
    return <ReactMarkdown components={components}>{text}</ReactMarkdown>;
  } catch (error) {
    console.error('Error rendering markdown:', error);
    // Fallback to plain text if markdown rendering fails
    return text;
  }
};

/**
 * Renders markdown text with custom styling classes
 *
 * @param {string} text - The markdown text to render
 * @param {Object} options - Options for rendering
 * @param {string} options.headingClassName - CSS class for headings
 * @param {string} options.paragraphClassName - CSS class for paragraphs
 * @param {string} options.linkClassName - CSS class for links
 * @param {string} options.listClassName - CSS class for lists
 * @param {string} options.listItemClassName - CSS class for list items
 * @param {string} options.blockquoteClassName - CSS class for blockquotes
 * @returns {React.Element} The rendered markdown as React components
 */
export const renderMarkdownWithStyles = (text, options = {}) => {
  const {
    headingClassName,
    paragraphClassName,
    linkClassName,
    listClassName,
    listItemClassName,
    blockquoteClassName
  } = options;

  const components = {};

  // Add custom components with styling if classes are provided
  if (headingClassName) {
    components.h1 = props => <h1 {...props} className={headingClassName} />;
    components.h2 = props => <h2 {...props} className={headingClassName} />;
    components.h3 = props => <h3 {...props} className={headingClassName} />;
    components.h4 = props => <h4 {...props} className={headingClassName} />;
    components.h5 = props => <h5 {...props} className={headingClassName} />;
    components.h6 = props => <h6 {...props} className={headingClassName} />;
  }

  if (paragraphClassName) {
    components.p = props => <p {...props} className={paragraphClassName} />;
  }

  if (linkClassName) {
    components.a = props => <a {...props} className={linkClassName} target="_blank" rel="noopener noreferrer" />;
  }

  if (listClassName || listItemClassName) {
    components.ul = props => {
      console.log('Rendering ul with props:', props);
      return <ul {...props} className={listClassName} />;
    };
    components.ol = props => {
      console.log('Rendering ol with props:', props);
      return <ol {...props} className={listClassName} />;
    };
    if (listItemClassName) {
      components.li = props => {
        console.log('Rendering li with props:', props);
        return <li {...props} className={listItemClassName} />;
      };
    }
  }

  if (blockquoteClassName) {
    components.blockquote = props => <blockquote {...props} className={blockquoteClassName} />;
  }

  return renderMarkdown(text, { components });
};
