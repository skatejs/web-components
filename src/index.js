// We load the Safari fix before document-register-element because DRE
// overrides attachShadow() and calls back the one it finds on HTMLElement.
import './fix/safari';
import '@webcomponents/custom-elements';
import '@webcomponents/shadydom';
import '@webcomponents/shadycss';

if (~window.customElements.define.toString().indexOf('[native code]')) {
  require('@webcomponents/custom-elements/src/native-shim');
}
