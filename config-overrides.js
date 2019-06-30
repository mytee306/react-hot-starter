/* eslint-disable immutable/no-mutation */

const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = (config, env) => {
  const hotConfig = rewireReactHotLoader(config, env);

  return hotConfig;
};
