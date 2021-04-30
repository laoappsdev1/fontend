import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { SocketAPIService } from "./socket-api.service";
import { LocaldataService } from "./localdata.service";
import { Req,EPath,IHeader, EMethod, ILogin} from 'src/app/model/model';
import Swal from 'sweetalert2';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  constructor(public spinner: NgxSpinnerService,public router:Router,private socketAPIService:SocketAPIService,private localdata:LocaldataService) {
    this.income()
   }
   income(){
    this.socketAPIService.wssocket.onmessage = (event)=>{ 
      
      const checkdata = JSON.parse(event.data); 
      console.log(checkdata);
         if(checkdata.status == 0){
          Swal.fire({
            icon: 'error',
            title: 'Login',
            text: 'Some thing went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          })
           return ;
         } 

          switch (checkdata.methods) { 
            case 'login':  
              this.login_success(checkdata.data);
              break;  

            default:
              break;
          }  
    }
   }
 
  login(prame:ILogin){  
    const Data:Req= {
      path:EPath.login,
      data:prame,
      header:{
        m:EMethod.login,
        token:this.localdata.get_token()
      }
    } as Req; 
    this.socketAPIService.sendData(Data);
  }

    login_success(data:any){   
    this.localdata.save_token(data[0]['token']); 
    this.localdata.save_user(data[0]['userLogin']);
    this.localdata.save_userid(data[0]['userId']);
    // this.router.navigate(['/main'], { queryParams: { order: 'popular' } });
    this.router.navigate(['/layout']);
  }




}
