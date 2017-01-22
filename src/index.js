// Polyfill Promise in IE <= 11
require('es6-promise').polyfill();

// We have to include this first so that it can patch native.
require('./native-shim');

// These must appear in this order. The ShadyCSS polyfill requires that the
// ShadyDOM polyfill be loaded first.
require('@webcomponents/custom-elements/src/custom-elements');

// Force the polyfill in Safari 10.0.0 and 10.0.1.
const { navigator } = window;
const { userAgent } = navigator;
const safari = userAgent.indexOf('Safari/60') !== -1;
const safariVersion = safari && userAgent.match(/Version\/([^\s]+)/)[1];
const safariVersions = [0, 1].map(v => `10.0.${v}`).concat(['10.0']);

if (safari && safariVersions.indexOf(safariVersion) > -1) {
  window.ShadyDOM = { force: true };
}

// Load Shady DOM after forcing in Safari.
require('@webcomponents/shadydom/src/env');

// Load ShadyCSS last because it requires ShadyDOM.
require('@webcomponents/shadycss/src/ShadyCSS');
