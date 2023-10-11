import {AP, ProPAP, PAP, InvokeRule} from './types';
import {ElTypes} from 'be-linked/types';
import {RegExpOrRegExpExt} from 'be-enhanced/types';
import {arr, tryParse} from 'be-enhanced/cpu.js';
import {strType} from './be-invoking.js';

const reOfInvokingStatement: Array<RegExpOrRegExpExt<Partial<InvokeRule>>> = [
    {
        regExp: new RegExp(String.raw `^(?<remoteType>${strType})(?<remoteMethodName>[\w]+)(?<!\\)Of(?<localEvent>[\w]+)`),
        defaultVals:{}
    },
    {
        regExp: new RegExp(String.raw `^(?<remoteType>${strType})(?<remoteMethodName>[\w]+)`),
        defaultVals:{}
    },
    {
        regExp: new RegExp(String.raw `^(?<remoteMethodName>[\w]+)`),
        defaultVals:{}
    },
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