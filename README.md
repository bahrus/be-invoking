# be-invoking [TODO]

Invoke method on upstream peer element or the host.

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

## Example 2 [TODO]

```html
<host-element>
    #shadow
        <peer-element -my-method></peer-element>
        <input be-invoking='of -my-method.'>
</host-element>
```