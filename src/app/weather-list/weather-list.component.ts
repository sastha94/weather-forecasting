import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Weather } from '../weather.model';
import { WeatherService } from '../service/weather.service';
import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent implements OnInit {

  zipData: Weather[] = [];
  isExists: boolean = false;

  constructor(private weatherService: WeatherService, private toaster: ToastrService, private dataSerive: DataService){}
  imagePath: string = this.weatherService.imageUrl;

  ngOnInit(): void {
    let localData = this.dataSerive.getItem('zipCode');
    if(localData){
    this.zipData = localData;
    }
  }


  onSubmit(formData: NgForm){
    let zipCode = formData.value.zipcode;
    formData.resetForm();
    let localData = this.dataSerive.getItem('zipCode');
    
    if(localData){
    let idx = localData.findIndex((elem: { zipcode: number; }) => elem.zipcode === zipCode);
      if(idx !== -1){
        this.isExists = true;
      }
    }
      if (this.isExists){
          this.isExists = false;
          this.toaster.error('Already City is added','Message');
      }
      else{
      this.weatherService.getWeatherData(zipCode).subscribe(res=>{
        {
          if(res.cod == 200){
            this.zipData = [];
            const resData = new Weather(res.name,res.weather[0].main,zipCode,res.main.temp_max,res.main.temp_min,res.main.feels_like,res.main.temp);
            if(localData){
              localData.unshift(resData);
              this.dataSerive.setItem('zipCode',localData);
              this.zipData = localData;
            }
            else{
              this.zipData.push(resData);
              this.dataSerive.setItem('zipCode',this.zipData);
            }
            this.toaster.success('City is added!','Message');
          }
          else{
            this.toaster.error('City not added!','Message');
          }
       }
      }); 
    }
   
  }
    

  removeCode(id: number){
    this.zipData = [];
    let localData = this.dataSerive.getItem('zipCode');
    localData.splice(id,1);
    this.dataSerive.setItem('zipCode',localData);
    this.zipData = localData;
    this.toaster.warning('City is Removed','Warning');
   }

   getImage(climate: string){
    return this.weatherService.getImagePath(climate);
   }
   
}
