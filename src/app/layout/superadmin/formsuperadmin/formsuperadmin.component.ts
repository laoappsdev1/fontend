import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EMethod } from 'src/app/model/model';
import { ISuperadmin } from 'src/app/model/superadmin.model';
import { SuperadminService } from 'src/service/superadmin.service';

@Component({
  selector: 'app-formsuperadmin',
  templateUrl: './formsuperadmin.component.html',
  styleUrls: ['./formsuperadmin.component.css']
})
export class FormsuperadminComponent implements OnInit, OnDestroy {
  public subs: Array<Subscription> = [];
  public id:number;
  public username='';
  public password='';
  public status='';
  constructor(
    public dialogRef: MatDialogRef<FormsuperadminComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public inputData: ISuperadmin,
    public superadmin: SuperadminService,
    public dialog: MatDialog
  ) {
    
  }
  
  ngOnDestroy() {
    this.subs.forEach(v => {
      v.unsubscribe();
    })
  }

  ngOnInit() {
    this.checkCommand();     
    this.subs.push(
      this.superadmin.superadminupdaterSource.asObservable().subscribe(r => {
        try {   
          if (!r) return;
          this.username=r[0].username;
          this.password=r[0].password;
          this.status=r[0].status;
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
    switch (this.inputData.method) {
      case EMethod.create:
        {
          this.username ='';
          this.password ='';
          this.status='';
         }
        break;
      case EMethod.view:
        { 
          this.viewSuperadmin();
        }
        break;
      case EMethod.update:
        { 
          this.viewSuperadmin();
        }
        break;
    
      default:
        break;
    }
  }


  viewSuperadmin() {
    const superadmin: ISuperadmin = {} as ISuperadmin;
    superadmin.id = this.inputData.id; 
    this.superadmin.view_superadmin(superadmin); 
  }

  save(){
    console.log("update: ",this.inputData.method);
    switch (this.inputData.method) {
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
    const superadmin: ISuperadmin = {} as ISuperadmin;
    superadmin.username=this.username;
    superadmin.password=this.password;
    superadmin.status=this.status;
    this.superadmin.create_superadmin(superadmin);
    this.dialogRef.close('parammeter here');
  }

  updateProvince() {  
    const superadmin: ISuperadmin = {} as ISuperadmin;
    superadmin.id = this.inputData.id;
    superadmin.username=this.username;
    superadmin.password=this.password;
    superadmin.status=this.status;
    this.superadmin.update_province(superadmin);
    this.dialogRef.close('parammeter here');
  }
  close() {
    this.dialogRef.close('parammeter here');
  }

}
