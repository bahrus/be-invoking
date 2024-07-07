export class MoodStone extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: 'open'});
    }

    howAmIFeelingAboutToday(self: this, e: Event){
        console.log({self, e});
    }

    connectedCallback(){
        this.shadowRoot!.innerHTML = String.raw `
        <div>
            <h3>Example 1a</h3>
            <input disabled be-invoking='howAmIFeelingAboutToday'>
            <h3>Example 1b</h3>
            <input disabled 🎮='howAmIFeelingAboutToday on change'>
        </div>
        <be-hive></be-hive>
        `;
    }
}

customElements.define('mood-stone', MoodStone);