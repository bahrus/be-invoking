import  '../SoulSearcher/SoulSearcher.js';
export class MoodStone extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: 'open'});
    }

    #invokeCount = 0;
    get invokeCount(){
        return this.#invokeCount;
    }

    howAmIFeelingAboutToday(self: this, e: Event){
        this.#invokeCount++;
        console.log({self, e});
    }

    connectedCallback(){
        this.shadowRoot!.innerHTML = String.raw `
        <soul-searcher -engage-in-second-guessing></soul-searcher>
        <div>
            <h3>Example 1a</h3>
            <input disabled be-invoking=howAmIFeelingAboutToday>
            <h3>Example 1b</h3>
            <input disabled 🕹️='howAmIFeelingAboutToday on change'>
            <h3>Example 1c</h3>
            <input disabled 🕹️=-engage-in-second-guessing>
            <h3>Example 1d</h3>
            <input disabled 🕹️=~soulSearcher:engageInSecondGuessing>
        </div>
        <be-hive></be-hive>
        `;
    }
}

customElements.define('mood-stone', MoodStone);