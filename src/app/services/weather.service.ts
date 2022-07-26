import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCoords(cityName: string) {
    return this.http.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
    );
  }

  getData(
    latitude: number,
    longitude: number,
    timezone: string,
    startDate: string = '',
    endDate: string = ''
  ) {
    return this.http.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,cloudcover,surface_pressure,weathercode,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&windspeed_unit=ms&timezone=${timezone}
      ${
        startDate && endDate
          ? `&start_date=${startDate}&end_date=${endDate}`
          : ''
      }`
    );
  }
  getCityFromCoords(latitude: number, longitude: number) {
    return this.http.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
  }
}
