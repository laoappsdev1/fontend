import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EMethod, EPath, Req } from 'src/app/model/model';
import { ISchools } from 'src/app/model/school.model';
import Swal from 'sweetalert2';
import { LocaldataService } from './localdata.service';
import { SocketAPIService } from './socket-api.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  public viewallschool:any;
  public viewschool:any;


  constructor(
    public socketAPIService:SocketAPIService,
    public localdata:LocaldataService
  ) {
    this.income();
   }

   income() {
    this.socketAPIService.wssocket.onmessage = (event) => {
      try {
        const checkdata = JSON.parse(event.data); 
        if (checkdata.status == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Schools',
            text: "Your Search: " + checkdata.message,
          })
          return;
        }

        if (checkdata.path == 'schools') {
          switch (checkdata.methods) {
            case 'viewall':
              this.viewall_school_success(checkdata.data);
              break;

            case 'view':
              this.view_school_success(checkdata.data);
              break;

            case 'create':
              this.save_school_success(checkdata.data);
              this.updateSchoolSource();
              break;

            case 'update':
              this.save_school_success(checkdata.data);
              this.updateSchoolSource();
              break;

            case 'delete':
              this.delete_school_success(checkdata.data);
              this.updateSchoolSource();
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

  public schoolUpdaterSource = new Subject<any>();
  public updateSchoolSource() {
    this.schoolUpdaterSource.next(1);
  }

  viewall_school() {
    const Data: Req = {
      path: EPath.schools,
      data:{
        viewall:'viewall'
      },
      header: {
        m: EMethod.viewall,
        token: this.localdata.get_token()
      }
    } as Req; 
    this.socketAPIService.sendData(Data);
  }

  viewall_school_success(data:any){
    this.viewallschool=data
  }

  view_school(parame:ISchools) {
    const Data: Req = {
      path: EPath.schools,
      data:parame,
      header: {
        m: EMethod.view,
        token: this.localdata.get_token()
      }
    } as Req; 
    this.socketAPIService.sendData(Data);
  }

  view_school_success(data:any){
    this.viewallschool=data
  }

  create_school(parame:ISchools) {
    const Data: Req = {
      path: EPath.schools,
      data:parame,
      header: {
        m: EMethod.create,
        token: this.localdata.get_token()
      }
    } as Req;  
    this.socketAPIService.sendData(Data);
  }
  save_school_success(data: any) {
    Swal.fire({
      icon: 'success',
      title: 'school',
      text: "save school Success Fully!",
    })
    return;
  };
  
  update_school(parame:ISchools) {
    const Data: Req = {
      path: EPath.schools,
      data:parame,
      header: {
        m: EMethod.update,
        token: this.localdata.get_token()
      }
    } as Req; 
    this.socketAPIService.sendData(Data);
  }

  delete_school(parame:ISchools) {
    const Data: Req = {
      path: EPath.schools,
      data:parame,
      header: {
        m: EMethod.delete,
        token: this.localdata.get_token()
      }
    } as Req; 
    this.socketAPIService.sendData(Data);
  }

  delete_school_success(data: any) {
    Swal.fire({
      icon: 'success',
      title: 'School',
      text: "Delete SuccessFully!",
    })
    return;
  };

}
