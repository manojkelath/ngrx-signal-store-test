import { Directive } from '@angular/core';
import { Subject } from 'rxjs';

import { FormControlFieldAbstract } from '@features/forms/form-control';

@Directive({
  selector: '[kvSelectInput]',
  providers: [{ provide: FormControlFieldAbstract, useExisting: SelectInputDirective }],
})
export class SelectInputDirective implements FormControlFieldAbstract {
  public isDisabled = false;

  public isFullHeight = false;

  public stateChanges: Subject<void> = new Subject();
}
