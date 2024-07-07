import {BeHive, EMC, seed, MountObserver} from 'be-hive/be-hive.js';
import {AP} from './types';

const dependencyPart = String.raw `^(?<dependencyPart>.*)`; 

const dssKeys = [['dependencyPart', 'remoteSpecifiers[]']] as [string, string][];

export const emc: EMC<any, AP> = {
    base: 'be-invoking',
    map: {
        '0.0':{
            instanceOf: 'Object$entences',
            objValMapsTo: '.',
            regExpExts: {
                parsedStatements: [
                    {
                        regExp: dependencyPart,
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