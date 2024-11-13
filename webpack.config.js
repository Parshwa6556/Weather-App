const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: './src/app.js',  // Adjust your entry file if necessary
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      path: require.resolve('path-browserify'), // Polyfill for 'path'
      fs: false,  // Ignore the 'fs' module (File System)
      net: false, // Ignore the 'net' module
      tls: false, // Ignore the 'tls' module
      async_hooks: false, // Ignore the 'async_hooks' module
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new NodePolyfillPlugin(),  // Polyfill Node.js modules for the browser
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
