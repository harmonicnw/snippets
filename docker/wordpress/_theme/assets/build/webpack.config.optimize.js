// VERSION 2025.05.16

const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
//const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");

// const config = require('./config');

module.exports = {
  plugins: [
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ["gifsicle", { interlaced: true, optimizationLevel: 5 }],
          ["jpegtran", { progressive: true, optimizationLevel: 5 }],
          ["pngquant", { quality: [0.65, 0.90], speed: 4 }],
          [
            "svgo",
            {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeViewBox: false,
                      addAttributesToSVGElement: {
                        attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                      },
                    },
                  },
                },
              ],
            },
          ],
        ],
      },
    }),
    // new HtmlCriticalWebpackPlugin({
    //   base: config.paths.dist,
    //   src: config.devUrl,
    //   dest: 'styles/critical-home.css',
    //   inline: false,
    //   minify: true,
    //   extract: false,
    //   width: 375,
    //   height: 565,
    //   penthouse: {
    //     blockJSRequests: false,
    //   }
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        parallel: true,
      }),
    ],
  },
};