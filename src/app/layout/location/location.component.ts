import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { LocaionService } from 'src/service/locaion.service';
import { EMethod, IDistrict, IProvince, IVillage } from 'src/app/model/model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';
import { ProvinceComponent } from './province/province.component';
import { DistrictComponent } from './district/district.component';
import { VillageComponent } from './village/village.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, OnDestroy {
  public province: string;
  public subs: Array<Subscription> = [];
  public loading = false;
  constructor(public location: LocaionService, public dialog: MatDialog) {

  }
  ngOnDestroy() {
    this.subs.forEach(v => {
      v.unsubscribe();
    })
  }
  ngOnInit() {
    this.location.viewall_province();
    this.subs.push(
      this.location.provinceUpdaterSource.asObservable().subscribe(r => {
        try {
          console.log('province update', r);
          if (!r) return;
          this.location.viewall_province();
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      }, e => {
        console.error(e);
      })
    );
  }


  createProvince() {
    const dialogRef = this.dialog.open(ProvinceComponent, {
      width: '450px',
      data:{
        name: EMethod.create
        // , id: param
      } as IProvince
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //  this.animal = result;
    });
  }

  updateProvince(param) {
    const dialogRef = this.dialog.open(ProvinceComponent, {
      width: '450px',
      data: {
        name: EMethod.update,
        id: param
      } as IProvince
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //  this.animal = result;
    });
  }

  deleteProvince(id: number) {
    let pname = '';
    for (let index = 0; index < this.location.provinceviewalls.length; index++) {
      const element = this.location.provinceviewalls[index];
      if (element.id == id) {
        pname = element.name;
        break;
      }
    }

    const province: IProvince = {} as IProvince;
    province.id = id;
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '450px',
      data: pname
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.location.delete_province(province);
      } else {
        console.log('The dialog was close!');
      }

    });
  }


  updateDistrict(param,Pid) { 
    const dialogRef = this.dialog.open(DistrictComponent, {
      width: '450px',
      data: {
        name: EMethod.update,
        province_id: Pid,
        id: param
      } as IDistrict
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //  this.animal = result;
    });
  }
  updateVillage(Vid,Did) { 
    let Pid =0;
    for (let index = 0; index < this.location.districtviewalls.length; index++) {
      const element = this.location.districtviewalls[index];
      if (element.id == Did) {
        Pid = element.province_id;
        break;
      }
    }
    const dialogRef = this.dialog.open(VillageComponent, {
      width: '450px',
      data: {
        name: EMethod.update,
        district_id: Did,
        province_id: Pid,
        id: Vid
      } as IVillage
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //  this.animal = result;
    });
  }


  viewDistrict(param){
    const district: IDistrict = {} as IDistrict;
    district.province_id = param;
    this.location.viewall_Deistrict(district);
  }

  createDistrict(param) {  
    const dialogRef = this.dialog.open(DistrictComponent, {
      width: '550px',
      data: {
        name: EMethod.create ,
        province_id:param
      } as IDistrict
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //  this.animal = result;
    });
  }

  deleteDistrict(id: number) {
    let dname = '';
    for (let index = 0; index < this.location.districtviewalls.length; index++) {
      const element = this.location.districtviewalls[index];
      if (element.id == id) {
        dname = element.name;
        break;
      }
    }
    
    const district: IDistrict = {} as IDistrict;
    district.id = id;
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '450px',
      data: dname
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.location.delete_district(district);
      } else {
        console.log('The dialog was close!');
      }
    });
  }


  deleteVillage(id: number) {
    let vname = '';
    for (let index = 0; index < this.location.villageviewalls.length; index++) {
      const element = this.location.villageviewalls[index];
      if (element.id == id) {
        vname = element.name;
        break;
      }
    }
    
    const village: IVillage = {} as IVillage;
    village.id = id;
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '450px',
      data: vname
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.location.delete_village(village);
      } else {
        console.log('The dialog was close!');
      }
    });
  }

  createVillage(Pid,Did) {  
    const dialogRef = this.dialog.open(VillageComponent, {
      width: '550px',
      data: {
        name: EMethod.create ,
        province_id:Pid,
        district_id:Did
      } as IVillage
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //  this.animal = result;
    });
  }


  viewVillage(Did){
    const village: IVillage = {} as IVillage; 
    village.district_id = Did; 
    this.location.viewall_Village(village);
  }
  
}