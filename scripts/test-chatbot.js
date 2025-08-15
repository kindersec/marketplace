/**
 * Test script for chatbot page recommendations
 *
 * This script tests the site structure configuration and page recommendation logic
 * to ensure the chatbot can properly suggest relevant pages to users.
 */

const { siteStructure, getRelevantPages, searchPages, getAllPages } = require('../src/config/siteStructure.js');

// Test data - simulate user queries
const testQueries = [
  "How do I get a refund?",
  "What's your shipping policy?",
  "I need help with smart bulb setup",
  "What are your terms of service?",
  "How do I troubleshoot WiFi issues?",
  "Tell me about smart locks",
  "What payment methods do you accept?",
  "I want to read your blog articles",
  "How do I check device compatibility?",
  "What's your return policy?",
  "I need help with smart plugs",
  "Tell me about your privacy policy",
  "How do I set up a video doorbell?",
  "I want to learn about smart home protocols",
  "What items are prohibited?",
  "How do I contact support?",
  "I need help with robot vacuum setup",
  "What are the best smart home devices?",
  "How do I automate my living room?",
  "I want to learn about Zigbee and Z-Wave"
];

console.log('🧪 Testing Chatbot Page Recommendations\n');

// Test 1: Display all available pages
console.log('📋 All Available Pages:');
const allPages = getAllPages();
allPages.forEach((page, index) => {
  console.log(`${index + 1}. ${page.title} (${page.path})`);
  console.log(`   ${page.description}`);
  if (page.auth) console.log(`   🔒 Requires authentication`);
  console.log('');
});

// Test 2: Test page search functionality
console.log('🔍 Testing Page Search:');
const searchTerms = ['smart', 'policy', 'help', 'setup', 'guide'];
searchTerms.forEach(term => {
  const results = searchPages(term);
  console.log(`Search for "${term}": ${results.length} results`);
  results.slice(0, 3).forEach(page => {
    console.log(`  - ${page.title} (${page.path})`);
  });
  console.log('');
});

// Test 3: Test relevant page recommendations
console.log('💡 Testing Relevant Page Recommendations:');
testQueries.forEach((query, index) => {
  console.log(`${index + 1}. Query: "${query}"`);
  const relevantPages = getRelevantPages(query);

  if (relevantPages.length > 0) {
    console.log(`   Recommended pages:`);
    relevantPages.slice(0, 3).forEach((page, pageIndex) => {
      console.log(`     ${pageIndex + 1}. ${page.title} (${page.path})`);
      console.log(`        ${page.description}`);
    });
  } else {
    console.log(`   No relevant pages found`);
  }
  console.log('');
});

// Test 4: Test specific category queries
console.log('📚 Testing Category-Specific Queries:');
const categoryTests = [
  { category: 'support', query: 'help support faq' },
  { category: 'legal', query: 'terms privacy policy' },
  { category: 'articles', query: 'smart bulb guide tutorial' },
  { category: 'technical', query: 'compatibility wifi setup' }
];

categoryTests.forEach(test => {
  console.log(`Category: ${test.category}`);
  console.log(`Query: "${test.query}"`);
  const relevantPages = getRelevantPages(test.query);
  const categoryPages = relevantPages.filter(page =>
    page.path.includes(test.category) ||
    Object.values(siteStructure[test.category] || {}).some(catPage => catPage.path === page.path)
  );

  console.log(`   Found ${categoryPages.length} relevant pages in category:`);
  categoryPages.forEach(page => {
    console.log(`     - ${page.title} (${page.path})`);
  });
  console.log('');
});

// Test 5: Test keyword mappings
console.log('🔑 Testing Keyword Mappings:');
const keywordTests = [
  'refund',
  'shipping',
  'smart bulb',
  'wifi',
  'setup',
  'troubleshooting'
];

keywordTests.forEach(keyword => {
  const relevantPages = getRelevantPages(keyword);
  console.log(`Keyword "${keyword}": ${relevantPages.length} relevant pages`);
  if (relevantPages.length > 0) {
    console.log(`  Top result: ${relevantPages[0].title} (${relevantPages[0].path})`);
  }
});

console.log('\n✅ Chatbot page recommendation testing complete!');
console.log('\nThe chatbot should now be able to:');
console.log('- Understand user queries and map them to relevant pages');
console.log('- Recommend multiple relevant resources (pages + listings)');
console.log('- Provide contextual suggestions based on user needs');
console.log('- Handle both technical and policy-related questions');
