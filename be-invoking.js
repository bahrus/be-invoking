import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
import { nudge } from 'trans-render/lib/nudge.js';
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
        const { enhancedElement, invokingRules } = self;
        for (const rule of invokingRules) {
            const { localEvent } = rule;
            enhancedElement.addEventListener(localEvent, async (e) => {
                let { remoteRef, remoteMethodName } = rule;
                let ref = remoteRef?.deref();
                if (ref === undefined) {
                    const { remoteType } = rule;
                    const { getRemoteEl } = await import('be-linked/getRemoteEl.js');
                    ref = await getRemoteEl(enhancedElement, remoteType, remoteMethodName);
                    rule.remoteRef = new WeakRef(ref);
                }
                ref[remoteMethodName](ref, e);
            });
        }
        nudge(enhancedElement);
        return {
            resolved: true,
        };
    }
}
export const strType = String.raw `\/|\-`;
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
        actions: {
            onCamelized: {
                ifAllOf: ['isParsed'],
                ifAtLeastOneOf: ['of', 'Of']
            },
            hydrate: 'invokingRules'
        }
    },
    superclass: BeInvoking
});
register(ifWantsToBe, upgrade, tagName);
