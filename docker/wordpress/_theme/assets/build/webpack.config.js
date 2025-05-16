// VERSION 2025.05.16

'use strict'; // eslint-disable-line

const path = require('path');
const webpack = require('webpack');
const { merge, mergeWithCustomize, customizeArray } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin'); // maintained fork for webpack 5
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const desire = require('./util/desire');
const config = require('./config');

const assetsFilenames = '[name]';

let webpackConfig = {
  context: config.paths.assets,
  entry: config.entry,
  devtool: (config.enabled.sourceMaps ? 'source-map' : undefined),
  mode: config.enabled.optimize ? 'production' : 'development',
  output: {
    path: config.paths.dist,
    publicPath: config.publicPath,
    filename: `scripts/${assetsFilenames}.js`,
  },
  stats: {
    hash: false,
    version: false,
    timings: false,
    children: false,
    // disable errors, errorDetails and warnings for Friendly-errors-webpack-plugin
    errors: false,
    errorDetails: false,
    warnings: false,
    //
    chunks: false,
    modules: false,
    reasons: false,
    source: false,
    publicPath: false,
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|s?[ca]ss)$/,
        include: config.paths.assets,
        loader: 'import-glob',
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          { loader: 'buble-loader', options: { objectAssign: 'Object.assign' } },
        ],
      },
      {
        test: /\.css$/,
        include: config.paths.assets,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: config.enabled.sourceMaps, url: false } },
          {
            loader: 'postcss-loader', options: {
              postcssOptions: {
                config: path.join( __dirname, 'postcss.config.js' ),
                ctx: config,
              },
              sourceMap: config.enabled.sourceMaps,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: config.enabled.sourceMaps, url: false } },
          {
            loader: 'postcss-loader', options: {
              postcssOptions: {
                config: path.join( __dirname, 'postcss.config.js' ),
                ctx: config,
              },
              sourceMap: config.enabled.sourceMaps,
            },
          },
          { loader: 'resolve-url-loader', options: { sourceMap: config.enabled.sourceMaps } },
          {
            loader: 'sass-loader', options: {
              sassOptions: {
                sourceComments: true,
              },
              sourceMap: true, //config.enabled.sourceMaps, // false causes a resolve issue
            },
          },
        ],
      },
      {
        test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
        include: config.paths.assets,
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: `[path]${assetsFilenames}.[ext]`,
          publicPath: '',
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      convertShapeToPath: {
                        convertArcs: true,
                      },
                      convertPathData: false,
                    },
                  },
                },
              ],
            },
          },
        ],
      },
      {
        test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
        include: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 4096,
          outputPath: 'vendor/',
          name: `[path]${assetsFilenames}.[ext]`,
        },
      },
    ],
  },
  resolve: {
    modules: [
      config.paths.assets,
      'node_modules',
    ],
    enforceExtension: false,
  },
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [config.paths.dist],
      verbose: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: config.copy,
          noErrorOnMissing: true,
          to: `[path]${assetsFilenames}[ext]`, // Note: since 8.0.0 no dot in placeholder needed
        },
      ],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'fonts/**/*',
          noErrorOnMissing: true,
          to: `[path]${assetsFilenames}[ext]`, // Note: since 8.0.0 no dot in placeholder needed
        },
      ],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: config.enabled.optimize,
      debug: config.enabled.watcher,
      stats: { colors: true },
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.s?css$/,
      options: {
        output: { path: config.paths.dist },
        context: config.paths.assets,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `styles/${assetsFilenames}.css`,
    }),
    new FriendlyErrorsWebpackPlugin(),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static', // Generates a static HTML file
    //   openAnalyzer: false,   // Prevents automatically opening the report
    //   reportFilename: 'bundle-report.html', // Output file name
    // }),
  ],
};


/* eslint-disable global-require */ /** Let's only load dependencies as needed */

if (config.enabled.optimize) {
  webpackConfig = merge(webpackConfig, require('./webpack.config.optimize'));
}

if (config.enabled.watcher) {
  webpackConfig = merge(webpackConfig, require('./webpack.config.watch'));
}

/**
 * During installation via sage-installer (i.e. composer create-project) some
 * presets may generate a preset specific config (webpack.config.preset.js) to
 * override some of the default options set here. We use webpack-merge to merge
 * them in. If you need to modify Sage's default webpack config, we recommend
 * that you modify this file directly, instead of creating your own preset
 * file, as there are limitations to using webpack-merge which can hinder your
 * ability to change certain options.
 */

module.exports = mergeWithCustomize({
  customizeArray: customizeArray({
    'module.rules': 'replace',
  }),
})(webpackConfig, desire(`${__dirname}/webpack.config.preset`) ? desire(`${__dirname}/webpack.config.preset`) : {} )