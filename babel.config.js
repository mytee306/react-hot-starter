/* eslint-disable immutable/no-mutation */

module.exports = {
  plugins: ['babel-plugin-macros'],
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
  ],
};
