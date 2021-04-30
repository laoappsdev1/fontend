import { Inject, Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { SocketAPIService } from "./socket-api.service";
import { LocaldataService } from "./localdata.service";
import { Req, EPath, IHeader, EMethod, ISchools, IProvince,IDistrict, IVillage } from 'src/app/model/model';
import Swal from 'sweetalert2';
import { JsonPipe } from '@angular/common';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})

export class LocaionService {
  public provinceviewalls: any;
  public districtviewalls: any;
  public villageviewalls: any;
  public views: any;
  public viewsDistrict: any;

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

        if (checkdata.status == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Location',
            text: "Your Search: " + checkdata.message,
            footer: '<a href>Location have this issue?</a>'
          })
          return;
        }

        if (checkdata.path == 'province') {

          switch (checkdata.methods) {
            case 'viewall':
              this.viewall_province_success(checkdata.data);
              break;

            case 'view':
              this.view_province_success(checkdata.data);
              break;

            case 'create':
              this.province_success(checkdata.data);
              this.updateProvinceSource();
              break;

            case 'update':
              this.province_success(checkdata.data);
              this.updateProvinceSource();
              break;

            case 'delete':
              this.province_success(checkdata.data);
              this.updateProvinceSource();
              break;

            default:
              break;
          }
        } else if (checkdata.path == 'district') {

          switch (checkdata.methods) {
            case 'viewallbypid':
              this.viewallbypid_district_success(checkdata.data);
              break;

            case 'view':
              this.view_district_success(checkdata.data);
              break;

            case 'create': 
              this.district_success(checkdata.data);
              // this.updatedistrictSource();
              break;

            case 'update':
              this.province_success(checkdata.data);
              this.updatedistrictSource();
              break;

            case 'delete':
              this.province_success(checkdata.data);
              this.updatedistrictSource();
              break;

            default:
              break;
          }
        }else if (checkdata.path == 'village') {

          switch (checkdata.methods) {
            case 'viewbydistrictid':
              this.viewbydistrictid_village_success(checkdata.data);
              break;

            case 'view':
              this.view_district_success(checkdata.data);
              break;

            case 'create': 
              this.district_success(checkdata.data);
              // this.updatedistrictSource();
              break;

            case 'update':
              this.province_success(checkdata.data);
              this.updatedistrictSource();
              break;

            case 'delete':
              this.province_success(checkdata.data);
              this.updatedistrictSource();
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


  public provinceUpdaterSource = new Subject<any>();
  public updateProvinceSource() {
    this.provinceUpdaterSource.next(1);
  }
  
  public districtUpdaterSource = new Subject<any>();
  public updatedistrictSource() {
    this.districtUpdaterSource.next(1);
  }


  viewall_province() {
    const Data: Req = {
      path: EPath.province,
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


  view_province(prame: IProvince) {
    const Data: Req = {
      path: EPath.province,
      data: prame,
      header: {
        m: EMethod.view,
        token: this.localdata.get_token()
      }
    } as Req; 
    this.socketAPIService.sendData(Data);
  }

  create_province(prame: IProvince) {
    const Data: Req = {
      path: EPath.province,
      data: prame,
      header: {
        m: EMethod.create,
        token: this.localdata.get_token()
      }
    } as Req; 
    this.socketAPIService.sendData(Data);
  }

  update_province(prame: IProvince) {
    const Data: Req = {
      path: EPath.province,
      data: prame,
      header: {
        m: EMethod.update,
        token: this.localdata.get_token()
      }
    } as Req;
    this.socketAPIService.sendData(Data);
  }

  delete_province(parame: IProvince) {
    const Data: Req = {
      path: EPath.province,
      data: parame,
      header: {
        m: EMethod.delete,
        token: this.localdata.get_token()
      }
    } as Req;
    this.socketAPIService.sendData(Data);
  }
  

  viewall_province_success(data: any) {
    this.provinceviewalls = data;
  }

  //source
  public provinceViewSource = new Subject<any>();

  //updater
  // public proviceViewUpdater = this.provinceViewSource.asObservable();

  view_province_success(data: any) {
    this.views = data;
    this.provinceViewSource.next(data);
  }


  public districtViewSource = new Subject<any>();
  view_district_success(data: any) {
    this.views = data;
    this.districtViewSource.next(data);
  }
  
  
  public villageViewSource = new Subject<any>();
  view_village_success(data: any) {
    this.views = data;
    this.villageViewSource.next(data);
  }

  province_success(data: any) {
    Swal.fire({
      icon: 'success',
      title: 'Province',
      text: "Success Fully!",
    })
    return;
  };

  district_success(data: any) {
    Swal.fire({
      icon: 'success',
      title: 'Province',
      text: "Success Fully!",
    })
    return;
  };



  create_district(prame: IDistrict) {
    const Data: Req = {
      path: EPath.district,
      data: prame,
      header: {
        m: EMethod.create,
        token: this.localdata.get_token()
      }
    } as Req;  
    this.socketAPIService.sendData(Data);
  }

  update_district(prame: IDistrict) {
    const Data: Req = {
      path: EPath.district,
      data: prame,
      header: {
        m: EMethod.update,
        token: this.localdata.get_token()
      }
    } as Req; 
    this.socketAPIService.sendData(Data);
  }

  delete_district(parame: IDistrict) {
    const Data: Req = {
      path: EPath.district,
      data: parame,
      header: {
        m: EMethod.delete,
        token: this.localdata.get_token()
      }
    } as Req;
    this.socketAPIService.sendData(Data);
  }

  view_district(prame: IDistrict) {
    const Data: Req = {
      path: EPath.district,
      data: prame,
      header: {
        m: EMethod.view,
        token: this.localdata.get_token()
      }
    } as Req;  
    this.socketAPIService.sendData(Data);
  }

  viewall_Deistrict(parame:IDistrict) {
    const Data: Req = {
      path: EPath.district,
      data:parame,
      header: {
        m: EMethod.viewallbypid,
        token: this.localdata.get_token()
      }
    } as Req; 
    this.socketAPIService.sendData(Data);
  }

  
  viewallbypid_district_success(data: any) {
    this.districtviewalls = data;
  }
  

  viewall_Village(parame:IVillage) {
    const Data: Req = {
      path: EPath.village,
      data:parame,
      header: {
        m: EMethod.viewbydistrictid,
        token: this.localdata.get_token()
      }
    } as Req; 
    this.socketAPIService.sendData(Data);
  }

  delete_village(parame: IVillage) {
    const Data: Req = {
      path: EPath.village,
      data: parame,
      header: {
        m: EMethod.delete,
        token: this.localdata.get_token()
      }
    } as Req;
    this.socketAPIService.sendData(Data);
  }

  view_village(prame: IVillage) {
    const Data: Req = {
      path: EPath.village,
      data: prame,
      header: {
        m: EMethod.view,
        token: this.localdata.get_token()
      }
    } as Req;  
    this.socketAPIService.sendData(Data);
  }

  create_village(prame: IVillage) {
    const Data: Req = {
      path: EPath.village,
      data: prame,
      header: {
        m: EMethod.create,
        token: this.localdata.get_token()
      }
    } as Req;  
    this.socketAPIService.sendData(Data);
  }

  update_village(prame: IVillage) {
    const Data: Req = {
      path: EPath.village,
      data: prame,
      header: {
        m: EMethod.update,
        token: this.localdata.get_token()
      }
    } as Req; 
    this.socketAPIService.sendData(Data);
  }

  viewbydistrictid_village_success(data: any) {
    this.villageviewalls = data;
  }

}

