const path = require('path');

module.exports = {
  moduleDirectories: ['node_modules', path.join(__dirname, 'src/test')],
  setupFiles: ['./src/test/jestSetup.js'],
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.test.js'],
};