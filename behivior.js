const dependencyPart = String.raw `^(?<dependencyPart>.*)`;
const dssKeys = [['dependencyPart', 'remoteSpecifiers[]']];
export const emc = {
    base: 'be-invoking',
    map: {
        '0.0': {
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
    importEnh: async () => {
        const { BeInvoking } = await import('./be-invoking.js');
        return BeInvoking;
    }
};
