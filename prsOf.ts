import {AP, ProPAP, PAP, InvokeRule} from './types';
import {ElTypes} from 'be-linked/types';
import {RegExpOrRegExpExt} from 'be-enhanced/types';
import {arr, tryParse} from 'be-enhanced/cpu.js';
import {strType} from './be-invoking.js';

const remoteMethodName = String.raw `(?<remoteMethodName>[\w\-]+)`;

const localEvent = String.raw `(?<!\\)On(?<localEvent>[\w]+)`;

const remoteType = String.raw `(?<remoteType>${strType})`;

const reOfInvokingStatement: Array<RegExpOrRegExpExt<Partial<InvokeRule>>> = [
    {
        regExp: new RegExp(String.raw `^${remoteType}${remoteMethodName}${localEvent}`),
        defaultVals:{}
    },
    {
        regExp: new RegExp(String.raw `^${remoteType}${remoteMethodName}`),
        defaultVals:{}
    },
    {
        regExp: new RegExp(String.raw `^${remoteMethodName}${localEvent}`),
        defaultVals:{
            remoteType: '/',
        }
    },
    {
        regExp: new RegExp(String.raw `^${remoteMethodName}`),
        defaultVals:{
            remoteType: '/',
        }
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