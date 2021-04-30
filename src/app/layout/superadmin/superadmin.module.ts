import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperadminRoutingModule } from './superadmin-routing.module';
import { SuperadminComponent } from './superadmin.component';
import { FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsuperadminComponent } from './formsuperadmin/formsuperadmin.component';


@NgModule({
  declarations: [SuperadminComponent, FormsuperadminComponent],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    FormsModule,
    //MatProgressSpinnerModule
    NgxLoadingModule,
    MatDialogModule
  ]
})
export class SuperadminModule { }
