import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocaldataService } from 'src/service/localdata.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public local:LocaldataService, public rout:Router) {

  }

  ngOnInit() {
  }

  logout(){
    this.local.unset_token();
    this.local.unset_user();
    this.local.unset_userid();
    this.rout.navigate(['/']);
  }

}
