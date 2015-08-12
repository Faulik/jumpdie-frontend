var webpack = require('webpack');
var sliceArgs = Function.prototype.call.bind(Array.prototype.slice);
var path = require('path');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  entry: {
    angular: [
      'angular/angular'
    ],
    app: [
      './src/app/app'
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
      {test: /\.css$/, loader: 'style!css!autoprefixer-loader?browsers=last 2 versions'},
      {test: /\.html$/, loader: 'raw'},
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        include: [path.join(__dirname, 'node_modules', 'pixi.js')],
        loader: 'json'
      }
    ]
  },


  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],

  devServer: {
    inline: true,
    colors: true,
    historyApyFallback: true,
    contentBase: 'public',
    publicPath: '/__build__'
  },
  debug: true,

  context: __dirname,
  stats: {colors: true, reason: true}
};

function root(args) {
  args = sliceArgs(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}