import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClientModule) {}

  getData() {
    return this.http.get(
      'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m'
    );
  }
}
