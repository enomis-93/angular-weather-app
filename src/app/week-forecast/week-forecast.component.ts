import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-week-forecast',
  templateUrl: './week-forecast.component.html',
  styleUrls: ['./week-forecast.component.css'],
})
export class WeekForecastComponent implements OnInit {
  @Input() lang!: string;
  @Input() totNextDays!: string[];
  @Input() dailyData!: [];
  @Input() isCelsius!: boolean;
  constructor() {}

  ngOnInit(): void {}
}
