import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { DEFAULT_CURRENCY, PIPE_FORMATS } from '@shared/constants';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}

  public transform(value: any, currency: any = DEFAULT_CURRENCY) {
    if (!value) {
      return '0';
    }

    return this.currencyPipe.transform(value, currency, '', PIPE_FORMATS.CURRENCY).replace(/,/g, '.');
  }
}
