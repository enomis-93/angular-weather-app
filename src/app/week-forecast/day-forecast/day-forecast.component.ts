import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-forecast',
  templateUrl: './day-forecast.component.html',
  styleUrls: ['./day-forecast.component.css'],
})
export class DayForecastComponent implements OnInit {
  @Input() day: any;
  @Input() isCelsius!: boolean;
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
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

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
    this.weatherCode = weatherCode;
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
      // case 2: // Partly Clody
      //   break;
      case 3: // Overcast
        this.weatherIco = '<i class="wi wi-cloudy"></i>';
        break;
      case 45:
      case 48: // Fog
        this.weatherIco = `<i class="wi wi-fog"></i>`;
        break;
      // case 48: // Depositing rime fog
      //   break;
      case 51:
      case 53:
      case 55: // Drizzle
        this.weatherIco = `<i class="wi wi-sprinkle"></i>`;
        break;
      // case 53: // Drizzle: Moderate
      //   break;
      // case 55: // Drizzle: dense intensity
      //   break;
      case 56:
      case 57: // Freezing Drizzle: Light
        this.weatherIco = `<i class="wi wi-hail"></i>`;
        break;
      // case 57: // Freezing Drizzle: dense intensity
      //   break;
      case 61:
      case 63:
      case 65: // Rain: Slight
        this.weatherIco = `<i class="wi wi-rain"></i>`;
        break;
      // case 63: // Rain: moderate
      //   break;
      // case 65: // Rain: heavy intensity
      //   break;
      case 66:
      case 67: // Freezing Rain: Light
        this.weatherIco = `<i class="wi wi-sleet"></i>`;
        break;
      // case 67: // Freezing Rain: heavy intensity
      //   break;
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86: // Snow fall: Slight
        this.weatherIco = `<i class="wi wi-snow"></i>`;
        break;
      // case 73: // Snow fall: moderate
      //   break;
      // case 75: // Snow fall: heavy intensity
      //   break;
      // case 77: // Snow grains
      // break;
      // case 85: // Snow showers slight
      //   break;
      // case 86: // Snow showers heavy
      //   break;
      case 80:
      case 81:
      case 82: // Rain showers: Slight
        this.weatherIco = `<i class="wi wi-showers"></i>`;
        break;
      // case 81: // Rain showers: moderate
      //   break;
      // case 82: // Rain showers: violent
      //   break;
      case 95: // Thunderstorm: Slight or moderate
        this.weatherIco = `<i class="wi wi-thunderstorm"></i>`;
        break;
      case 96: // Thunderstorm with slight hail
        this.weatherIco = `<i class="wi wi-sleet-storm"></i>`;
        break;
      case 99: // Thunderstorm with heavy hail
        this.weatherIco = `<i class="wi wi-snow-thunderstorm"></i>`;
        break;

      default:
        this.weatherIco = "<i class='wi wi-na'></i>";
        break;
    }
  }
}
