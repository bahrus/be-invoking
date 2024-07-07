export class MoodStone extends HTMLElement {
    howAmIFeelingAboutToday(self: this, e: Event){
        console.log({self, e});
    }
}

customElements.define('mood-stone', MoodStone);