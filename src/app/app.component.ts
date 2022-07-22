import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  data: any;
  constructor(private service: WeatherService) {}

  ngOnInit(): void {
    this.service.getData().subscribe((res: any) => (this.data = res));
  }
}
