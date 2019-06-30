/* eslint-disable immutable/no-mutation */

const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const { produce } = require('immer');

module.exports = (config, env) => {
  const hotConfig = rewireReactHotLoader(config, env);

  return produce(hotConfig, newConfig => {
    newConfig.module.rules.push({
      test: /\.jsx?$/,
      include: /node_modules/,
      use: ['react-hot-loader/webpack'],
    });
  });
};
