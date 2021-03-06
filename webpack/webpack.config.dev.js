const _ = require('lodash');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./config.js');

module.exports = _.merge({}, config, {
  devtool: 'source-map',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../build/dev'),
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src' },
      { from: './node_modules/sweetalert2/dist/sweetalert2.min.css', to: './css/' },
    ], {
      ignore: ['js/**/*'],
      copyUnmodified: false,
    }),
  ],
});
