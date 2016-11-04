// We load the Safari fix before document-register-element because DRE
// overrides attachShadow() and calls back the one it finds on HTMLElement.
import './fix/safari';
import 'document-register-element/build/document-register-element';

// You must include the ShadyDOM polyfill *before* ShadyCSS. It seems that some
// functionality in ShadyCSS requires ShadyDOM already be loaded.
import '@webcomponents/shadydom';
import '@webcomponents/shadycss';
