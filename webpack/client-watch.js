import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import config from './client'
import log from '../src/log'

const webpackPort = 3000;
const appPort = 8080;

Object.keys(config.entry)
.forEach((key) => {
  config.entry[key].unshift(
    `webpack-dev-server/client?http://localhost:${webpackPort}/`, 'webpack/hot/dev-server'
  )
});

config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

const compiler = webpack(config);
const connString = `http://localhost:${appPort}`;

log.info(`Proxying requests to:${connString}`);

const app = new WebpackDevServer(compiler, {
  hot: true,
  contentBase: '/assets/',
  publicPath: 'http://localhost:3000/assets/',
  headers: { 'Access-Control-Allow-Origin': '*' },
  proxy: {
    '*': `http://localhost:${appPort}`
  },
  stats: 'errors-only'
});

app.listen(webpackPort, () => {
  log.info(`Webpack dev server is now running on http://localhost:${webpackPort}`)
});