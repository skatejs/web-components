const conf = module.exports = require('skatejs-build/webpack.config');
conf.module.loaders[2].exclude = '';

// Both index and index-with-deps should be the same.
conf.entry['dist/index.js'] = './src/index.js';
conf.entry['dist/index.min.js'] = './src/index.js';

// Ensures the native-shim is wrapped in a conditional eval. This is so that it
// can be simply included all of the time without worry it will be executed in
// an unsupported environment.

const fs = require('fs');
class ModifyAndCopyNativeShim {
  constructor () {
    this.originalPath = './node_modules/@webcomponents/custom-elements/src/native-shim.js';
    this.srcPath = './src/native-shim.js';
    this.distPath = './dist/native-shim.js';
    this.modify = (str) => {
      // Escape all backtick characters so we can wrap it in a template literal.
      str = str.replace(/`/g, '\\`');
      
      // Wrap in a conditional eval so it doesn't get executed in non-supported environments.
      return 'window.customElements && eval(`' + str + '`);';
    };
  }

  apply (compiler) {
    /* PRE BUILD */
    compiler.plugin('compilation', (compilation) => {
      fs.readFile(this.originalPath, 'utf8', (err, data) => {
        if (err) { return console.log(err); }
        this.result = this.modify(data);
        fs.writeFile(this.srcPath, this.result, 'utf8', (err) => {
          if (err) return console.log(err);
        });
      });
    });

    // Copy to dist so it's available to load standalone.
    compiler.plugin('after-emit', (compilation, callback) => {
      fs.writeFile(this.distPath, this.result, 'utf8', (err) => {
        if (err) return console.log(err);
      });
      callback();
    });
  }
}

conf.plugins.push(new ModifyAndCopyNativeShim());
