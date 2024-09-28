// @ts-check
import { BE } from 'be-enhanced/BE.js';
import { propInfo, resolved, rejected } from 'be-enhanced/cc.js';
import { dispatchEvent as de } from 'trans-render/positractions/dispatchEvent.js';

/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP, AP, BAP, ObservingParameters} from './ts-refs/be-invoking/types' */

class BeInvoking extends BE {
    de = de;
    /**
     * @type {BEConfig<BAP, Actions & IEnhancement, any>}
     */
    static config = {
        propInfo: {
            ...propInfo,
            parsedStatements: {},
            rawStatements: {},
        },
        actions: {
            hydrate: {
                ifAllOf: ['parsedStatements']
            }
        },
        positractions: [
            resolved, rejected
        ]
    };
    #abortControllers = [];
    #cache = new Map();
    async hydrate(self) {
        const { parsedStatements, enhancedElement } = self;
        const { nudge } = await import('trans-render/lib/nudge.js');
        for (const parsedStatement of parsedStatements) {
            let { localEventType } = parsedStatement;
            if (localEventType === undefined) {
                const { getLocalSignal } = await import('be-linked/defaults.js');
                const ls = await getLocalSignal(enhancedElement);
                localEventType = ls.type;
            }
            const ac = new AbortController();
            this.#abortControllers.push(ac);
            enhancedElement.addEventListener(localEventType, e => {
                this.#invokeRemoteMethods(parsedStatement, enhancedElement, e);
            }, { signal: ac.signal });
        }
        nudge(enhancedElement);
        return {
            resolved: true
        };
    }
    async #invokeRemoteMethods(parsedStatement, enhancedElement, event) {
        const { remoteSpecifiers } = parsedStatement;
        const { find } = await import('trans-render/dss/find.js');
        for (const remoteSpecifier of remoteSpecifiers) {
            let remoteTarget = this.#cache.get(remoteSpecifier)?.deref();
            if (remoteTarget === undefined) {
                remoteTarget = await find(enhancedElement, remoteSpecifier);
                if (!remoteTarget)
                    throw 404;
                this.#cache.set(remoteSpecifier, new WeakRef(remoteTarget));
            }
            const { prop } = remoteSpecifier;
            remoteTarget[prop](remoteTarget, event);
        }
    }
}
await BeInvoking.bootUp();
export { BeInvoking };
