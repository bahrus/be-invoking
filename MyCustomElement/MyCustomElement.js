import '../MyPeerElement/MyPeerElement.js';
export class MyCustomElement extends HTMLElement {
    #someNumProp = 23;
    get someNumProp() {
        return this.#someNumProp;
    }
    set someNumProp(nv) {
        this.#someNumProp = nv;
        const strVal = nv === undefined ? '' : nv.toLocaleString();
        const div = this.shadowRoot?.querySelector('#someNumPropVal');
        if (div !== null && div !== undefined)
            div.textContent = strVal;
    }
    doubleIt() {
        this.someNumProp = 2 * this.someNumProp;
    }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = String.raw `
        <div itemscope>
            <div  id=someNumPropVal></div>
            <h3>Example 1a</h3>
            <input disabled be-invoking='of double it.'>
            <h3>Example 1b</h3>
            <input be-invoking='of double it on change.'>
            <h3>Example 2</h3>
            <peer-element -negate-it></peer-element>
            <input be-invoking='of -negate-it'> 
        </div>
        <be-hive></be-hive>
        `;
    }
}
customElements.define('my-custom-element', MyCustomElement);
