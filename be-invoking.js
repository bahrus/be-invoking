import { config as beCnfg } from 'be-enhanced/config.js';
import { BE } from 'be-enhanced/BE.js';
import { dispatchEvent as de } from 'trans-render/positractions/dispatchEvent.js';
class BeInvoking extends BE {
    de = de;
    static config = {
        propInfo: {
            ...beCnfg.propInfo,
            parsedStatements: {},
            rawStatements: {},
        },
        actions: {
            hydrate: {
                ifAllOf: ['parsedStatements']
            }
        }
    };
    #abortControllers = [];
    async hydrate(self) {
        const { parsedStatements, enhancedElement } = self;
        const { nudge } = await import('trans-render/lib/nudge.js');
        for (const parsedStatement of parsedStatements) {
            let { localEventType } = parsedStatement;
            if (localEventType === undefined) {
                const { getLocalSignal } = await import('be-linked/defaults.js');
                const ls = await getLocalSignal(enhancedElement);
                localEventType = ls.type;
                const ac = new AbortController();
                this.#abortControllers.push(ac);
                enhancedElement.addEventListener(localEventType, e => {
                    this.#invokeRemoteMethods(parsedStatement, enhancedElement);
                }, { signal: ac.signal });
            }
        }
        nudge(enhancedElement);
        return {
            resolved: true
        };
    }
    async #invokeRemoteMethods(parsedStatement, enhancedElement) {
        const { remoteSpecifiers } = parsedStatement;
        const { find } = await import('trans-render/dss/find.js');
        for (const remoteSpecifier of remoteSpecifiers) {
            const remoteTarget = await find(enhancedElement, remoteSpecifier);
        }
    }
}
await BeInvoking.bootUp();
export { BeInvoking };
