/* eslint-env jasmine, mocha */

import '../src/index';

const { customElements, HTMLElement } = window;

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
});
