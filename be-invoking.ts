import {config as beCnfg} from 'be-enhanced/config.js';
import {BE, BEConfig} from 'be-enhanced/BE.js';
import {IEnhancement,  BEAllProps, EnhancementInfo, EMC} from 'trans-render/be/types';
import { Specifier } from 'trans-render/dss/types';
import {dispatchEvent as de} from 'trans-render/positractions/dispatchEvent.js';
import {Actions, AP, InvokingParameters, PAP} from './types';

class BeInvoking extends BE implements Actions {
    de = de;
    static override config: BEConfig<AP & BEAllProps, Actions & IEnhancement, any> = {
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
    }

    #abortControllers: AbortController[] = [];

    async hydrate(self: this){
        const {parsedStatements, enhancedElement} = self;
        const {nudge} = await import('trans-render/lib/nudge.js');
        for(const parsedStatement of parsedStatements!){
            let {localEventType} = parsedStatement;
            if(localEventType === undefined){
                const {getLocalSignal} = await import('be-linked/defaults.js');
                const ls = await getLocalSignal(enhancedElement);
                localEventType = ls.type;
            }
            const ac = new AbortController();
            this.#abortControllers.push(ac);
            enhancedElement.addEventListener(localEventType, e => {
                this.#invokeRemoteMethods(parsedStatement, enhancedElement, e);
            }, {signal: ac.signal});
        }
        nudge(enhancedElement);
        return {
            resolved: true
        } as PAP;
    }

    async #invokeRemoteMethods(parsedStatement: InvokingParameters, enhancedElement: Element, event: Event){
        const {remoteSpecifiers} = parsedStatement;
        const {find} = await import('trans-render/dss/find.js');
        for(const remoteSpecifier of remoteSpecifiers){
            const remoteTarget = await find(enhancedElement, remoteSpecifier);
            const {prop} = remoteSpecifier;
            (<any>remoteTarget)[prop!](remoteTarget, event);
        }
    }
}

interface BeInvoking extends AP{}

await BeInvoking.bootUp();

export {BeInvoking}