import { Component, OnInit } from '@angular/core';
import { EMethod } from 'src/app/model/model';
import { ISchools } from 'src/app/model/school.model';
import { SchoolService } from 'src/service/school.service';
import { FromschoolComponent } from './fromschool/fromschool.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  constructor(
    public schoolservice:SchoolService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.schoolservice.viewall_school();

  }

  createschool() {
    const dialogRef = this.dialog.open(FromschoolComponent, {
      width: '800px',
      data:{
        method: EMethod.create 
      } as ISchools
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //  this.animal = result;
    });
  }
  updateschool(sid) {
    const dialogRef = this.dialog.open(FromschoolComponent, {
      width: '800px',
      data:{
        method: EMethod.create,
        id:sid
      } as ISchools
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //  this.animal = result;
    });
  }

}
