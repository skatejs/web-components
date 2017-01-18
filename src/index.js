// We load the Safari fix first because the custom element polyfill overrides
// attachShadow() to observe the shadow root.
require('./fix/safari');

// We have to include this first so that it can patch native.
require('./native-shim');

// These must appear in this order. The ShadyCSS polyfill requires that the
// ShadyDOM polyfill be loaded first.
require('@webcomponents/custom-elements/src/custom-elements');
require('@webcomponents/shadydom/src/env');
require('@webcomponents/shadycss/src/ShadyCSS');
