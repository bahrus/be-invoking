export class MoodStone extends HTMLElement {
    howAmIFeelingAboutToday(self, e) {
        console.log({ self, e });
    }
}
customElements.define('mood-stone', MoodStone);
