import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { SocketAPIService } from "./socket-api.service";
import { LocaldataService } from "./localdata.service";
import { Req, EPath, IHeader, EMethod, ISchools } from 'src/app/model/model';
import Swal from 'sweetalert2';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class MainService {
  public result:any;
  constructor(public spinner: NgxSpinnerService, public router: Router, private socketAPIService: SocketAPIService, private localdata: LocaldataService) {
    this.income()
  }

  income() {
    this.socketAPIService.wssocket.onmessage = (event) => {
      try {  
        const checkdata = JSON.parse(event.data);   
        if (checkdata.status == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Schools',
            text: "User Login "+ checkdata.message,
            footer: '<a href>SChoole have this issue?</a>'
          })
          return;
        } 
        
        switch (checkdata.methods) {
          case 'viewall': 
            this.view_success(checkdata.data);
            // this.spinner.hide()
            break;
  
          case 'view':
            this.view_success(checkdata.data);
            break;
  
          case 'create':
            break;
  
          case 'update':
            break;
  
          case 'delete':
            break;
  
          default:
            break;
        }
      } catch (error) {
          console.error(error);
      }
     
    }
  }

  viewall() {
    const Data: Req = {
      path: EPath.schools,
      data: {
        'viewall': 'viewall',
      },
      header: {
        m: EMethod.viewall,
        token: this.localdata.get_token()
      }
    } as Req;
    this.spinner.show(); 
    this.socketAPIService.sendData(Data);
  }


  view(prame:ISchools){  
    const Data:Req= {
      path:EPath.schools,
      data:{
        'id':prame
      },
      header:{
        m:EMethod.view,
        token:this.localdata.get_token()
      }
    } as Req;
    this.spinner.show();  
    this.socketAPIService.sendData(Data);
  }


  view_success(data: any) {
    this.result=data;
    // console.log("FFFFFFFFFFFF: ",data);
    
    // this.localdata.save_token(data[0]['token']);
    // this.localdata.save_user(data[0]['userLogin'])
    // this.router.navigate(['/main'], { queryParams: { order: 'popular' } });
    // this.router.navigate(['/layout']);
  }
}
