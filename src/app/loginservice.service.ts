import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from "./api.service";
// import { LocaldataService } from "./localdata.service";
// import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private object: string = 'user';
  public datasave: any
  constructor(
    public spinner: NgxSpinnerService,
    public router: Router,
    public socket: ApiService
  ) {

    this.income()
  }

  income() {
    this.socket.wssocket.onmessage = (event) => {
      const js = JSON.parse(event.data);
      console.log('ssssssssssssssss',js);
      const checkdata = js;

      if (checkdata.object == this.object) {
        //echeck login
        if (checkdata.status == 0) {
          alert('no have data')
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: 'Something went wrong!',
          //   footer: '<a href>Why do I have this issue?</a>'
          // })
          return
        }
        switch (checkdata.Status) {
          case '1':
            this.datasave = checkdata
            console.log('test data coming', this.datasave);

            this.login_success(checkdata.data);
            this.spinner.hide()
            break;
          case 'oject':
            break;
          //check receive message
          default:
            break;
        }

      }

    }
  }


  login(prame: any) {
    const data = {
      object: this.object,
      method: 'login',
      data: prame
    }

    this.spinner.show();
    this.socket.wssocket.send(JSON.stringify(data))
  }

  login_success(data: any) {


    // this.localdata.save_token(data.jwt);
    // this.localdata.save_user(data.user)
    // this.router.navigate(['/main'], { queryParams: { order: 'popular' } });
    this.router.navigate(['/main']);
  }



}
