const path = require('path');
const webpack = require('webpack');

module.exports = {
  // outras configurações...
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
    cacheDirectory: path.resolve(__dirname, '.webpack_cache'),
    store: 'pack',
    version: '1.0.0',
    allowCollectingMemory: true,
    profile: true,
    managedPaths: [],
    immutablePaths: [],
    ignoreErrors: true, // Adicione essa linha
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /Warning/
    })
  ],
};
