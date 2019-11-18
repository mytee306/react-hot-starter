require('module-alias/register');
require('ignore-styles');
require('dotenv').config({
  path: require('path').join(__dirname, '../.env.development.local'), // eslint-disable-line global-require
});
