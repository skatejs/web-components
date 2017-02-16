/* eslint-env jasmine, mocha */

import '../src/index';

const {
  customElements,
  HTMLElement,
  ShadyCSS,
  ShadyDOM
} = window;

describe('skatejs-web-components', () => {
  it('should create a custom element with a shadow root', () => {
    const Elem = class extends HTMLElement {
      constructor () {
        super();
        this.attachShadow({ mode: 'open' });
      }
    };
    customElements.define('x-test-1', Elem);
    const elem = new Elem();
    expect(!!elem.shadowRoot).to.equal(true);
  });

  if (ShadyDOM && ShadyDOM.inUse) {
    it('should transform custom-style in polyfill', (done) => {
      document.body.innerHTML = `
        <custom-style>
          <style>
            .test {
              color: red;
            }
          </style>
        </custom-style>
      `;

      ShadyCSS.updateStyles();
      setTimeout(() => {
        const style = document.body.querySelector('custom-style');
        expect(style.innerHTML).to.contain('.test:not(.style-scope)');
        done();
      }, 100);
    });
  }

  it('should not throw on setting <template> innerHTML', () => {
    const template = document.createElement('template');
    expect(() => {
      template.innerHTML = '<style></style>';
    }).to.not.throw(Error);
  });
});
