module.exports = {
  moduleFileExtensions: [
    'js',
    'ts',
  ],
  testRegex: '[tests|__tests__]/.*.test.ts$',
  /* Define preprocessors */
  transform: {
    '^.+\\.ts$': 'babel-jest',
  },
  verbose: false,
};
