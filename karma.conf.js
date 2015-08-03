var webpackConfig = require('./webpack.config');

module.exports = function karmaConfig (config) {
  config.set({
    frameworks: ['jasmine'],

    reporters: ['spec', 'coverage'],

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'src/tests.webpack.js'
    ],

    preprocessors: {
      'src/tests.webpack.js': ['webpack', 'sourcemap']
    },

    browsers: ['PhantomJS'],

    singleRun: true,

    coverageReporter: {
      dir: 'build/coverage/',
      type: 'html'
    },

    webpack: webpackConfig
  });
};