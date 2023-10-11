import { tryParse } from 'be-enhanced/cpu.js';
import { strType } from './be-invoking.js';
const reOfInvokingStatement = [
    {
        regExp: new RegExp(String.raw `^(?<remoteType>${strType})(?<remoteMethodName>[\w]+)(?<!\\)Of(?<localEvent>[\w]+)`),
        defaultVals: {}
    },
    {
        regExp: new RegExp(String.raw `^(?<remoteType>${strType})(?<remoteMethodName>[\w]+)`),
        defaultVals: {}
    },
    {
        regExp: new RegExp(String.raw `^(?<remoteMethodName>[\w]+)`),
        defaultVals: {}
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
