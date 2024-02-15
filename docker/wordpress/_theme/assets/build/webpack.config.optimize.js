const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");
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
          ["optipng", { optimizationLevel: 5 }],
          [
            "svgo",
            {
              plugins: extendDefaultPlugins([
                {
                  name: "removeViewBox",
                  active: false,
                },
                {
                  name: "addAttributesToSVGElement",
                  params: {
                    attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                  },
                },
              ]),
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
      }),
    ],
  },
};