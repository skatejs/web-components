const { navigator } = window;
const { userAgent } = navigator;
const safari = userAgent.indexOf('Safari/60') !== -1;
const safariVersion = safari && userAgent.match(/Version\/([^\s]+)/)[1];
const safariVersions = [0, 1].map(v => `10.0.${v}`).concat(['10.0']);
const patch = safari && safariVersions.indexOf(safariVersion) > -1;

// Workaround for https://bugs.webkit.org/show_bug.cgi?id=160331
//
// We target a specific version of Safari instead of trying to but detect as it seems to involve
// contriving a breaking case and detecting computed styles. We can remove this code when Safari
// fixes the bug.
if (patch) {
  window.ShadyDOM = { force: true };
}

export default patch;
