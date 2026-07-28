module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/setupTests.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
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
      branches: 60,
      functions: 60,
      lines: 75,
      statements: 75,
    },
  },

  testPathIgnorePatterns: ['/node_modules/', '/e2e/', '/android/', '/ios/'],
};
