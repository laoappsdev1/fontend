import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ILevel } from 'src/app/model/level.model';
import { LevelService } from 'src/service/level.service';

@Component({
  selector: 'app-update-level',
  templateUrl: './update-level.component.html',
  styleUrls: ['./update-level.component.css']
})
export class UpdateLevelComponent implements OnInit {
  
  id:number
  level:string

  constructor(
    private levelservice:LevelService,
    private router:Router
  ) { 
  //   this.router.events.subscribe((val) => {
  //     // see also 
  //     if(val instanceof NavigationEnd) {
  //       alert('OK');

  //     }
  // });
  }

  ngOnInit(): void {
    if(this.levelservice.viewLevel){
      const data:ILevel=this.levelservice.viewLevel[0];
      this.id=data.id;
      this.level=data.level; 
    }else{ 
      this.router.navigate(["/layout/level"]);
    }
  }

  saveUpdate(){
    const level:ILevel={}as ILevel
    level.id=this.id;
    level.level=this.level;
    this.levelservice.update(level);
    this.router.navigate(['/layout/level']); 
  }
}
