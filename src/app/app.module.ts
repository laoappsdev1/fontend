import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
// import { NgxSpinnerModule } from "ngx-spinner";
//import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ProvincedetailsComponent } from './layout/location/province/provincedetails____1/provincedetails.component';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';
//import { NgxLoadingModule } from 'ngx-loading';
@NgModule({
  declarations: [
    AppComponent,
    // ProvincedetailsComponent,
    DeleteConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //NgxSpinnerModule
   // MatProgressSpinnerModule,
    BrowserAnimationsModule,
   // NgxLoadingModule.forRoot({})
  ],
  entryComponents:[],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
