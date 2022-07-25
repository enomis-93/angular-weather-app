import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css'],
})
export class TemperatureComponent implements OnInit {
  @Input() temperature!: number;
  isCelsius: boolean = true;
  constructor() {}

  ngOnInit(): void {}

  convertToFarenheit() {
    if (this.isCelsius) {
      this.isCelsius = false;
      this.temperature *= 9 / 5;
    }
  }

  convertToCelsius() {
    if (!this.isCelsius) {
      this.isCelsius = true;
      this.temperature *= 5 / 9;
    }
  }
}
