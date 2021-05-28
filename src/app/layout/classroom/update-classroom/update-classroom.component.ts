import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IClassroom } from 'src/app/model/classroom.model';
import { ClassroomService } from 'src/service/classroom.service';
import { LevelService } from 'src/service/level.service';
import { ClassroomComponent } from '../classroom.component';

@Component({
  selector: 'app-update-classroom',
  templateUrl: './update-classroom.component.html',
  styleUrls: ['./update-classroom.component.css']
})
export class UpdateClassroomComponent implements OnInit {

  id:number;
  level_id:number;
  class_number:string;
  level:string;

  viewclassroom:any;
  viewallLevel:any;
  constructor(
    private router:Router,
    private classroomservice:ClassroomService,
    private levelservice:LevelService,
  ) { }

  ngOnInit(): void {
    this.levelservice.viewall();
    this.levelservice.viewallLevelSource.asObservable().subscribe(res => {
      try {
        this.viewallLevel = res;
      } catch (error) {
        console.log(error);
      }
    })

    if(this.classroomservice.viewClassroom){
      this.viewclassroom=this.classroomservice.viewClassroom[0];
      this.id=this.viewclassroom.id;
      this.level_id=this.viewclassroom.level_id;
      this.class_number=this.viewclassroom.class_number;
      this.level=this.viewclassroom.level;
    }else{
      this.router.navigate(['/layout/classroom'])
    }
  }


  saveUpdate(){
    const classroom:IClassroom={}as IClassroom;
    classroom.id=this.id; 
    classroom.class_number=this.class_number;
    classroom.level_id=this.level_id; 
    this.classroomservice.update(classroom); 
        this.router.navigate(['/layout/classroom']) 
  }

}
