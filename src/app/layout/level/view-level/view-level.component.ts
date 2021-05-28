import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILevel } from 'src/app/model/level.model';
import { LevelService } from 'src/service/level.service';

@Component({
  selector: 'app-view-level',
  templateUrl: './view-level.component.html',
  styleUrls: ['./view-level.component.css']
})
export class ViewLevelComponent implements OnInit {
  viewLevel:ILevel;
  constructor(
    private levelservice:LevelService,
    private router:Router
  ) {}

  ngOnInit(): void {
    if(this.levelservice.viewLevel){
      this.viewLevel=this.levelservice.viewLevel[0];
    }else{
      this.router.navigate(['/layout/level'])
    } 
  } 
}
