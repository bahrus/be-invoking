import { tryParse } from 'be-enhanced/cpu.js';
const reOfInvokingStatement = [];
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
