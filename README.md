# be-invoking (🕹️)

Invoke method on upstream peer element or the host.

> [!NOTE]
> This element enhancement took some inspiration from the original form that [the invoker commands proposal adopted](https://open-ui.org/components/invokers.explainer/) as well as [countless frameworks](https://knockoutjs.com/documentation/click-binding.html).  Once that becomes built into the platform (hopefully), definitely consider adopting that built-in technique before using this as a last resort.

[![NPM version](https://badge.fury.io/js/be-invoking.png)](http://badge.fury.io/js/be-invoking)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-invoking?style=for-the-badge)](https://bundlephobia.com/result?p=be-invoking)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-invoking?compression=gzip">
[![Playwright Tests](https://github.com/bahrus/be-invoking/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-invoking/actions/workflows/CI.yml)

## Example 1a Invoking a host method on most common event (depending on context)


```html
<mood-stone>
    #shadow
        <input disabled be-invoking='howAmIFeelingAboutToday'>
</mood-stone>
```

What this does:

1.  Removes the disabled attribute after hydrating.
2.  Listens by default for "input" events.
3.  Invokes host-element's howAmIFeelingToday method only when the input element dispatches "input" event.  If adorning a button element, it will invoke the method on clicking.    

It passes in two arguments:  

1.  The instance of whatever element is being invoked, just in case that is helpful.
2.  The event that triggered the action. 

Note that the word "be-invoking" is a bit long.  It is easy to choose your own name, as demonstrated by [this file](https://github.com/bahrus/be-invoking/blob/baseline/%F0%9F%95%B9%EF%B8%8F.ts).

In the rest of the examples, we will use the emoji 🕹️ to represent "be-invoking" just for the fun of it.

To specify a different event to act on:

## Example 1b

```html
<mood-stone>
    #shadow
        <input disabled 🕹️='howAmIFeelingAboutToday on change'>
</mood-stone>
```

## Example 1c

```html
<mood-stone>
    #shadow
        <soul-searcher -engage-in-second-guessing></soul-searcher>
        <input disabled 🕹️='-engage-in-second-guessing'>
</mood-stone>
```

## Example 1d

```html
<mood-stone>
    #shadow
        <soul-searcher></soul-searcher>
        <input 🕹️='~soulSearcher:engageInSecondGuessing'>
</mood-stone>
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

