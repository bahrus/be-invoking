import {IEnhancement} from 'trans-render/be/types';

export interface EndUserProps extends IEnhancement{

}

export interface AP extends EndUserProps{
    parsedStatements?: Array<InvokingParameters>,
    rawStatements?: Array<string>,
}

export type AllProps = AP;

export type PAP = Partial<AP>

export type ProPAP  = Promise<PAP>

export interface Actions{
}

export interface InvokingParameters {

}