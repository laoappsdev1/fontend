import { Inject, Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { SocketAPIService } from "./socket-api.service";
import { LocaldataService } from "./localdata.service";
import { Req, EPath, IHeader, EMethod, ISchools, IProvince, IDistrict, IVillage } from 'src/app/model/model';
import Swal from 'sweetalert2';
import { JsonPipe } from '@angular/common';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})

export class SuperadminService { 

  public viewallsuperadmin: any; 
  public viewsuperadmin: any; 
  static provinceUpdaterSource: any;

  constructor(
    public spinner: NgxSpinnerService,
    public router: Router,
    private socketAPIService: SocketAPIService,
    private localdata: LocaldataService,
  ) {
    this.income()
  }


  income() {
    this.socketAPIService.wssocket.onmessage = (event) => {
      try {
        const checkdata = JSON.parse(event.data);
        console.log(checkdata);
        
        if (checkdata.status == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Super Admin',
            text: "Your Search: " + checkdata.message,
            footer: '<a href>Location have this issue?</a>'
          })
          return;
        }

        if (checkdata.path == 'admin') {
          switch (checkdata.methods) {
            case 'viewall':
              this.viewall_superadmin_success(checkdata.data);
              break;

            case 'view':
              this.view_superadmin_success(checkdata.data);
              break;

            case 'create':
              this.save_superadmin_success(checkdata.data);
              this.updateSuperadminSource();
              break;

            case 'update':
              this.save_superadmin_success(checkdata.data);
              this.updateSuperadminSource();
              break;
              
            case 'delete':
              this.delete_superadmin_success(checkdata.data);
              this.updateSuperadminSource();
              break;

            default:
              break;
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  public superadminupdaterSource = new Subject<any>();
  public updateSuperadminSource() {
    this.superadminupdaterSource.next(1);
  }

  viewall_superadmins() {
    const Data: Req = {
      path: EPath.admin,
      data: {
        'viewall': 'viewall',
      },
      header: {
        m: EMethod.viewall,
        token: this.localdata.get_token()
      }
    } as Req;
    this.socketAPIService.sendData(Data);
  }

  viewall_superadmin_success(data: any) {
    this.viewallsuperadmin = data;
  }

  create_superadmin(param){
    const Data: Req = {
      path: EPath.admin,
      data:param,
      header: {
        m: EMethod.create,
        token: this.localdata.get_token()
      }
    } as Req; 
    this.socketAPIService.sendData(Data);
  }

  update_province(param){
    const Data: Req = {
      path: EPath.admin,
      data:param,
      header: {
        m: EMethod.update,
        token: this.localdata.get_token()
      }
    } as Req;
    this.socketAPIService.sendData(Data);
  }

  save_superadmin_success(data: any) {
    Swal.fire({
      icon: 'success',
      title: 'Province',
      text: "Success Fully!",
    })
    return;
  }
  
  delete_superadmin(param){
    const Data: Req = {
      path: EPath.admin,
      data:param,
      header: {
        m: EMethod.delete,
        token: this.localdata.get_token()
      }
    } as Req;
    this.socketAPIService.sendData(Data);
  }

  delete_superadmin_success(data: any) {
    Swal.fire({
      icon: 'success',
      title: 'User',
      text: "Delete User Success Fully!",
    })
    return;
  }

  view_superadmin(param){
    const Data: Req = {
      path: EPath.admin,
      data:param,
      header: {
        m: EMethod.view,
        token: this.localdata.get_token()
      }
    } as Req; 
    this.socketAPIService.sendData(Data);
  }
  
  view_superadmin_success(data: any) {
    this.viewsuperadmin = data;
  }
}


