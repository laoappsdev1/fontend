import { Component } from '@angular/core'; 
import { Router } from '@angular/router';
import { LocaldataService } from 'src/service/localdata.service';
import { SocketAPIService } from 'src/service/socket-api.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'highchool';
  constructor(private Socket:SocketAPIService, public rout:Router, public local:LocaldataService, private spinner: NgxSpinnerService){ 
      if(!this.local.get_token()){
        this.rout.navigate(['/']);
      }  
  }
  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show(); 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }
}
