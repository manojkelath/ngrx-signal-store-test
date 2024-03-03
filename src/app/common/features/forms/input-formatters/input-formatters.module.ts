import { NgModule } from '@angular/core';

import { SetMaxLengthDirective } from './set-max-length.directive';
import { TrimSpacesDirective } from './trim-spaces.directive';

@NgModule({
  declarations: [TrimSpacesDirective, SetMaxLengthDirective],
  exports: [TrimSpacesDirective, SetMaxLengthDirective],
})
export class InputFormattersModule {}
