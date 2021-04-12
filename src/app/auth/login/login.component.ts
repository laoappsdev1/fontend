import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { ApiService } from "src/app/api.service"
import { EMethod, EPath, Req } from 'src/app/model/model';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  public datawebsocket = "1234567890asdfghjk";
  public savelogin: any;
  subs:Array<Subscription>=[];

  constructor(public apiService: ApiService,public dialog:MatDialog) { }

  ngOnDestroy(){
    this.subs.forEach(v=>v.unsubscribe());
  }
  ngOnInit() {
    this.subs.push(
      this.apiService.loginChange.subscribe(o=>{
        alert(o);
      })
    );
  }

  login() {
    const data = {
      "path": "level",
      "header": {
        "m": "viewall",
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsYW9hcHBzLmNvbSIsImF1ZCI6Imp3dC5sYW9hcHBzLmNvbSIsImlhdCI6MTM1Njk5OTUyNCwibmJmIjoxMzU3MDAwMDAwLCJkYXRhIjp7InVzZXIiOnsidXNlcm5hbWUiOiJ1c2VyeHl6IiwicGFzc3dvcmQiOiJVc2VyMTEyMjMzIiwidG9rZW4iOiJzZGZzZGZzZDExIiwic3RhdHVzIjoicGFyZW50IiwiY3JlYXRlZGF0ZSI6IjIwMjEtMDEtMjUgMTE6Mjg6NDciLCJ1cGRhdGVkYXRlIjoiMjAyMS0wMS0yNSAxMToyODo0NyJ9fSwidXBkYXRldGltZSI6MTYxMTU3MDUyNzMzNjYsImV4cCI6IjIwMjEtMDEtMjYgMTE6Mjg6NDciLCJjcmUiOiIyMDIxLTAxLTI1IDExOjI4OjQ3In0.F-ueTfRX1sHh_2jwZZseJDM7T5PrVmRrEgoqG-fucv0",
        "uuid": ""
      },
      "data": {
        "viewall": "viewall"
      }
    }
    //localStorage.setItem('token','');
    // const d: Req = {
    //   header: {
    //     m: EMethod.viewall,
    //     token: '',
    //     uuid: '',
    //   },
    //   path: EPath.level,
    //   data: [],
    //   //message:''
    // } as Req;

    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '250px',
      data: {name: 'name', animal: 'animal'}
    });
    dialogRef.afterClosed().toPromise().then(r=>{
      console.log(r);
      this.apiService.sendData(data);
      this.getlogin()
      console.log('123456dddddddddddddddddd');
      
    }).catch(e=>console.error(e)
    )

   

  }

  getlogin() {
    this.savelogin = this.apiService.mydata
    console.log('55555555555555555555555555555', this.savelogin);
  }
}
