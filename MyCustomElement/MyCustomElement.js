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
            <input disabled be-invoking='of double it.'>
        </div>
        <be-hive></be-hive>
        `;
    }
}
customElements.define('my-custom-element', MyCustomElement);
