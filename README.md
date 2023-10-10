# be-invoking

## Example 1a

```html
<host-element>
    #shadow
        <input be-invoking='of do something.'>
</host-element>
```

What this does:  Invokes host-element's doSomething method only when the input element dispatches "change" event.

To specify a different event:

## Example 1b

```html
<host-element>
    #shadow
        <input be-invoking='of do something on input.'>
</host-element>
```