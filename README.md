# be-invoking

Invoke method on upstream peer element or the host.

[![NPM version](https://badge.fury.io/js/be-invoking.png)](http://badge.fury.io/js/be-invoking)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-invoking?style=for-the-badge)](https://bundlephobia.com/result?p=be-invoking)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-invoking?compression=gzip">
[![Playwright Tests](https://github.com/bahrus/be-invoking/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-invoking/actions/workflows/CI.yml)

## Example 1a

```html
<my-custom-element>
    #shadow
        <input disabled be-invoking='of do something.'>
</my-custom-element>
```

What this does:  Invokes host-element's doSomething method only when the input element dispatches "input" event.

To specify a different event:

## Example 1b

```html
<host-element>
    #shadow
        <input be-invoking='of do something on change.'>
</host-element>
```

## Example 2

```html
<host-element>
    #shadow
        <peer-element -my-method></peer-element>
        <input be-invoking='of -my-method.'>
</host-element>
```

## Viewing Demos Locally

Any web server that can serve static files will do, but...

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.js.
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo/ in a modern browser.

## Running Tests

```
> npm run test
```

## Using from ESM Module:

```JavaScript
import 'be-invoking/be-invoking.js';
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-invoking';
</script>
```

