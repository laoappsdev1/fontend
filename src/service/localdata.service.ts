import { Injectable } from '@angular/core';
import { local } from "../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class LocaldataService {

  constructor() { }

  save_token(token:string){
    localStorage.setItem(local.token,token);
  }

  save_user(user:string){
    localStorage.setItem(local.user,user);
  }

  save_userid(userid:string){
    localStorage.setItem(local.userid,userid);
  }

  get_token(){
    return localStorage.getItem(local.token);
  }

  get_user(){ 
    return  localStorage.getItem(local.user) ;
  }

  get_userid(){ 
    return  localStorage.getItem(local.userid) ;
  }

  unset_token(){ 
    return  localStorage.removeItem(local.token) ;
  }
  
  unset_user(){ 
    return  localStorage.removeItem(local.user) ;
  }

  unset_userid(){ 
    return  localStorage.removeItem(local.userid) ;
  }
}
