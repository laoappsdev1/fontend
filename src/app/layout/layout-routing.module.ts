import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  { path: '', component: LayoutComponent,
  children:[
    { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
    { path: 'location', loadChildren: () => import('./location/location.module').then(m => m.LocationModule) },
    { path: 'superadmin', loadChildren: () => import('./superadmin/superadmin.module').then(m => m.SuperadminModule) },
    { path: 'school', loadChildren: () => import('./school/school.module').then(m => m.SchoolModule) }
  ]
},
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
  { path: 'classroom', loadChildren: () => import('./classroom/classroom.module').then(m => m.ClassroomModule) },
  { path: 'level', loadChildren: () => import('./level/level.module').then(m => m.LevelModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
