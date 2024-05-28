const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin());
    return config;
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

