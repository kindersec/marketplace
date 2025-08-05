# Article Creation Tutorial: How to Generate Article Files from Markdown

This tutorial explains the complete process of creating a new article page from a markdown file in the smart home blog system.

## Prerequisites

- Markdown file with article content
- Access to the project file structure
- Understanding of React components and JSX
- Basic knowledge of the project's routing system

## Step 1: Load and Analyze Articles

### 1.1 Load Articles from Source
- Load the articles from the `/articles` folder
- Review the markdown files to understand their content and structure

### 1.2 Analyze the Markdown File

First, examine your markdown file to extract the following information:

- **Title**: The main heading of the article
- **Excerpt**: A brief summary (2-3 sentences)
- **Content**: The main article body
- **Category**: Usually "Smart Home" for this blog
- **Article Type**: One of: "Buying Guides", "How-To Guides", "Product Reviews", "Technical Articles"
- **Tags**: Relevant keywords for the article
- **Date**: Publication date (YYYY-MM-DD format)
- **Author**: Usually "Smart Home Blog" or "Smart Home Expert"

### 1.3 Study Existing Page Structure
- Check how pages are created in `src/containers/ArticlesPage/` folder
- Review existing article components to understand the pattern and structure

## Step 2: Create Article Pages

### 2.1 Create Individual Article Pages
Create a new file in `src/containers/ArticlesPage/` with the naming convention: `[ArticleName]Page.js`

Create a page for each article from `/articles` under `containers/ArticlesPage/` similarly to the existing pages.

### File Structure Template:

```javascript
import React from 'react';
import { NamedLink } from '../../components';
import StaticPage from '../PageBuilder/StaticPage';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import css from './ArticlePage.module.css';

const [ArticleName]Page = () => {
  return (
    <StaticPage
      className={css.root}
      title="[Article Title]"
      description="[Article excerpt]"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        headline: '[Article Title]',
        description: '[Article excerpt]',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://yourdomain.com/articles/[article-id]',
        },
      }}
    >
      <main className={css.content}>
        <article className={css.article}>
          <header className={css.articleHeader}>
            <div className={css.category}>[Category]</div>
            <h1 className={css.articleTitle}>[Article Title]</h1>
            <p className={css.articleExcerpt}>
              [Article excerpt]
            </p>
            <div className={css.articleMeta}>
              <span className={css.date}>[Date]</span>
              <span className={css.author}>[Author]</span>
            </div>
          </header>

          <div className={css.articleContent}>
            [Convert markdown content to JSX here]
          </div>
        </article>
      </main>
    </StaticPage>
  );
};

export default [ArticleName]Page;
```

## Step 3: Convert Markdown to JSX

Convert your markdown content to JSX using these patterns:

### Common Markdown to JSX Conversions:

- **Headers**: `# Title` → `<h1>Title</h1>`
- **Subheaders**: `## Subtitle` → `<h2>Subtitle</h2>`
- **Paragraphs**: `Text` → `<p>Text</p>`
- **Lists**: `- Item` → `<ul><li>Item</li></ul>`
- **Bold**: `**text**` → `<strong>text</strong>`
- **Italic**: `*text*` → `<em>text</em>`
- **Links**: `[text](url)` → `<a href="url">text</a>`

## Step 4: Update Routing Configuration

### 4.1 Update Route Configuration
Add the new route to `src/routing/routeConfiguration.js`:

### Add Import:
```javascript
// Add this import at the top with other loadable imports
const [ArticleName]Page = loadable(() => import('../containers/ArticlesPage/[ArticleName]Page'));
```

### Add Route Object:
```javascript
// Add this to the routeConfiguration array
{
  path: '/articles/[article-id]',
  name: '[ArticleName]Page',
  component: [ArticleName]Page,
},
```

## Step 5: Update Article Lists

### 5.1 Update ArticlesPage
Update the ArticlesPage in `src/containers/ArticlesPage/ArticlesPage.js` with the newly created article.

### 5.2 Update BlogPage
Update the `src/containers/BlogPage/BlogPage.js` with the newly created article.

Add the article to both `ArticlesPage.js` and `BlogPage.js`:

### Add to Articles Array:
```javascript
{
  id: '[article-id]',
  title: '[Article Title]',
  excerpt: '[Article excerpt]',
  date: '[YYYY-MM-DD]',
  author: '[Author]',
  category: '[Category]',
  articleType: '[Article Type]',
  tags: ['tag1', 'tag2', 'tag3']
}
```

### Add to Route Map:
```javascript
// Add to the routeMap object
'[article-id]': '[ArticleName]Page'
```

## Step 6: Clean Up and Archive

### 6.1 Move Completed Articles
After creating the React component, move the source markdown file from `articles/` to `articles done/` to keep the source directory clean.

### 6.2 Verify Completion
- Ensure all article pages are properly created and functional
- Test the routing to confirm articles are accessible
- Verify that the article appears in both ArticlesPage and BlogPage listings

## Example: Complete Article Creation

Here's a complete example of creating an article from this markdown:

### Input Markdown:
```markdown
# How to Choose the Perfect Smart Thermostat

Smart thermostats can save you money and make your home more comfortable. Here's everything you need to know.

## What to Look For

- **Compatibility**: Check if it works with your HVAC system
- **Features**: Look for scheduling, geofencing, and learning capabilities
- **Integration**: Ensure it works with your smart home ecosystem

## Top Recommendations

1. **Nest Learning Thermostat** - Best overall
2. **Ecobee SmartThermostat** - Best for Apple HomeKit
3. **Honeywell T9** - Best budget option

## Installation Tips

Follow these steps for a successful installation:

1. Turn off power to your HVAC system
2. Remove the old thermostat
3. Install the new smart thermostat
4. Connect to your Wi-Fi network
5. Set up the app and configure settings
```

