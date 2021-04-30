import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { system } from "src/environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
@Injectable({
  providedIn: 'root'
})

export class SocketAPIService {
  public wssocket: WebSocket;
  constructor(public spinner:NgxSpinnerService) {
    this.connect()
   }

  connect() {
    this.wssocket = new WebSocket(system.WS_ENDPOINT);
    this.wssocket.onopen = (e) => {
      console.log('open websocketed ');
    };
    this.wssocket.onclose = (event) => {
      console.log('close websocketed ');
    };
    this.wssocket.onerror = (error) => {
      console.log(`[error] ${error}`);
    }; 
  }

  waitForConnection(callback: Function, interval: number) {
    if (this.wssocket.readyState === 1) {
      callback();
    } else {
      var that = this; 
      setTimeout(function () {
        that.waitForConnection(callback, interval);
      }, interval);
    }
  };


  public sendData(mesage:any){ 
    const that = this;
    this.waitForConnection(function () {
      that.wssocket.send(JSON.stringify(mesage));
    }, 30000);
   
  }


}

