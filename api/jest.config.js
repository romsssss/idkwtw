module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.js'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  maxWorkers: 1,
  rootDir: '.',
  testMatch: ['<rootDir>/src/**/*.test.js'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: {
    '^.+\\.ts$': ['@swc/jest', {
      jsc: {
        parser: {
          syntax: 'typescript',
        },
        target: 'es2022',
      },
      module: {
        type: 'commonjs',
      },
    }],
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
}
