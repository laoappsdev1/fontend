import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/service/main.service';
import {ISchools} from 'src/app/model/model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public mainApi:MainService) {
    this.mainApi.viewall(); 
  }

  ngOnInit() {
     
  }

  viewById(id:ISchools){ 
    this.mainApi.view(id);
  }

   

}
