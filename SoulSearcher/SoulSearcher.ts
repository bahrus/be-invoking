export class SoulSearcher extends HTMLElement {
    engageInSecondGuessing(self: this, e: Event){
        console.log({self, e});
    }
}

customElements.define('soul-searcher', SoulSearcher);