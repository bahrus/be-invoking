import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';
import {ElTypes, SignalRefType, SignalContainer} from 'be-linked/types';

export interface EndUserProps extends IBE{
    Of?: Array<OfStatement>,
    of?: Array<OfStatement>
}

export interface AllProps extends EndUserProps{
    isParsed?: boolean,
}

export type OfStatement = string;

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>];

export interface Actions{
    onCamelized(self: this): ProPAP;
    hydrate(self: this): ProPAP;
}

export interface InvokeRule {
    localEvent?: string,
    remoteMethodName?: string,
}