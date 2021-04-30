import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EMethod, IProvince } from 'src/app/model/model';
import { LocaionService } from 'src/service/locaion.service';


@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.css']
})
export class ProvinceComponent implements OnInit, OnDestroy {
  public subs: Array<Subscription> = [];
  public province = '';
  public id:number;
  public loading = true;

  constructor(
    public dialogRef: MatDialogRef<ProvinceComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public inputData: IProvince,
    public location: LocaionService,
    public dialog: MatDialog
    ){}

  ngOnDestroy() {
    this.subs.forEach(v => {
      v.unsubscribe();
    })
  }

  ngOnInit() {
    this.checkCommand();
    this.subs.push(
      this.location.provinceViewSource.asObservable().subscribe(r => {
        try { 
          if (!r) return;
          this.province = r[0].name; 
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
          this.province ='';
         }
        break;
      case EMethod.view:
        { 
          this.viewProvince();
        }
        break;
      case EMethod.update:
        { 
          this.viewProvince();
        }
        break;
    
      default:
        break;
    }
  }


  viewProvince() {
    const province: IProvince = {} as IProvince;
    province.id = this.inputData.id; 
    this.location.view_province(province);
    this.loading = true;
  }

  save(){
    console.log("update: ",this.inputData.name);
    switch (this.inputData.name) {
      case EMethod.create:
        {
          this.createProvince();
         }
        break;
      case EMethod.update:
        { 
          this.updateProvince();
        }
        break;
    
      default:
        break;
    }
  }
  createProvince() {
    const province: IProvince = {} as IProvince;
    province.name = this.province;
    this.location.create_province(province);
    this.dialogRef.close('parammeter here');
  }

  updateProvince() {  
    const province: IProvince = {} as IProvince;
    province.id = this.inputData.id;
    province.name = this.province;
    this.location.update_province(province);
    this.dialogRef.close('parammeter here');
  }
  
  close() {
    this.dialogRef.close('parammeter here');
  }
  
}


