export const roots = ['<rootDir>/src', '<rootDir>/test'];
export const testMatch = [
  '**/__tests__/**/*.+(ts|tsx|js)',
  '**/?(*.)+(spec|test).+(ts|tsx|js)',
];
export const transform = {
  '^.+\\.(t|j)s?$': ['@swc/jest'],
};
