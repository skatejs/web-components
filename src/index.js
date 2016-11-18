// We load the Safari fix before document-register-element because DRE
// overrides attachShadow() and calls back the one it finds on HTMLElement.
require('./fix/safari');
require('./native-shim');
require('@webcomponents/custom-elements');
require('@webcomponents/shadydom');
require('@webcomponents/shadycss');