### Generated React Component:
```javascript
import React from 'react';
import { NamedLink } from '../../components';
import StaticPage from '../PageBuilder/StaticPage';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import css from './ArticlePage.module.css';

const SmartThermostatPage = () => {
  return (
    <StaticPage
      className={css.root}
      title="How to Choose the Perfect Smart Thermostat"
      description="Smart thermostats can save you money and make your home more comfortable. Here's everything you need to know."
      schema={{
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        headline: 'How to Choose the Perfect Smart Thermostat',
        description: 'Smart thermostats can save you money and make your home more comfortable.',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://yourdomain.com/articles/smart-thermostat',
        },
      }}
    >
      <main className={css.content}>
        <article className={css.article}>
          <header className={css.articleHeader}>
            <div className={css.category}>Smart Home</div>
            <h1 className={css.articleTitle}>How to Choose the Perfect Smart Thermostat</h1>
            <p className={css.articleExcerpt}>
              Smart thermostats can save you money and make your home more comfortable. Here's everything you need to know.
            </p>
            <div className={css.articleMeta}>
              <span className={css.date}>2025-01-15</span>
              <span className={css.author}>Smart Home Blog</span>
            </div>
          </header>

          <div className={css.articleContent}>
            <h2>What to Look For</h2>
            <ul>
              <li><strong>Compatibility:</strong> Check if it works with your HVAC system</li>
              <li><strong>Features:</strong> Look for scheduling, geofencing, and learning capabilities</li>
              <li><strong>Integration:</strong> Ensure it works with your smart home ecosystem</li>
            </ul>

            <h2>Top Recommendations</h2>
            <ol>
              <li><strong>Nest Learning Thermostat</strong> - Best overall</li>
              <li><strong>Ecobee SmartThermostat</strong> - Best for Apple HomeKit</li>
              <li><strong>Honeywell T9</strong> - Best budget option</li>
            </ol>

            <h2>Installation Tips</h2>
            <p>Follow these steps for a successful installation:</p>
            <ol>
              <li>Turn off power to your HVAC system</li>
              <li>Remove the old thermostat</li>
              <li>Install the new smart thermostat</li>
              <li>Connect to your Wi-Fi network</li>
              <li>Set up the app and configure settings</li>
            </ol>
          </div>
        </article>
      </main>
    </StaticPage>
  );
};

export default SmartThermostatPage;
```

## Common Pitfalls to Avoid

- **Forgetting to update routing**: Always add the route to routeConfiguration.js
- **Missing article metadata**: Ensure all required fields are included in the articles array
- **Incorrect JSX syntax**: Make sure all tags are properly closed
- **Wrong file naming**: Use PascalCase for component names and kebab-case for IDs
- **Missing imports**: Include all necessary component imports

## Best Practices

- **Consistent styling**: Use the unified ArticlePage.module.css for all articles
- **SEO optimization**: Include proper meta tags and schema markup
- **Accessibility**: Use semantic HTML and proper heading hierarchy
- **Mobile responsiveness**: Test on different screen sizes
- **Performance**: Keep components lightweight and efficient

## File Structure Summary

After creating a new article, your file structure should look like this:

```
src/
├── containers/
│   ├── ArticlesPage/
│   │   ├── [ArticleName]Page.js          # New article component
│   │   ├── ArticlesPage.js               # Updated with new article
│   │   └── ArticlePage.module.css        # Shared styles
│   └── BlogPage/
│       └── BlogPage.js                   # Updated with new article
├── routing/
│   └── routeConfiguration.js             # Updated with new route
└── articles done/                        # Moved markdown file here
```

## Naming Conventions

- **Component files**: PascalCase (e.g., `SmartThermostatPage.js`)
- **Article IDs**: kebab-case (e.g., `smart-thermostat`)
- **Route paths**: kebab-case (e.g., `/articles/smart-thermostat`)
- **CSS classes**: camelCase (e.g., `articleContent`)

## Article Types

Use these article types for proper categorization:

- **Buying Guides**: Product comparison and selection guides
- **How-To Guides**: Step-by-step tutorials and instructions
- **Product Reviews**: Device evaluations and recommendations
- **Technical Articles**: In-depth technical content and explanations

## Complete Workflow Summary

The complete article creation process follows this systematic workflow:

1. **Load Articles**: Load the articles from the `/articles` folder
2. **Study Structure**: Check how pages are created in `src/containers/ArticlesPage/` folder
3. **Create Pages**: Create a page for each article from `/articles` under `containers/ArticlesPage/` similarly to the existing pages
4. **Update Routing**: Update the routing in `src/routing/routeConfiguration.js`
5. **Update Lists**: Update the ArticlesPage in `src/containers/ArticlesPage/ArticlesPage.js` with the newly created article
6. **Update Blog**: Update the `src/containers/BlogPage/BlogPage.js` with the newly created article
7. **Archive Files**: Move the articles markdown files to the `/articles done` folder

## Conclusion

This tutorial provides a complete workflow for creating new article pages from markdown files. By following these steps, you can efficiently add new content to the smart home blog while maintaining consistency and quality across all articles.

For reference examples, check the existing article files in the ArticlesPage folder.
