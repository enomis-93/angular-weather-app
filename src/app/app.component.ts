import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  lang: string = localStorage.getItem('lang') || 'en';
  title = 'weather-app';
  cityName!: string;
  date!: string;
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

  constructor(
    private service: WeatherService,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit(): void {
    // Obtain geo data from Geolocation API
    this.getPosition().subscribe((pos) => {
      // console.log(pos);
      // console.log(pos.coords.latitude);
      // console.log(pos.coords.longitude);
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
      this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.service
        .getCityFromCoords(this.latitude, this.longitude)
        .subscribe((res: any) => {
          console.log(res);
          this.cityName = res.locality;
        });
      this.getWeatherInfo();
    });
  }

  ngOnChanges() {
    console.log(this.lang);
  }

  setCityInfo(city: string) {
    // console.log(city);
    if (city) {
      this.service.getCoords(city).subscribe((res: any) => {
        let response = res.results[0];
        // console.log(response);
        this.cityName = response.name;
        this.latitude = response.latitude;
        this.longitude = response.longitude;
        this.timeZone = response.timezone;
        this.getWeatherInfo();
      });
    } else {
      alert('City Input is empty!');
    }
  }

  getWeatherInfo() {
    this.service
      .getData(this.latitude, this.longitude, this.timeZone)
      .subscribe((res: any) => {
        console.log(res);
        this.weatherData = res;
        this.currentDateTime = res.current_weather.time;
        this.date = moment(res.current_weather.time)
          .locale(this.lang)
          .format('LLL');
        this.dateList = res.hourly.time;
        this.dateTimeID = this.dateList.indexOf(this.currentDateTime);
        this.weatherCodeID = res.hourly.weathercode[this.dateTimeID];
        this.dailyData = res.daily;
      });
  }

  getPosition(): Observable<any> {
    return new Observable((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position);
          observer.complete();
        },
        (error) => observer.error(error)
      );
    });
  }

  tempUnitHandler(isCelsius: any) {
    this.isCelsius = isCelsius;
  }

  switchLang(event: any) {
    // console.log(event.target.value);
    localStorage.setItem('lang', event.target.value);
    this.lang = localStorage.getItem('lang') || 'en';
    this.date = moment(this.currentDateTime).locale(this.lang).format('LLL');
    // window.location.reload();
  }
}
