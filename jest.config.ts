export default {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/presentation/protocols/**',
    '!<rootDir>/src/**/**/*protocols.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  watchPathIgnorePatterns: ['globalConfig'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
