import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLevelComponent } from './create-level/create-level.component';
import { LevelComponent } from './level.component';
import { UpdateLevelComponent } from './update-level/update-level.component';
import { ViewLevelComponent } from './view-level/view-level.component';

const routes: Routes = [
  { path: 'create', component: CreateLevelComponent },
  { path: 'update', component: UpdateLevelComponent },
  { path: 'view', component: ViewLevelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LevelRoutingModule { }
