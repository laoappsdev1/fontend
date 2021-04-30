import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EMethod, EPath, ILogin, Req } from 'src/app/model/model';
import { AuthService } from 'src/service/auth.service';
import { SocketAPIService } from 'src/service/socket-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  usernames;
  passwords;
  public datawebsocket = "1234567890asdfghjk";
  public savelogin: any;
  subs: Array<Subscription> = [];

  constructor(public apiService: SocketAPIService, public authLogin: AuthService) { }

  ngOnDestroy() {
    this.subs.forEach(v => v.unsubscribe());
  }
  ngOnInit() {
    // this.subs.push(
    //   this.apiService.loginChange.subscribe(o=>{
    //    console.log(o);

    //   })
    // );
  }

  login() {  
    const login: ILogin = {} as ILogin;
    login.username = this.usernames;
    login.password = this.passwords; 
    this.authLogin.login(login);
  }
}

