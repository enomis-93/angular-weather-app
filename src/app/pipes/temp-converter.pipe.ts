import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempConverter',
})
export class TempConverterPipe implements PipeTransform {
  transform(value: number, unit: string) {
    if (unit === '°C') {
      var temperature = value * (5 / 9);
      return temperature.toFixed(1);
    } else if (unit === '°F') {
      var temperature = value * (9 / 5);
      return temperature.toFixed(1);
    }
    return;
  }
}
