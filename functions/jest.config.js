module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTestFrameworkScriptFile.ts'],
  testRegex: '(/src/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testPathIgnorePatterns: ['lib/', 'node_modules/'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'node',
};
