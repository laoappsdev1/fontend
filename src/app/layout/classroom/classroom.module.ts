import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassroomRoutingModule } from './classroom-routing.module';
import { ClassroomComponent } from './classroom.component';


@NgModule({
  declarations: [
    ClassroomComponent
  ],
  imports: [
    CommonModule,
    ClassroomRoutingModule
  ]
})
export class ClassroomModule { }
