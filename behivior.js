import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
const targetsPart = String.raw `^(?<targetsPart>.*)`;
const targetsPartOnEventType = String.raw `${targetsPart} on (?<localEventType>.*)`;
const dssKeys = [['targetsPart', 'remoteSpecifiers[]']];
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
