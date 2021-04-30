// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, Subject } from 'rxjs';
// import { EPath, Res } from './model/model';


// @Injectable({
//   providedIn: 'root'
// })

// export class ApiService {
//   public mydata:any
//   public Messages:any;
//   public wssocket: WebSocket;
//   constructor() {
//     this.connect()
//    }

//   connect() {

//     this.wssocket = new WebSocket("ws://192.168.82.68:9503");

//     this.wssocket.onopen = (e) => {
//       console.log('open websocketed ');

//     };
//     this.wssocket.onclose = (event) => {
//       console.log('close websocketed ');
//     };
//     this.wssocket.onerror = (error) => {
//       console.log(`[error] ${error}`);

//     };

//     this.wssocket.onmessage = (event) => {
//       try {  
//         const js = JSON.parse(event.data) as Res;
//         // console.log(js.Message);
//         this.mydata=js;
//         // this.loginUpdate(js.Message);
//       // if(!js.status){
//       //   alert('')
//       // }else{
//       //   switch (js.path) {
//       //     case EPath.level:{
//       //       this.mydata=js.data;
//       //     }
//       //       break;
//       //     default:
//       //       break;
//       //   }
//       // }
//       } catch (error) {
//         console.log(error);

//       }


//       // if(checkdata.command==='login')

//       //echeck login
//       // switch (checkdata.command) {
//       //   case 'login':
//       //     const data = checkdata;
//       //     break;
//       //   case 'level':
//       //     break;
//       //   default:
//       //     break;
//       // }
//     }
//   }
//   public sendData(mesage){
//     this.wssocket.send(JSON.stringify(mesage));
//   }

//   private loginSource = new Subject<string>();
//   public loginChange = this.loginSource.asObservable();
//   public loginUpdate(m:string){
//     if(m){
//       this.loginSource.next(m);
//     }
//   }

// }
