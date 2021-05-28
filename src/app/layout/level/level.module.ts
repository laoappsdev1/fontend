import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LevelRoutingModule } from './level-routing.module';
import { LevelComponent } from './level.component';


@NgModule({
  declarations: [
    LevelComponent
  ],
  imports: [
    CommonModule,
    LevelRoutingModule
  ]
})
export class LevelModule { }
