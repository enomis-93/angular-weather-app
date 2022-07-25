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
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    console.log(this.isCelsius);
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
    this.weatherCode = this.dailyData?.weathercode[idx];
  }

  tempConverter(inputTemp: number) {
    if (this.isCelsius) {
      return inputTemp;
    } else {
      return (inputTemp *= 9 / 5);
    }
  }
}
