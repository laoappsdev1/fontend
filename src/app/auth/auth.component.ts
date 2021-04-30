import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { LocaldataService } from 'src/service/localdata.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public getusername:any;
  constructor(public rout:Router, public local:LocaldataService) { 
    if(this.local.get_token()){
      this.rout.navigate(['/layout']);
    }else{
      this.rout.navigate(['/']);
    }
  }

  ngOnInit() {

    // console.log(this.local.get_token());
    // this.getusername= this.local.get_token();
    

  }

}
