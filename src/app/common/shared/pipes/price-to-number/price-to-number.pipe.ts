import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceToNumber',
  standalone: true,
})
export class PriceToNumberPipe implements PipeTransform {
  public transform(value: any) {
    return value.replace(/\./g, '');
  }
}
