import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, InvokeRule} from './types';
import {register} from 'be-hive/register.js';
import {nudge} from 'trans-render/lib/nudge.js';
import {ElTypes, SignalInfo} from 'be-linked/types';
import {getDefaultSignalInfo} from 'be-linked/getDefaultSignalInfo.js';

export class BeInvoking extends BE<AP, Actions> implements Actions{
    #abortControllers: Array<AbortController>  = [];
    detach(): void {
        for(const ac of this.#abortControllers){
            ac.abort();
        }
    }
    static override get beConfig(){
        return {
            parse: true,
            parseAndCamelize: true,
            isParsedProp: 'isParsed'
        } as BEConfig;
    }

    async onCamelized(self: this): ProPAP {
        const {of, Of} = self;
        let invokingRules: Array<InvokeRule> = [];
        if((of || Of) !== undefined){
            const {prsOf} = await import('./prsOf.js');
            invokingRules = prsOf(self);
        }
        return {
            invokingRules
        };
    }

    async hydrate(self: this){
        const {enhancedElement, invokingRules} = self;
        for(const rule of invokingRules!){
            const {localEvent} = rule;
            let signalInfo: SignalInfo | undefined;
            if(localEvent){
                signalInfo = {
                    eventTarget: enhancedElement,
                    type: localEvent,
                }
            }else{
                signalInfo = getDefaultSignalInfo(enhancedElement);
            }
            const {eventTarget, type} = signalInfo;
            eventTarget.addEventListener(type, async e => {
                let {remoteRef, remoteMethodName} = rule;
                let ref = remoteRef?.deref();
                if(ref === undefined){
                    const {remoteType} = rule;
                    const {getRemoteEl} = await import('be-linked/getRemoteEl.js');
                    ref = await getRemoteEl(enhancedElement, remoteType as ElTypes, remoteMethodName);
                    rule.remoteRef = new WeakRef(ref);
                }
                const {lispToCamel} = await import('trans-render/lib/lispToCamel.js');
                const newRemoteMethodName = lispToCamel(remoteMethodName);
                (<any>ref)[newRemoteMethodName](ref, e);
            });
        }
        nudge(enhancedElement);
        return {
            resolved: true,
        }
    }
}



export const strType = String.raw `\/|\-`;

export interface BeInvoking extends AllProps{}

const tagName = 'be-invoking';
const ifWantsToBe = 'invoking';
const upgrade = '*';

const xe = new XE<AP, Actions>({
    config:{
        tagName,
        isEnh: true,
        propDefaults:{
            ...propDefaults,
        },
        propInfo:{
            ...propInfo,
        },
        actions:{
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