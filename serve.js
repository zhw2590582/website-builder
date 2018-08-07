const serve = require('webpack-serve');
const webpackConfig = require('./webpack.config.js');
const config = require('./config');

serve({
  open: true,
  host: 'localhost',
  port: config.port
}, {
  config: webpackConfig
}).then((result) => {
  //
});
