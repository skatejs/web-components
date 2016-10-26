const { HTMLElement, MutationObserver, navigator } = window;
const { userAgent } = navigator;
const safari = userAgent.indexOf('Safari/60') !== -1;
const safariVersion = safari && userAgent.match(/Version\/([^\s]+)/)[1];
const safariVersions = [0, 1].map(v => `10.0.${v}`);
const patch = safari && safariVersions.indexOf(safariVersion) > -1;

// Workaround for https://bugs.webkit.org/show_bug.cgi?id=160331
function fixSafari () {
  let oldAttachShadow = HTMLElement.prototype.attachShadow;

  // We observe a shadow root, but only need to know if the target that was mutated is a <style>
  // element as this is the only scenario where styles aren't recalculated.
  const moOpts = { childList: true, subtree: true };
  const mo = new MutationObserver((muts) => {
    muts.forEach((mut) => {
      const { target } = mut;
      if (target.tagName === 'STYLE') {
        const { nextSibling, parentNode } = target;

        // We actually have to remove and subsequently re-insert rather than doing insertBefore()
        // as it seems that doesn't trigger a recalc.
        parentNode.removeChild(target);
        parentNode.insertBefore(target, nextSibling);
      }
    });
  });

  // Our override simply calls the native (or overridden) attachShadow but it ensures that changes
  // to it are observed so that we can take any <style> elements and re-insert them.
  function newAttachShadow (opts) {
    const sr = oldAttachShadow.call(this, opts);
    mo.observe(sr, moOpts);
    return sr;
  }

  // We have to define a property because Safari won't take the override if it is set directly.
  Object.defineProperty(HTMLElement.prototype, 'attachShadow', {
    // Ensure polyfills can override it (hoping they call it back).
    configurable: true,
    enumerable: true,
    value: newAttachShadow,
    writable: true
  });
}

// We target a specific version of Safari instead of trying to but detect as it seems to involve
// contriving a breaking case and detecting computed styles. We can remove this code when Safari
// fixes the bug.
if (patch) {
  fixSafari();
}

export default patch;
