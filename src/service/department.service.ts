import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { SocketAPIService } from "./socket-api.service";
import { LocaldataService } from "./localdata.service";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private object:string = 'department';
  public list_department:any;
  public item_department:any;

  constructor(public spinner: NgxSpinnerService,public router:Router,private socketAPIService:SocketAPIService,private localdata:LocaldataService) {
    
    this.income()
   }

   income(){
    this.socketAPIService.wssocket.onmessage = (event)=>{
      const js = JSON.parse(event.data);
      console.log(js);
      const checkdata = js;

      if(checkdata.object == this.object){
         //echeck login 
         if(checkdata.status == 0){

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          })
          this.spinner.hide()
           return 
         }
          switch (checkdata.method) {
            case 'get':

              this.department_list_success(checkdata.data);
              this.spinner.hide()
              break;

            case 'create':

              this.create_department_success(checkdata.data);
              this.spinner.hide()
              
              
              break;

            case 'getById':

                this.getitem_success(checkdata.data);
                this.spinner.hide()
                
                
              break;

            case 'update':

                this.update_success(checkdata.data);
                this.spinner.hide()
                
                
              break;
            case 'delete':

                this.delete_success(checkdata.data);
                this.spinner.hide()
                
                
              break;
            //check receive message
            default:
              break;
          }

      }
     
    }
   }

   create_department(prame:any){
    prame.jwt = this.localdata.get_token()
    const data = {
      object : this.object,
      method : 'create',
      data: prame
    }
    console.log(data);
    
    this.spinner.show();
    this.socketAPIService.wssocket.send(JSON.stringify(data))
  }

  create_department_success(data:any){
    this.router.navigate(['main/manage/Department/list'])
  }

  department_list(prame:any){
    prame.jwt = this.localdata.get_token()
    const data = {
      object : this.object,
      method : 'get',
      data: prame
    }
    this.spinner.show();
    this.socketAPIService.sendData(data)
  }

  department_list_success(data:any){

    this.list_department = data
  console.log(this.list_department);

    // this.router.navigate(['/main'], { queryParams: { order: 'popular' } });
    //this.router.navigate(['/main']);
  }

  getitem(prame){
    prame.jwt = this.localdata.get_token()
    const data = {
      object : this.object,
      method : 'getById',
      data: prame
    }
    this.spinner.show();
    this.socketAPIService.sendData(data)
  }

  getitem_success(data:any){
    this.item_department = data.department;
  }

  update(prame:any){
    prame.jwt = this.localdata.get_token()
    const data = {
      object : this.object,
      method : 'update',
      data: prame
    }
    console.log(data);
    
    this.spinner.show();
    this.socketAPIService.wssocket.send(JSON.stringify(data))
  }

  update_success(data:any){
    this.router.navigate(['main/manage/Department/list'])
  }


  delete(prame:any){
    prame.jwt = this.localdata.get_token()
    const data = {
      object : this.object,
      method : 'delete',
      data: prame
    }
    console.log(data);
    
    this.spinner.show();
    this.socketAPIService.wssocket.send(JSON.stringify(data))
  }

  delete_success(data:any){
    this.router.navigate(['main/manage/Department/list'])
  }




}
