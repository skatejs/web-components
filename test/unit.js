/* eslint-env jasmine, mocha */

import '../src/index';
import patch from '../src/fix/safari';

const { body } = document;
const { customElements, Element, HTMLElement } = window;

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

  patch && describe('#16 - safari recalc bug', () => {
    function getDescriptor (name) {
      return Object.getOwnPropertyDescriptor(Element.prototype, name) ||
        Object.getOwnPropertyDescriptor(HTMLElement.prototype, name);
    }

    it('configurable', () => {
      expect(getDescriptor('attachShadow').configurable).to.equal(true);
    });

    it('enumerable', () => {
      expect(getDescriptor('attachShadow').enumerable).to.equal(true);
    });

    it('writable', () => {
      expect(getDescriptor('attachShadow').writable).to.equal(true);
    });

    it('functionality', (done) => {
      const div = document.createElement('div');
      div.attachShadow({ mode: 'open' });

      const style = document.createElement('style');
      div.shadowRoot.appendChild(style);

      const p = document.createElement('p');
      div.shadowRoot.appendChild(p);
      p.appendChild(document.createTextNode('testing'));

      body.appendChild(div);
      // Wait for the first flow / layout the style element will cause.
      setTimeout(() => {
        // Then set the style content.
        style.textContent = 'p { border: 1px solid black; }';

        // We must wait until the next reflow / relayout updating the style element causes to then
        // check if it appolied.
        setTimeout(() => {
          expect(window.getComputedStyle(p).borderWidth).to.equal('1px');
          style.textContent = '';
          setTimeout(() => {
            expect(window.getComputedStyle(p).borderWidth).to.equal('0px');
            style.textContent = 'p { border: 1px solid black; }';
            setTimeout(() => {
              expect(window.getComputedStyle(p).borderWidth).to.equal('1px');
              body.removeChild(div);
              done();
            });
          });
        });
      });
    });
  });
});
