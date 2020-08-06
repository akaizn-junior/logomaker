const webpack = require('webpack');
// local
const path = require('path');
// plugins
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// setup the environment
require('dotenv').config();

// if dev mode
const DEV = process.env.NODE_ENV !== 'production';
// settings
const dist = DEV ? 'dev' : 'build';
const settings = {
  entry: {
    main: './client/app/app.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    cssFilename: '[name].css',
    cssChunkFilename: '[name].[contenthash].css',
    client: dist,
    html: './client/index.html'
  }
};

module.exports = {
  mode: DEV ? 'none' : 'production',
  entry: path.join(__dirname, settings.entry.main),
  devtool: DEV ? 'source-map' : '',
  stats: 'errors-warnings',
  output: {
    filename: settings.output.filename,
    path: path.join(__dirname, settings.output.client)
  },
  devServer: {
    contentBase: path.join(__dirname, dist),
    compress: true,
    port: 8000
  },
  plugins: [
    DEV ? () => {} : new OptimizeCSSAssetsPlugin({}),
    new webpack.DefinePlugin({
      ENV_ORIGIN: JSON.stringify(process.env.LAMBDA_SERVER || '')
    }),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, settings.output.html),
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        html5: true
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: settings.output.cssFilename,
      chunkFilename: settings.output.cssChunkFilename
    }),
    new CopyPlugin([{
      from: 'client/assets',
      to: 'assets'
    }, {
      from: 'client/manifest.json',
      to: 'manifest.json'
    }, {
      from: 'LICENSE',
      to: 'LICENSE.txt'
    }, {
      from: './node_modules/@digitalkaoz/preload-polyfill/dist/preload-polyfill.min.js',
      to: 'vendors/preload-polyfill.min.js'
    }, {
      from: './node_modules/@digitalkaoz/preload-polyfill/dist/preload-polyfill-invoke.min.js',
      to: 'vendors/preload-polyfill-invoke.min.js'
    }, {
      from: './node_modules/@digitalkaoz/preload-polyfill/dist/preload-polyfill-inline.min.js',
      to: 'vendors/preload-polyfill-inline.min.js'
    }, {
      from: './node_modules/localforage/dist/localforage.min.js',
      to: 'vendors/localforage.min.js'
    }])
  ],
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'client/app/')
    },
    extensions: ['.jsx', '.js']
  },
  module: {
    // set the rules of transpiling
    rules: [
      {
        // transpile es6 in all the .js or .jsx files
        test: /[.js|.jsx]$/,
        // don't transpile code in the node modules folder
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory=true'
        }
      }, {
        test: /\.css$/,
        use: [
          { loader: DEV ? 'style-loader' : MiniCssExtractPlugin.loader },
          { loader: 'css-loader' }
        ]
      }
    ]
  }
};
