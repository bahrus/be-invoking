export const emc = {
    base: 'be-invoking',
    map: {},
    enhPropKey: 'beInvoking',
    importEnh: async () => {
        const { BeInvoking } = await import('./be-invoking.js');
        return BeInvoking;
    }
};
