import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EMethod, IDistrict, IVillage } from 'src/app/model/model';
import { LocaionService } from 'src/service/locaion.service';

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.css']
})


  export class VillageComponent implements OnInit, OnDestroy {
    public subs: Array<Subscription> = [];
    public village = '';
    public id:number;
    public district_id:number;
    public province_id:number;
    public loading = true;
    constructor(
      public dialogRef: MatDialogRef<VillageComponent>,
      @Inject(MAT_DIALOG_DATA) 
      public inputData: IVillage,
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
            this.village=r[0].name;
            this.district_id=r[0].district_id;
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
            this.village ='';
           }
          break;
        case EMethod.view:
          { 
            this.viewVillage();
          }
          break;
        case EMethod.update:
          {  
            this.viewVillage();
          }
          break;
      
        default:
          break;
      }
    }
  
  
    viewVillage() {
      const village: IVillage = {} as IVillage;
      village.id = this.inputData.id; 
      this.location.view_village(village); 
    }
  
    save(){     
      switch (this.inputData.name) {
        case EMethod.create:
          {
            this.createVillage();
           }
          break;
          
        case EMethod.update:
          {  
            this.updateVillage();
          }
          break;
      
        default:
          break;
      }
    }
    
    createVillage() {
      const village: IVillage = {} as IVillage;
      village.name = this.village;
      village.province_id = this.inputData.province_id;
      village.district_id = this.inputData.district_id;
      // console.log(village);
      this.location.create_village(village);
      this.dialogRef.close('parammeter here');
    }
  
    updateVillage() {  
      const village: IVillage = {} as IVillage;
      village.id = this.inputData.id;
      village.district_id = this.inputData.district_id;
      village.province_id = this.inputData.province_id;
      village.name = this.village;
      // console.log('update VIllage: ', village);
      
      this.location.update_village(village);
      this.dialogRef.close('parammeter here');
    }
    
    close() {
      this.dialogRef.close('parammeter here');
    }
  
  }