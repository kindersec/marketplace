/**
 * Test script for title cleaning functionality
 *
 * This script tests that leading slashes are properly removed from titles
 * when displaying them in the chatbot suggestions.
 */

// Test the title cleaning function
// This function removes only the first leading slash from titles
// This is the correct behavior for our use case - we want clean titles
// but preserve any intentional formatting like double slashes
const cleanTitle = (title) => {
  return title.replace(/^\//, '');
};

// Test cases
const testCases = [
  { input: 'Home', expected: 'Home', description: 'Normal title' },
  { input: '/FAQ', expected: 'FAQ', description: 'Title with leading slash' },
  { input: '//Terms of Service', expected: '/Terms of Service', description: 'Title with double leading slash (remove only first)' },
  { input: '/smart-bulb-guide', expected: 'smart-bulb-guide', description: 'Path-like title with slash' },
  { input: 'About Us', expected: 'About Us', description: 'Title without slash' },
  { input: '', expected: '', description: 'Empty title' },
  { input: '/', expected: '', description: 'Just a slash' },
  { input: '//', expected: '/', description: 'Double slash (remove only first)' }
];

console.log('🧪 Testing Title Cleaning Functionality\n');

let passedTests = 0;
let totalTests = testCases.length;

testCases.forEach((testCase, index) => {
  const result = cleanTitle(testCase.input);
  const passed = result === testCase.expected;

  if (passed) {
    passedTests++;
    console.log(`✅ Test ${index + 1}: ${testCase.description}`);
  } else {
    console.log(`❌ Test ${index + 1}: ${testCase.description}`);
    console.log(`   Input: "${testCase.input}"`);
    console.log(`   Expected: "${testCase.expected}"`);
    console.log(`   Got: "${result}"`);
  }
});

console.log(`\n📊 Test Results: ${passedTests}/${totalTests} tests passed`);

if (passedTests === totalTests) {
  console.log('🎉 All tests passed! Title cleaning is working correctly.');
} else {
  console.log('⚠️  Some tests failed. Please check the implementation.');
}

// Test with actual site structure titles
console.log('\n🔍 Testing with Actual Site Structure Titles:');
const sampleTitles = [
  'Home',
  'FAQ',
  'Terms of Service',
  'Smart Bulb Guide',
  'Wi-Fi Guide',
  'Compatibility Guide'
];

sampleTitles.forEach(title => {
  const cleaned = cleanTitle(title);
  console.log(`"${title}" → "${cleaned}"`);
});

console.log('\n✅ Title cleaning test complete!');
