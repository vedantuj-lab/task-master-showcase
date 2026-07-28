module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/setupTests.js'],
  setupFilesAfterEach: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-native-.*|@react-native-async-storage)',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/assets/**',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testPathIgnorePatterns: ['/node_modules/', '/e2e/', '/android/', '/ios/'],
};
