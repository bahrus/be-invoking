import { BE } from 'be-enhanced/BE.js';
import { dispatchEvent as de } from 'trans-render/positractions/dispatchEvent.js';
class BeInvoking extends BE {
    de = de;
    static config = {};
}
await BeInvoking.bootUp();
export { BeInvoking };
