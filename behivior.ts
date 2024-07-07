import {BeHive, EMC, seed, MountObserver} from 'be-hive/be-hive.js';
import {AP} from './types';

const targetsPart = String.raw `^(?<targetsPart>.*)`;
const targetsPartOnEventType = String.raw `${targetsPart} on (?<localEventType>.*)`

const dssKeys = [['targetsPart', 'remoteSpecifiers[]']] as [string, string][];

export const emc: EMC<any, AP> = {
    base: 'be-invoking',
    map: {
        '0.0':{
            instanceOf: 'Object$entences',
            objValMapsTo: '.',
            regExpExts: {
                parsedStatements: [
                    {
                        regExp: targetsPartOnEventType,
                        defaultVals: {},
                        dssKeys,
                    },
                    {
                        regExp: targetsPart,
                        defaultVals: {},
                        dssKeys,
                    }
                ]
            }
        }
    },
    enhPropKey: 'beInvoking',
    importEnh: async() => {
        const {BeInvoking} = await import('./be-invoking.js');
        return BeInvoking;
    }
}

const mose = seed(emc);

MountObserver.synthesize(document, BeHive, mose);