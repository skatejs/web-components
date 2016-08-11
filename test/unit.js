import '../src/index';

describe('skatejs-web-components', () => {
  it('should create a custom element with a shadow root', () => {
    const Elem = class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
      }
    };
    window.customElements.define('x-test', Elem);
    const elem = new Elem();
    expect(!!elem.shadowRoot).to.equal(true);
  });
});
