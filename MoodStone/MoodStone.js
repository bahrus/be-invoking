import '../SoulSearcher/SoulSearcher.js';
export class MoodStone extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    howAmIFeelingAboutToday(self, e) {
        console.log({ self, e });
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = String.raw `
        <div>
            <h3>Example 1a</h3>
            <input disabled be-invoking='howAmIFeelingAboutToday'>
            <h3>Example 1b</h3>
            <input disabled 🕹️='howAmIFeelingAboutToday on change'>
            <h3>Example 1c</h3>
            <soul-searcher -engage-in-second-guessing></soul-searcher>
            <input disabled 🕹️='-engage-in-second-guessing'>
        </div>
        <be-hive></be-hive>
        `;
    }
}
customElements.define('mood-stone', MoodStone);
