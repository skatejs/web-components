// We load the Safari fix before document-register-element because DRE
// overrides attachShadow() and calls back the one it finds on HTMLElement.
import './fix/safari';
import 'skatejs-named-slots';
import 'document-register-element';
