import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BeInvoking extends BE {
    #abortControllers = [];
    detach(detachedElement) {
        for (const ac of this.#abortControllers) {
            ac.abort();
        }
    }
    static get beConfig() {
        return {
            parse: true,
            parseAndCamelize: true,
            isParsedProp: 'isParsed'
        };
    }
    async onCamelized(self) {
        const { of, Of } = self;
        let invokingRules = [];
        if ((of || Of) !== undefined) {
            const { prsOf } = await import('./prsOf.js');
            invokingRules = prsOf(self);
        }
        return {
            invokingRules
        };
    }
    async hydrate(self) {
        return {
            resolved: true,
        };
    }
}
const tagName = 'be-invoking';
const ifWantsToBe = 'invoking';
const upgrade = '*';
const xe = new XE({
    config: {
        tagName,
        isEnh: true,
        propDefaults: {
            ...propDefaults,
        },
        propInfo: {
            ...propInfo,
        },
        actions: {}
    },
    superclass: BeInvoking
});
register(ifWantsToBe, upgrade, tagName);
