import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClassroomComponent } from '../classroom/create-classroom/create-classroom.component';
import { UpdateClassroomComponent } from '../classroom/update-classroom/update-classroom.component';
import { EmployeeComponent } from './employee.component';
import { UpdateProfileEmployeeComponent } from './update-profile-employee/update-profile-employee.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'update', component: UpdateProfileEmployeeComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
