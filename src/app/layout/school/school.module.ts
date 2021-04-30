import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SchoolComponent } from './school.component';
import { FormsModule } from '@angular/forms';
import { FromschoolComponent } from './fromschool/fromschool.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [SchoolComponent, FromschoolComponent],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    FormsModule,
    MatDialogModule
  ]
})
export class SchoolModule { }
