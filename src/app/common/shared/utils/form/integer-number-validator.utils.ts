import { AbstractControl, ValidationErrors } from '@angular/forms';

import { INTEGER_NUMBER_FORMAT } from '@shared/constants';

export const integerNumberValidator = (control: AbstractControl): ValidationErrors | null => {
  if ((!!control.value && !Number.isInteger(control.value)) || isNaN(control.value)) {
    return { [INTEGER_NUMBER_FORMAT]: true };
  }

  return null;
};
