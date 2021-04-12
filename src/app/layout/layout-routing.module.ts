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

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
