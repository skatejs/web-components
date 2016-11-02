// We load the Safari fix before document-register-element because DRE
// overrides attachShadow() and calls back the one it finds on HTMLElement.
import './fix/safari';
import 'document-register-element';
import '@webcomponents/shadycss';
import '@webcomponents/shadydom';
