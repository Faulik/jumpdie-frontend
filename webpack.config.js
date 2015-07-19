var webpack = require('webpack');
var sliceArgs = Function.prototype.call.bind(Array.prototype.slice);
var path = require('path');

module.exports = {
  devtool: 'souce-map',

  entry: {
    angular2: [
      'zone.js',
      'reflect-metadata',
      'rtts_assert/rtts_assert',
      'angular2/angular2',
      'angular2/router',
      'angular2/di'
    ],
    app: [
      './src/app/bootstrap'
    ]
  },
  output: {
    path: root('public/__build__'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    root: __dirname,
    extensions: [
      '',
      '.ts',
      '.js',
      '.json',
      '.webpack.js'
    ],
    alias: {
      'app': 'src/app',
      'common': 'src/common'
    }
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, 'node_modules', 'pixi.js')],
        loader: 'transform?brfs'
      },
      {
        test: /\.json$/,
        include: [path.join(__dirname, 'node_modules', 'pixi.js')],
        loader: 'json'
      },
      {test: /\.css$/, loader: 'raw'},
      {test: /\.html$/, loader: 'raw'},
      {test: /\.ts$/, loader: 'typescript-simple'}
    ],
    noParse: [
      /rtts_assert\/src\/rtts_assert/
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'angular2',
      minChinks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
  ],

  devServer: {
    inline: true,
    colors: true,
    historyApyFallback: true,
    contentBase: 'public',
    publicPath: '/__build__'
  },
  debug: true,
  cache: true,

  context: __dirname,
  stats: {colors: true, reason: true}
};

function root(args) {
  args = sliceArgs(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}