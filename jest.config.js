// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: '__tests__/coverage',
  collectCoverageFrom: ['app/**'],
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.test.js?(x)',
  ]
}
