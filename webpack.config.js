const combine = require('webpack-combine-loaders');
const conf = module.exports = require('skatejs-build/webpack.config');
conf.entry['dist/index.js'] = './src/index.js';
conf.entry['dist/index.min.js'] = './src/index.js';
conf.module.loaders.push({
  test: /native-shim\.js$/,
  loader: combine([
    {
      loader: 'regexp-replace',
      query: {
        match: {
          pattern: '/\*.*?\*/',
          flags: 'g'
        },
        replaceWith: ''
      }
    }, {
      loader: 'wrap',
      query: 'eval'
    }
  ])
});
conf.wrap = {
  eval: {
    before: 'var body = (function(){/*',
    after: '*/}).toString();\nbody = body.slice(body.indexOf(\'*\') + 1, body.lastIndexOf(\'*\'));\neval(body);'
  }
};
