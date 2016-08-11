# SkateJS Web Components

This repo gives you the bare minimum you'd need in an environment that doesn't support Custom Elements or Shadow DOM natively. It gives you support for the V1 APIs of each respectively and ensures all their polyfill dependencies are met.

To include simply:

## Installing

It is available on NPM.

```sh
npm install skatejs-web-components
```

## Importing

The `dist/` files are provided in UMD format and can be imported by whatever module format you're using.

```js
import 'skatejs-web-components';
require('skatejs-web-components');
require(['skatejs-web-components']);
```

Or you can load it via a script tag.

```html
<script src="https://npmcdn.com/skatejs-web-components"></script>
```
