import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-forecast',
  templateUrl: './day-forecast.component.html',
  styleUrls: ['./day-forecast.component.css'],
})
export class DayForecastComponent implements OnInit {
  @Input() day: any;
  @Input() isCelsius!: boolean;
  @Input() index!: number;
  @Input() dailyData: any = {
    temperature_2m_max: [],
    temperature_2m_min: [],
    time: [],
    weathercode: [],
  };

  weekday = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  currentDayID!: number;
  currentDay!: string;

  tempUnit!: string;
  tempMax!: number;
  tempMin!: number;
  weatherCode!: number;
  weatherIco!: string;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.tempUnit = this.isCelsius ? '°C' : '°F';
    this.getDayID();
    this.getDayTempMax();
    this.getDayTempMin();
    this.getWeatherCode();
  }

  getDayID() {
    const d = new Date(this.day);
    // console.log(d.getDay());
    this.currentDayID = d.getDay();
    this.currentDay = this.weekday[this.currentDayID];
  }

  getDayTempMax() {
    const idx = this.dailyData?.time?.indexOf(this.day);
    let tempMax = this.dailyData?.temperature_2m_max[idx];
    this.tempMax = this.tempConverter(tempMax);
  }

  getDayTempMin() {
    const idx = this.dailyData?.time?.indexOf(this.day);
    let tempMin = this.dailyData?.temperature_2m_min[idx];
    this.tempMin = this.tempConverter(tempMin);
  }

  getWeatherCode() {
    const idx = this.dailyData?.time?.indexOf(this.day);
    let weatherCode = this.dailyData?.weathercode[idx];
    this.setWeatherIco(weatherCode);
  }

  tempConverter(inputTemp: number) {
    if (this.isCelsius) {
      return inputTemp;
    } else {
      return (inputTemp *= 9 / 5);
    }
  }

  setWeatherIco(weatherCode: any): void {
    switch (weatherCode) {
      case 0: // Clear Sky
        this.weatherIco = `<i class="wi wi-day-sunny"></i>`;
        break;
      case 1:
      case 2: // Mainly Clear
        this.weatherIco = `<i class="wi wi-cloudy"></i>`;
        break;
      case 3: // Overcast
        this.weatherIco = '<i class="wi wi-cloudy"></i>';
        break;
      case 45:
      case 48: // Fog
        this.weatherIco = `<i class="wi wi-fog"></i>`;
        break;
      case 51:
      case 53:
      case 55: // Drizzle
        this.weatherIco = `<i class="wi wi-sprinkle"></i>`;
        break;
      case 56:
      case 57: // Freezing Drizzle
        this.weatherIco = `<i class="wi wi-hail"></i>`;
        break;
      case 61:
      case 63:
      case 65: // Rain
        this.weatherIco = `<i class="wi wi-rain"></i>`;
        break;
      case 66:
      case 67: // Freezing Rain
        this.weatherIco = `<i class="wi wi-sleet"></i>`;
        break;
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86: // Snow fall: Slight
        this.weatherIco = `<i class="wi wi-snow"></i>`;
        break;
      case 80:
      case 81:
      case 82: // Rain showers: Slight
        this.weatherIco = `<i class="wi wi-showers"></i>`;
        break;
      case 95:
      case 96:
      case 98: // Thunderstorm
        this.weatherIco = `<i class="wi wi-thunderstorm"></i>`;
        break;
      default:
        this.weatherIco = "<i class='wi wi-na'></i>";
        break;
    }
  }
}
