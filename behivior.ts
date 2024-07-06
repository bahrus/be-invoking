import {BeHive, EMC, seed, MountObserver} from 'be-hive/be-hive.js';
import {AP} from './types';

export const emc: EMC<any, AP> = {
    base: 'be-invoking',
    map: {

    },
    enhPropKey: 'beInvoking',
    importEnh: async() => {
        const {BeInvoking} = await import('./be-invoking.js');
        return BeInvoking;
    }
}