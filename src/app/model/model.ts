export class Res{
  path:EPath;
  Message:string;
  status:number;
  Data:Array<any>;
}
export class Req{
  path:EPath;
  header:IHeader;
  userid:number;
  data:any;
}


export interface IHeader{
  m:EMethod;
  token:string;
  uuid:string;
  userid:number;
}

export enum EPath{
  login='login',
  logout='logout',
  adduser='adduser',
  province='province',
  district='district',
  village='village',
  admin='admin',
  schools='schools',
  employee='employee',
  teacher='teacher',
  followteacher='followteacher',
  teachertimetable='teachertimetable',
  student='student',
  object='object',
  subject='subject',
  classroom='classroom',
  level='level',
  studentlevel='studentlevel',
  followstudent='followstudent',
  years='years',
  month='month',
  score='score',
  family='family',
  semester='semester',
  semesterdetail='semesterdetail',
  setting='setting',
  term='term',
  child='child',
  bills='bills',
  billsdetail='billsdetail',
}

export enum EMethod{
  login='login',
  logout='logout',
  create='create',
  update='update',
  delete='delete',
  view='view',
  viewall='viewall',
  viewallbypid='viewallbypid',
  viewbydistrictid='viewbydistrictid',
}


export interface ISchools{
  id:number;
  username:string;
  password:string;
  status:string;
  name:string;
  tel:number;
  email:string;
  image:string;
  address:string;
  description:string;
  superadmin_id:number;
}

export interface ILogin{
  username:string;
  password:string;
}
// export interface IInputProvince {
//   command: EMethod;
//   id: number // -1
// }

export interface IProvince{
  id:number;
  name:string;
}

export interface IDistrict{
  id:number;
  province_id:number;
  name:string;
}

export interface IVillage{
  id:number;
  province_id:number;
  district_id:number;
  name:string;
}



