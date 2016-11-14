// We load the Safari fix before document-register-element because DRE
// overrides attachShadow() and calls back the one it finds on HTMLElement.
import './fix/safari';
import 'document-register-element/build/document-register-element';
import '@webcomponents/shadydom';
import '@webcomponents/shadycss';
