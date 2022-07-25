import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-week-forecast',
  templateUrl: './week-forecast.component.html',
  styleUrls: ['./week-forecast.component.css'],
})
export class WeekForecastComponent implements OnInit {
  @Input() totNextDays!: string[];
  @Input() dailyData!: [];
  constructor() {}

  ngOnInit(): void {}
}
