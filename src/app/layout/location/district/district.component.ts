import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EMethod, IDistrict } from 'src/app/model/model';
import { LocaionService } from 'src/service/locaion.service';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})


export class DistrictComponent implements OnInit, OnDestroy {
  public subs: Array<Subscription> = [];
  public district = '';
  public id:number;
  public province_id:number;
  public loading = true;
  constructor(
    public dialogRef: MatDialogRef<DistrictComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public inputData: IDistrict,
    public location: LocaionService,
    public dialog: MatDialog
    ) {}

  ngOnDestroy() {
    this.subs.forEach(v => {
      v.unsubscribe();
    })
  }

  ngOnInit() {
    this.checkCommand();     
    this.subs.push(
      this.location.districtViewSource.asObservable().subscribe(r => {
        try { 
          if (!r) return;
          this.district=r[0].name;
          this.province_id=r[0].province_id;
          this.id = r[0].id;
        } catch (error) {
          console.log(error);
        }
      }, e => {
        console.error(e);
      })
    );
  }

  checkCommand() { 
    switch (this.inputData.name) {
      case EMethod.create:
        {
          this.district ='';
         }
        break;
      case EMethod.view:
        { 
          this.viewDistrict();
        }
        break;
      case EMethod.update:
        {  
          this.viewDistrict();
        }
        break;
    
      default:
        break;
    }
  }


  viewDistrict() {
    const district: IDistrict = {} as IDistrict;
    district.id = this.inputData.id; 
    this.location.view_district(district); 
  }

  save(){     
    switch (this.inputData.name) {
      case EMethod.create:
        {
          this.createDistrict();
         }
        break;
        
      case EMethod.update:
        { 
          this.updateDistrict();
        }
        break;
    
      default:
        break;
    }
  }
  
  createDistrict() {
    const district: IDistrict = {} as IDistrict;
    district.name = this.district;
    district.province_id = this.inputData.province_id;
    this.location.create_district(district);
    this.dialogRef.close('parammeter here');
  }

  updateDistrict() {  
    const district: IDistrict = {} as IDistrict;
    district.id = this.inputData.id;
    district.province_id = this.inputData.province_id;
    district.name = this.district;
    this.location.update_district(district);
    this.dialogRef.close('parammeter here');
  }
  
  close() {
    this.dialogRef.close('parammeter here');
  }

}





