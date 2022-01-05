import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm } from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { Interceptor } from './interceptor';
import { WeatherComponent } from './weather/weather.component';
import { WeatherListComponent } from './weather-list/weather-list.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, RouterModule, BrowserAnimationsModule, ToastrModule.forRoot() ],
  declarations: [ AppComponent, HelloComponent, WeatherComponent, WeatherListComponent ],
  bootstrap:    [ AppComponent ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppModule { }
