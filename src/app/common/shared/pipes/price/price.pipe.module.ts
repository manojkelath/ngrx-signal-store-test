import { CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { PricePipe } from './price.pipe';

@NgModule({
  declarations: [PricePipe],
  exports: [PricePipe],
  providers: [CurrencyPipe],
})
export class PricePipeModule {}
