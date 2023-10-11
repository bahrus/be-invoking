import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA} from './types';
import {register} from 'be-hive/register.js';
import {findRealm} from 'trans-render/lib/findRealm.js';

export class BeInvoking extends BE<AP, Actions> implements Actions{
    #abortControllers: Array<AbortController>  = [];
    detach(detachedElement: Element): void {
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
    }

    async hydrate(self: this){
        return {
            resolved: true,
        }
    }
}

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

        }
    },
    superclass: BeInvoking
});

register(ifWantsToBe, upgrade, tagName);