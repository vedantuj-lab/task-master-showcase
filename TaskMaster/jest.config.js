module.exports = {
  preset: 'react-native',
  setupFilesAfterEach: [],
  setupFiles: ['<rootDir>/setupTests.js'],
  setupFilesAfterEach: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-native-.*|@react-native-async-storage)',
  ],
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/assets/**',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  testPathIgnorePatterns: ['/node_modules/', '/e2e/', '/android/', '/ios/'],
};
