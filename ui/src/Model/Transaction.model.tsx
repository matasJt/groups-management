import { Member } from "./Member.model";

export interface Transact{
    id:string,
    payer:Member,
    amount: number,
    split:string,
    isOwner:boolean
}