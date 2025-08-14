module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/dag-jose/,
          /node_modules\/gun/
        ],
      },
    ],
  },
  ignoreWarnings: [
    {
      module: /dag-jose/,
    },
    {
      module: /gun/,
    }
  ],
};
