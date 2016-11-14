// We load the Safari fix before document-register-element because DRE
// overrides attachShadow() and calls back the one it finds on HTMLElement.
import './fix/safari';
import '@webcomponents/custom-elements/src/native-shim';
import '@webcomponents/custom-elements/src/custom-elements';
import '@webcomponents/shadydom';
import '@webcomponents/shadycss';
