import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/weather.service';
import { CityInputComponent } from './city-input/city-input.component';
import { FormsModule } from '@angular/forms';
import { TemperatureComponent } from './temperature/temperature.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { WeatherIconComponent } from './weather-icon/weather-icon.component';
import { WeekForecastComponent } from './week-forecast/week-forecast.component';
import { DayForecastComponent } from './week-forecast/day-forecast/day-forecast.component';
import { TempConverterPipe } from './pipes/temp-converter.pipe';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    CityInputComponent,
    TemperatureComponent,
    WeatherDetailsComponent,
    WeatherIconComponent,
    WeekForecastComponent,
    DayForecastComponent,
    TempConverterPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [WeatherService, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
