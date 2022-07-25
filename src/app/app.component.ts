import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  cityName!: string;
  weatherData!: any;
  latitude!: number;
  longitude!: number;
  timeZone!: string;
  isCelsius: boolean = true;

  currentDateTime!: string;
  dateTimeID!: number;
  weatherCodeID!: number;
  dateList!: string[];
  dailyData!: string[];
  constructor(private service: WeatherService) {}

  ngOnInit(): void {}

  setCityInfo(city: any) {
    // console.log(city);

    this.service.getCoords(city).subscribe((res: any) => {
      let response = res.results[0];
      // console.log(response);
      this.cityName = response.name;
      this.latitude = response.latitude;
      this.longitude = response.longitude;
      this.timeZone = response.timezone;
      this.getWeatherInfo();
    });
  }

  getWeatherInfo() {
    this.service
      .getData(this.latitude, this.longitude, this.timeZone)
      .subscribe((res: any) => {
        console.log(res);
        this.weatherData = res;
        this.currentDateTime = res.current_weather.time;
        this.dateList = res.hourly.time;
        this.dateTimeID = this.dateList.indexOf(this.currentDateTime);
        this.weatherCodeID = res.hourly.weathercode[this.dateTimeID];
        this.dailyData = res.daily;
      });
  }

  tempUnitHandler(isCelsius: any) {
    this.isCelsius = isCelsius;
  }
}
