const WebpackShellPlugin = require('webpack-shell-plugin');
const conf = module.exports = require('skatejs-build/webpack.config');
conf.module.loaders[2].exclude = '';

// Both index and index-with-deps should be the same.
conf.entry['dist/index.js'] = './src/index.js';
conf.entry['dist/index.min.js'] = './src/index.js';

// Ensures the native-shim is wrapped in a conditional eval. This is so that it
// can be simply included all of the time without worry it will be executed in
// an unsupported environment.
conf.plugins.push(new WebpackShellPlugin({
  onBuildStart: [
    // Escape all backtick characters so we can wrap it in a template literal.
    // eslint-disable-next-line
    'sed -e "s/\\\`/\\\\\\\\\\`/g" ./node_modules/@webcomponents/custom-elements/src/native-shim.js > ./src/native-shim.js',

    // Wrap in a conditional eval so it doesn't get executed in non-supported environments.
    'echo "window.customElements && eval(\\`$(cat ./src/native-shim.js)\\`);" > ./src/native-shim.js'
  ],
  onBuildEnd: [
    // Copy to dist so it's available to load standalone.
    'cp -rf ./src/native-shim.js ./dist/'
  ]
}));
