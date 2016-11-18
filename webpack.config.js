const WebpackShellPlugin = require('webpack-shell-plugin');
const conf = module.exports = require('skatejs-build/webpack.config');

// Both index and index-with-deps should be the same.
conf.entry['dist/index.js'] = './src/index.js';
conf.entry['dist/index.min.js'] = './src/index.js';

// Ensures the native-shim is wrapped in a conditional eval. This is so that it
// can be simply included all of the time without worry it will be executed in
// an unsupported environment.
conf.plugins.push(new WebpackShellPlugin({
  onBuildStart: [
    'sed -e "s/\\\`/\\\\\\\\\\`/g" ./node_modules/@webcomponents/custom-elements/src/native-shim.js > ./src/native-shim.js',
    'echo "window.customElements && eval(\\`$(cat ./src/native-shim.js)\\`);" > ./src/native-shim.js'
  ],
  onBuildEnd: [
    'rm -rf ./src/native-shim.js'
  ]
}));
