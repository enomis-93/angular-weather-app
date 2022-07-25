import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.css'],
})
export class CityInputComponent implements OnInit {
  @Output() citySubmit = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  onCitySubmit(value: string) {
    this.citySubmit.emit(value);
  }
}
