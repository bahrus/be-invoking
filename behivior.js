// @ts-check
import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
/** @import {EMC, EventListenerOrFn} from './ts-refs/trans-render/be/types.d.ts' */
/** @import {Actions, PAP,  AP} from './ts-refs/be-invoking/types' */;

const targetsPart = String.raw `^(?<targetsPart>.*)`;
const targetsPartOnEventType = String.raw `${targetsPart} on (?<localEventType>.*)`;

/**
 * @type {Array<[string, string]>}
 */
const dssKeys = [['targetsPart', 'remoteSpecifiers']];

/**
 * @type {Partial<EMC<any, AP>>}
 */
export const emc = {
    base: 'be-invoking',
    map: {
        '0.0': {
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
    importEnh: async () => {
        const { BeInvoking } = await import('./be-invoking.js');
        return BeInvoking;
    }
};
const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);
