import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILevel } from 'src/app/model/level.model';
import { LevelService } from 'src/service/level.service';

@Component({
  selector: 'app-create-level',
  templateUrl: './create-level.component.html',
  styleUrls: ['./create-level.component.css']
})
export class CreateLevelComponent implements OnInit {
  id:number
  level:string 
  constructor(
    private router:Router,
    private levelservice:LevelService
  ) {
  }

  ngOnInit(): void {
  }

  saveCreate(){
    const level:ILevel={}as ILevel
    level.level=this.level;
    this.levelservice.create(level); 
    this.router.navigate(['/layout/level'])
  }

}
