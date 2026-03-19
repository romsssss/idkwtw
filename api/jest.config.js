module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/**/*.test.js'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  maxWorkers: 1,
  rootDir: '.',
  testMatch: ['<rootDir>/src/**/*.test.js'],
  setupFilesAfterEnv: ['./jest.setup.js'],
}
