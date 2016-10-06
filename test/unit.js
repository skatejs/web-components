import '../src/index';

const { body } = document;
const { customElements } = window;

describe('skatejs-web-components', () => {
  it('should create a custom element with a shadow root', () => {
    const Elem = class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
      }
    };
    customElements.define('x-test-1', Elem);
    const elem = new Elem();
    expect(!!elem.shadowRoot).to.equal(true);
  });

  it('#16 - safari recalc bug', (done) => {
    const div = document.createElement('div');
    div.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    div.shadowRoot.appendChild(style);

    const p = document.createElement('p');
    div.shadowRoot.appendChild(p);
    p.appendChild(document.createTextNode('testing'));


    body.appendChild(div);
    setTimeout(() => {
      // The style content must be set after it is first calculated into flow / layout.
      style.textContent = 'p { border: 1px solid rgb(0, 0, 0); }';

      // We must wait until the next reflow / recalc.
      setTimeout(() => {
        expect(window.getComputedStyle(p).border).to.equal('1px solid rgb(0, 0, 0)');
        body.removeChild(div);
        done();
      });
    });
  });
});
