import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css'],
})
export class WeatherDetailsComponent implements OnInit {
  @Input() data: any;
  @Input() timeID!: number;
  windSpeed!: number;
  windDirectionDegree!: number;
  windDirection!: string;
  constructor() {}

  ngOnInit(): void {}

  getWindDirection(): string {
    let degrees = this.data?.current_weather?.winddirection;
    // console.log(degrees);

    if ((degrees >= 341 && degrees <= 360) || (degrees >= 0 && degrees <= 19)) {
      return 'N';
    } else if (degrees >= 20 && degrees <= 30) {
      return 'NNE';
    } else if (degrees >= 31 && degrees <= 59) {
      return 'NE';
    } else if (degrees >= 60 && degrees <= 70) {
      return 'ENE';
    } else if (degrees >= 71 && degrees <= 109) {
      return 'E';
    } else if (degrees >= 110 && degrees <= 120) {
      return 'ESE';
    } else if (degrees >= 121 && degrees <= 149) {
      return 'SE';
    } else if (degrees >= 150 && degrees <= 160) {
      return 'SSE';
    } else if (degrees >= 161 && degrees <= 199) {
      return 'S';
    } else if (degrees >= 200 && degrees <= 210) {
      return 'SSW';
    } else if (degrees >= 211 && degrees <= 239) {
      return 'SW';
    } else if (degrees >= 240 && degrees <= 250) {
      return 'WSW';
    } else if (degrees >= 251 && degrees <= 289) {
      return 'W';
    } else if (degrees >= 290 && degrees <= 300) {
      return 'WNW';
    } else if (degrees >= 301 && degrees <= 329) {
      return 'NW';
    } else if (degrees >= 330 && degrees <= 340) {
      return 'NNW';
    } else {
      return '-';
    }
  }

  getWindSpeed(): number {
    return this.data?.current_weather?.windspeed;
  }

  getWindUnit(): string {
    return this.data?.hourly_units?.windspeed_10m;
  }

  getWind(): string {
    return `
    ${this.getWindDirection()}
    ${this.data?.hourly?.windspeed_10m[this.timeID] || ''} 
      ${this.data?.hourly_units?.windspeed_10m || ''}`;
  }

  getHumidity(): string {
    return `
    ${this.data?.hourly?.relativehumidity_2m[this.timeID] || '-'} 
      ${this.data?.hourly_units?.relativehumidity_2m || ''}`;
  }

  getPressure(): string {
    return `
    ${this.data?.hourly?.surface_pressure[this.timeID] || '-'} 
      ${this.data?.hourly_units?.surface_pressure || ''}`;
  }

  getCloudCoverTot(): string {
    return `
    ${this.data?.hourly?.cloudcover[this.timeID] || '-'} 
      ${this.data?.hourly_units?.cloudcover || ''}`;
  }
}
