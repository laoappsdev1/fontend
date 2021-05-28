import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomComponent } from './classroom.component';
import { CreateClassroomComponent } from './create-classroom/create-classroom.component';
import { UpdateClassroomComponent } from './update-classroom/update-classroom.component';
import { ViewClassroomComponent } from './view-classroom/view-classroom.component';

const routes: Routes = [
  { path: 'create', component: CreateClassroomComponent },
  { path: 'update', component: UpdateClassroomComponent },
  { path: 'view', component: ViewClassroomComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomRoutingModule { }
