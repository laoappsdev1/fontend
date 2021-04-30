import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.css']
})
export class DeleteConfirmDialogComponent implements OnInit {
  id:number;
  msg = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public inputData: string,) {  
    this.msg = inputData;
  }

  close(msg): void { 
    this.dialogRef.close(msg);
  }

  ngOnInit(): void {
  }

}
