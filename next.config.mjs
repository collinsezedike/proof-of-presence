// next.config.mjs

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Only use MiniCssExtractPlugin on the client side production builds
    if (!isServer && !dev) {
      // Add the mini-css-extract-plugin to the webpack plugins
      config.plugins.push(new MiniCssExtractPlugin({
        filename: 'static/css/[contenthash].css',
        chunkFilename: 'static/css/[contenthash].css',
      }));

      // Modify the css rule to use MiniCssExtractPlugin.loader
      const cssRule = config.module.rules.find(rule => rule.test && rule.test.toString().includes('.css'));
      if (cssRule) {
        cssRule.use = [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ];
      } else {
        // If no existing CSS rule is found, add a new one
        config.module.rules.push({
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        });
      }
    }

    return config;
  },
};

export default nextConfig;