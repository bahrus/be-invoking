import {AP, ProPAP, PAP, InvokeRule} from './types';
import {ElTypes} from 'be-linked/types';
import {RegExpOrRegExpExt} from 'be-enhanced/types';
import {arr, tryParse} from 'be-enhanced/cpu.js';

const reOfInvokingStatement: Array<RegExpOrRegExpExt<InvokeRule>> = [

];

export function prsOf(self: AP) : Array<InvokeRule> {
    const {Of, of} = self;
    const both = [...(Of || []), ...(of || [])];
    const invokeRules: Array<InvokeRule> = [];
    for(const ofStatement of both){
        const test = tryParse(ofStatement, reOfInvokingStatement) as InvokeRule;
        if(test === null) throw 'PE';
        invokeRules.push(test);
    }
    return invokeRules;
}