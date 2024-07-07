import {config as beCnfg} from 'be-enhanced/config.js';
import {BE, BEConfig} from 'be-enhanced/BE.js';
import {IEnhancement,  BEAllProps, EnhancementInfo, EMC} from 'trans-render/be/types';
import { Specifier } from 'trans-render/dss/types';
import {dispatchEvent as de} from 'trans-render/positractions/dispatchEvent.js';
import {Actions, AP} from './types';

class BeInvoking extends BE implements Actions {
    de = de;
    static override config: BEConfig<AP & BEAllProps, Actions & IEnhancement, any> = {
    }
}

interface BeInvoking extends AP{}

await BeInvoking.bootUp();

export {BeInvoking}