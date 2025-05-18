import { Group } from "./Group.model"

export interface Member{
    id:string,
    name:string,
    owe:number,
    owed:number,
    settled:boolean,
    group: Group
}