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
import { ILevel } from 'src/app/model/level.model';

@Injectable({
  providedIn: 'root'
})

export class LevelService {
  public viewLevel: any;
  public viewallLevel: any;

  constructor(
    public spinner: NgxSpinnerService,
    public router: Router,
    private socketAPIService: SocketAPIService,
    private localdata: LocaldataService,
  ) {
    this.income()
  }

  income() {
    this.socketAPIService.getEventmesage.asObservable().subscribe(event => {
      try {
        const checkdata = JSON.parse(event.data);

        if (checkdata.status == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Level',
            text: "Your Search: " + checkdata.message+checkdata.data,
            footer: '<a href>Level have issue?</a>'
          })
          return;
        }

        if (checkdata.path == 'level') { 
          switch (checkdata.methods) {
            case 'viewall':
              this.success(checkdata.data);
              this.viewall_success(checkdata.data)
              break;

            case 'view':
              this.success(checkdata.data);
              this.view_success(checkdata.data)
              break;

            case 'create':
              this.success(checkdata.data);
              this.viewall();
              break;

            case 'update':
              this.success(checkdata.data); 
              this.viewall();
              break;

            case 'delete':
              this.success(checkdata.data); 
              this.viewall();
              break;

            default:
              break;
          }
        } 
      } catch (error) {
        console.error(error);
      }
    }
    )
  }

  viewall() {
    const Data: Req = {
      path: EPath.level,
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


  view(prame: ILevel) {
    const Data: Req = {
      path: EPath.level,
      data: prame,
      header: {
        m: EMethod.view,
        token: this.localdata.get_token()
      }
    } as Req;
    this.socketAPIService.sendData(Data);
  }

  create(prame: ILevel) {
    const Data: Req = {
      path: EPath.level,
      data: prame,
      header: {
        m: EMethod.create,
        token: this.localdata.get_token(),
        uuid: this.localdata.get_uuid(),
        userid: parseInt(this.localdata.get_userid())
      }
    } as Req;
    this.socketAPIService.sendData(Data);
  }

  update(prame: ILevel) {
    const Data: Req = {
      path: EPath.level,
      data: prame,
      header: {
        m: EMethod.update,
        token: this.localdata.get_token(),
        uuid: this.localdata.get_uuid(),
        userid: parseInt(this.localdata.get_userid())
      }
    } as Req;
    this.socketAPIService.sendData(Data);
  }

  delete(parame: ILevel) {
    const Data: Req = {
      path: EPath.level,
      data: parame,
      header: {
        m: EMethod.delete,
        token: this.localdata.get_token(),
        uuid: this.localdata.get_uuid(),
        userid: parseInt(this.localdata.get_userid())
      }
    } as Req;
    this.socketAPIService.sendData(Data);
  }

  public viewallLevelSource=new Subject<any>();
  viewall_success(data: any) {
    this.viewallLevelSource.next(data);
  }

  public viewLevelSource=new Subject<any>();
  view_success(data: any) {
    this.viewLevelSource.next(data);
  }
  
  success(data: any) {
    Swal.fire({
      icon: 'success',
      title: 'Level',
      text: "Success Fully!",
    })
    return;
  };

}

