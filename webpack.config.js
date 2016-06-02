var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: __dirname + '/src/Rail',
  output: {
      library: 'Rail',
      libraryTarget: 'umd',
      path: __dirname + '/lib',
      filename: 'Rail.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-0']
        },
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new WebpackNotifierPlugin() // notify user of build issues
  ],

  resolve: { extensions: ['', '.js'] },
  devtool: 'eval-source-map',
  watchOptions: { aggregateTimeout: 0 }
};
