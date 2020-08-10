const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './app.js',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: 'public' },
        { from: 'views', to: 'views' },
      ],
    }),
  ],
  target: 'node',
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  output: {
    filename: 'boundle.js', // `-${Date.now()}.js`,
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['eslint-loader'],
      },
    ],
  },

};
