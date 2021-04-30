import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { VillageComponent } from './village/village.component';
import { ProvinceComponent } from './province/province.component';
import { DistrictComponent } from './district/district.component';
import { FormsModule } from '@angular/forms';
//import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxLoadingModule } from 'ngx-loading';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [LocationComponent, VillageComponent, ProvinceComponent, DistrictComponent],
  imports: [
    CommonModule,
    LocationRoutingModule,
    FormsModule,
    //MatProgressSpinnerModule
    NgxLoadingModule,
    MatDialogModule
  ]
})
export class LocationModule { }
