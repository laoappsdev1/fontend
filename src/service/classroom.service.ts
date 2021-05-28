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
import { IClassroom } from 'src/app/model/classroom.model';

@Injectable({
  providedIn: 'root'
})

export class ClassroomService {
  public viewClassroom: any;
  public viewallClassroom: any;

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
            title: 'Classroom',
            text: "Your Search: " + checkdata.message+checkdata.data,
            footer: '<a href>classroom have issue?</a>'
          })
          return;
        }

        if (checkdata.path == 'classroom') {

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
      path: EPath.classroom,
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


  view(prame: IClassroom) {
    const Data: Req = {
      path: EPath.classroom,
      data: prame,
      header: {
        m: EMethod.view,
        token: this.localdata.get_token(),
        uuid: this.localdata.get_uuid(),
        userid: parseInt(this.localdata.get_userid())
      }
    } as Req;
    this.socketAPIService.sendData(Data);
  }

  create(prame: IClassroom) {
    const Data: Req = {
      path: EPath.classroom,
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

  update(prame: IClassroom) {
    const Data: Req = {
      path: EPath.classroom,
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

  delete(parame: IClassroom) {
    const Data: Req = {
      path: EPath.classroom,
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

  public viewallClassroomSource=new Subject<any>();
  viewall_success(data: any) {
    this.viewallClassroomSource.next(data);
  }

  public viewClassroomSource=new Subject<any>();
  view_success(data: any) {
    this.viewClassroomSource.next(data);
  }
  
  success(data: any) {
    Swal.fire({
      icon: 'success',
      title: 'Classroom',
      text: "Success Fully!",
    })
    return;
  };

}

