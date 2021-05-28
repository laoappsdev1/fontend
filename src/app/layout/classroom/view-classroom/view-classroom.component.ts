import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassroomService } from 'src/service/classroom.service';
import { LevelService } from 'src/service/level.service';

@Component({
  selector: 'app-view-classroom',
  templateUrl: './view-classroom.component.html',
  styleUrls: ['./view-classroom.component.css']
})
export class ViewClassroomComponent implements OnInit {
  id:number;
  level_id:number;
  class_number:string;
  level:string; 
  createdate:string; 
  updatedate:string; 
  viewclassroom:any;
  viewallLevel:any;
  constructor( private router:Router,
    private classroomservice:ClassroomService,
    private levelservice:LevelService,
    ) { }

  ngOnInit(): void {
    if(this.classroomservice.viewClassroom){
      this.viewclassroom=this.classroomservice.viewClassroom[0];
      this.id=this.viewclassroom.id;
      this.level_id=this.viewclassroom.level_id;
      this.class_number=this.viewclassroom.class_number;
      this.level=this.viewclassroom.level;
      this.createdate=this.viewclassroom.created_date;
      this.updatedate=this.viewclassroom.updated_date;
    }else{
      this.router.navigate(['/layout/classroom'])
    }
  }

}
