import { Component, OnInit } from '@angular/core';
import { LocaldataService } from 'src/service/localdata.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public Username:string;
  constructor( public local:LocaldataService) {
    this.Username=local.get_user();
  }

  ngOnInit() {
  }

}
