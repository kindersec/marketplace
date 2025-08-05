import React from 'react';
import { Heading } from '../../components';
import { richText } from '../../util/richText';
import { renderMarkdownWithStyles } from '../../util/markdown';

import css from './ListingPage.module.css';

const MIN_LENGTH_FOR_LONG_WORDS = 20;

const SectionTextMaybe = props => {
  const { text, heading, showAsIngress = false, enableMarkdown = false } = props;
  const textClass = showAsIngress ? css.ingress : css.text;

  let content;

  if (enableMarkdown) {
    // Use markdown rendering with appropriate styling
    content = renderMarkdownWithStyles(text, {
      paragraphClassName: textClass,
      headingClassName: css.sectionHeading,
      linkClassName: css.contactLink, // Reuse existing link styling
      listClassName: css.markdownContent, // Use markdownContent for lists
      listItemClassName: css.text, // Use text class for list items
      blockquoteClassName: css.text, // Use text class for blockquotes
    });
  } else {
    // Use existing richText for backward compatibility
    content = richText(text, {
      linkify: true,
      longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS,
      longWordClass: css.longWord,
      breakChars: '/',
    });
  }

  return text ? (
    <section className={css.sectionText}>
      {heading ? (
        <Heading as="h2" rootClassName={css.sectionHeading}>
          {heading}
        </Heading>
      ) : null}
      {enableMarkdown ? (
        <div className={`${textClass} ${css.markdownContent}`}>{content}</div>
      ) : (
        <p className={textClass}>{content}</p>
      )}
    </section>
  ) : null;
};

export default SectionTextMaybe;
