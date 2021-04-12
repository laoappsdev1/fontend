export class Res{
  path:EPath;
  Message:string;
  status:number;
  Data:Array<any>;
}
export class Req{
  path:EPath;
  header:IHeader;
  Message:string;
  Data:Array<any>;
}

export interface IHeader{
  m:EMethod;
  token:string;
  uuid:string;
}

export enum EPath{
  login='login',
  logout='logout',
  adduser='adduser',
  level ='level'
}
export enum EMethod{
  viewall='viewall',
}

