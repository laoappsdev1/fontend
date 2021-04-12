import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { VillageComponent } from './village/village.component';
import { ProvinceComponent } from './province/province.component';
import { DistrictComponent } from './district/district.component';


@NgModule({
  declarations: [LocationComponent, VillageComponent, ProvinceComponent, DistrictComponent],
  imports: [
    CommonModule,
    LocationRoutingModule
  ]
})
export class LocationModule { }
