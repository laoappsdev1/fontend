import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IClassroom } from 'src/app/model/classroom.model';
import { ClassroomService } from 'src/service/classroom.service';
import { LevelService } from 'src/service/level.service';

@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.component.html',
  styleUrls: ['./create-classroom.component.css']
})
export class CreateClassroomComponent implements OnInit {
  id:number;
  level_id:number;
  class_number:string;
  level:string;

  viewallclassroom:any;
  viewclassroom:any;
  viewallLevel:any;
  constructor(
    private router:Router,
    private classroomservice:ClassroomService,
    private levelservice:LevelService
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
  }

  saveCreate(){
    const classroom:IClassroom={}as IClassroom;
    classroom.class_number=this.class_number;
    classroom.level_id=this.level_id; 
    this.classroomservice.create(classroom); 
        this.router.navigate(['/layout/classroom'])    
  }
}
