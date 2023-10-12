import { tryParse } from 'be-enhanced/cpu.js';
import { strType } from './be-invoking.js';
const remoteMethodName = String.raw `(?<remoteMethodName>[\w\-]+)`;
const reOfInvokingStatement = [
    {
        regExp: new RegExp(String.raw `^(?<remoteType>${strType})${remoteMethodName}(?<!\\)On(?<localEvent>[\w]+)`),
        defaultVals: {}
    },
    {
        regExp: new RegExp(String.raw `^(?<remoteType>${strType})${remoteMethodName}`),
        defaultVals: {}
    },
    {
        regExp: new RegExp(String.raw `^${remoteMethodName}(?<!\\)On(?<localEvent>[\w]+)`),
        defaultVals: {
            remoteType: '/',
        }
    },
    {
        regExp: new RegExp(String.raw `^${remoteMethodName}`),
        defaultVals: {
            remoteType: '/',
        }
    },
];
export function prsOf(self) {
    const { Of, of } = self;
    const both = [...(Of || []), ...(of || [])];
    const invokeRules = [];
    for (const ofStatement of both) {
        const test = tryParse(ofStatement, reOfInvokingStatement);
        if (test === null)
            throw 'PE';
        invokeRules.push(test);
    }
    return invokeRules;
}
