import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css'],
})
export class TemperatureComponent implements OnInit {
  @Input() temperature!: number;
  @Output() tempUnitChanged: EventEmitter<boolean> = new EventEmitter();
  isCelsius!: boolean;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.isCelsius = true;
  }

  convertToFarenheit() {
    if (this.isCelsius) {
      this.isCelsius = false;
      this.temperature *= 9 / 5;
      this.tempUnitChanged.emit(this.isCelsius);
    }
  }

  convertToCelsius() {
    if (!this.isCelsius) {
      this.isCelsius = true;
      this.temperature *= 5 / 9;
      this.tempUnitChanged.emit(this.isCelsius);
    }
  }
}
