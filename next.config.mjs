// next.config.mjs

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    // Only use MiniCssExtractPlugin on the client side production builds
    if (!isServer && !dev) {
      // Add the mini-css-extract-plugin to the webpack plugins
      config.plugins.push(new MiniCssExtractPlugin({
        filename: 'static/css/[contenthash].css',
        chunkFilename: 'static/css/[contenthash].css',
      }));

      // Modify the css loader configuration
      const cssLoader = config.module.rules.find(
        (rule) => rule.test && rule.test.toString().includes('css')
      );
      
      if (cssLoader) {
        cssLoader.use = [
          MiniCssExtractPlugin.loader,
          ...cssLoader.use.filter((loader) => loader.loader !== 'style-loader'),
        ];
      }
    }

    return config;
  },
};

export default nextConfig;