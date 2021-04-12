import { ProvinceComponent } from './province/province.component';
import { DistrictComponent } from './district/district.component';
import { VillageComponent } from './village/village.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationComponent } from './location.component';

const routes: Routes = [
  { path: '', component: LocationComponent,
// children:[
//   {path:'village', component:VillageComponent},
//   {path:'district', component:DistrictComponent},
//   {path:'province', component:ProvinceComponent}
// ]
},
  { path: 'village', component: VillageComponent},
  {path:'district', component:DistrictComponent},
  {path:'province', component:ProvinceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
