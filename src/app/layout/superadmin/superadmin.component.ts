import { Component, Inject, OnDestroy, OnInit } from '@angular/core'; 
import { EMethod} from 'src/app/model/model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component'; 
import { SuperadminService } from 'src/service/superadmin.service';
import { FormsuperadminComponent } from './formsuperadmin/formsuperadmin.component';
import { ISuperadmin } from 'src/app/model/superadmin.model';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent implements OnInit, OnDestroy {
  public subs: Array<Subscription> = [];
  dialogRef: any;
  constructor(
    public superadmin: SuperadminService,
    public dialog: MatDialog
    ) {}

  ngOnDestroy() {
    this.subs.forEach(v => {
      v.unsubscribe();
    })
  } 

  ngOnInit() {
    this.superadmin.viewall_superadmins();
    this.subs.push(
      this.superadmin.superadminupdaterSource.asObservable().subscribe(r => {
        try {
          console.log('super admin update', r);
          if (!r) return;
          this.superadmin.viewall_superadmins(); 
        } catch (error) {
          console.log(error);
        }
      }, e => {
        console.error(e);
      })
    );
  }

  deletesuperadmin(id: number) {
    let Uname = '';
    for (let index = 0; index <this.superadmin.viewallsuperadmin.length; index++) {
      const element = this.superadmin.viewallsuperadmin[index];
      if (element.id == id) {
        Uname = element.username;
        break;
      }
    }

    const superadmin: ISuperadmin = {} as ISuperadmin;
    superadmin.id = id;

    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '450px',
      data: Uname
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.superadmin.delete_superadmin(superadmin);
      } else {
        console.log('The dialog was close!');
      }

    });
  }


  createsuperadmin() {
    const dialogRef = this.dialog.open(FormsuperadminComponent, {
      width: '450px',
      data:{
        method: EMethod.create 
      } as ISuperadmin
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //  this.animal = result;
    });
  }

  updatesuperadmin(sid) {
    const dialogRef = this.dialog.open(FormsuperadminComponent, {
      width: '450px',
      data:{
        method: EMethod.update,
        id:sid
      } as ISuperadmin
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //  this.animal = result;
    });
  }

}
