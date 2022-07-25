import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.css'],
})
export class WeatherIconComponent implements OnInit {
  @Input() weatherCodeID!: number;
  @Input() currentTime!: string;
  time!: number;
  isDay!: boolean;
  weatherIco!: string;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.dayTimeString(this.time);
    this.calculateDayTime();
  }

  setWeatherIco(weatherCode: any, isDay: boolean, dayTime: string): void {
    switch (weatherCode) {
      case 0: // Clear Sky
        isDay
          ? (this.weatherIco = `<i class="wi wi-day-sunny"></i>`)
          : (this.weatherIco = '<i class="wi wi-night-clear"></i>');
        break;
      case 1:
      case 2: // Mainly Clear
        this.weatherIco = `<i class="wi wi-${dayTime}cloudy"></i>`;
        break;
      // case 2: // Partly Clody
      //   break;
      case 3: // Overcast
        this.weatherIco = '<i class="wi wi-cloudy"></i>';
        break;
      case 45:
      case 48: // Fog
        this.weatherIco = `<i class="wi wi-${dayTime}fog"></i>`;
        break;
      // case 48: // Depositing rime fog
      //   break;
      case 51:
      case 53:
      case 55: // Drizzle
        this.weatherIco = `<i class="wi wi-${dayTime}sprinkle"></i>`;
        break;
      // case 53: // Drizzle: Moderate
      //   break;
      // case 55: // Drizzle: dense intensity
      //   break;
      case 56:
      case 57: // Freezing Drizzle: Light
        this.weatherIco = `<i class="wi wi-${dayTime}hail"></i>`;
        break;
      // case 57: // Freezing Drizzle: dense intensity
      //   break;
      case 61:
      case 63:
      case 65: // Rain: Slight
        this.weatherIco = `<i class="wi wi-${dayTime}rain"></i>`;
        break;
      // case 63: // Rain: moderate
      //   break;
      // case 65: // Rain: heavy intensity
      //   break;
      case 66:
      case 67: // Freezing Rain: Light
        this.weatherIco = `<i class="wi wi-${dayTime}sleet"></i>`;
        break;
      // case 67: // Freezing Rain: heavy intensity
      //   break;
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86: // Snow fall: Slight
        this.weatherIco = `<i class="wi wi-${dayTime}snow"></i>`;
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
        this.weatherIco = `<i class="wi wi-${dayTime}showers"></i>`;
        break;
      // case 81: // Rain showers: moderate
      //   break;
      // case 82: // Rain showers: violent
      //   break;
      case 95: // Thunderstorm: Slight or moderate
        this.weatherIco = `<i class="wi wi-${dayTime}thunderstorm"></i>`;
        break;
      case 96: // Thunderstorm with slight hail
        this.weatherIco = `<i class="wi wi-${dayTime}sleet-storm"></i>`;
        break;
      case 99: // Thunderstorm with heavy hail
        this.weatherIco = `<i class="wi wi-${dayTime}snow-thunderstorm"></i>`;
        break;

      default:
        this.weatherIco = "<i class='wi wi-na'></i>";
        break;
    }
  }

  /**
   * Verifica che sia giorno o notte estrapolando dal CurrentTime la stringa che rappresenta l'ora
   * per poi settare le icone di conseguenza
   */
  calculateDayTime(): void {
    if (this.currentTime) {
      let hour = this.currentTime.substring(11, 13);

      if (hour.charAt(0) == '0') {
        hour.replace(hour.charAt(0), '');
      }

      this.time = parseInt(hour);
      (this.time >= 0 && this.time <= 6) || (this.time >= 18 && this.time <= 24)
        ? (this.isDay = false)
        : (this.isDay = true);

      this.setWeatherIco(
        this.weatherCodeID,
        this.isDay,
        this.dayTimeString(this.time)
      );
    } else {
      this.time = 0;
    }
  }

  dayTimeString(time: number) {
    return (time >= 0 && time <= 6) || (time >= 18 && time <= 24)
      ? `night-alt-`
      : 'day-';
  }
}
