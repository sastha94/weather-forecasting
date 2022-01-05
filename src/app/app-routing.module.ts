import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { WeatherListComponent } from './weather-list/weather-list.component';


const appRoute: Routes=[
  {path: '', component: WeatherListComponent},
  {path: 'weatherlist', component: WeatherListComponent},
  {path: 'forecast/:zipcode', component: WeatherComponent},
  {path: '**', redirectTo: 'weatherlist'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoute,{
      useHash: true
    }),
    
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { 


}
