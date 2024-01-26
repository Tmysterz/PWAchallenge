const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // webpack plugin tht generates our html file and injects our bundles
      new HtmlWebpackPlugin({
        template: './index.html',
      }),

      // injects our custom service worker
      // The InjectManifest plugin will generate a list of URLs to precache and add that precache 
      // manifest to an existing service worker file. It will otherwise leave the file as-is
      new InjectManifest({
        // specify the path to the service worker file using the swSrc property
        // this is where URLs will be injected
        swSrc: './src-sw.js',
        // control where the generated service worker file is saved, allowing you to customize the file name and location according to your project's needs.
        swDest: 'src-sw.js',
      }),


    ],

    module: {
      rules: [
        // css loaders
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        
      ],
    },
  };
};
