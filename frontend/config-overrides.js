module.exports = function override(config) {
  // Ignore source map warnings from specific packages
  config.module.rules.push({
    test: /\.js$/,
    enforce: 'pre',
    use: ['source-map-loader'],
    exclude: [
      /node_modules\/dag-jose/,
      /node_modules\/gun/
    ],
  });

  config.ignoreWarnings = [
    { module: /dag-jose/ },
    { module: /gun/ }
  ];

  return config;
};
