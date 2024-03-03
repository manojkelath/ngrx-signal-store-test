import { AbstractControl, ValidationErrors } from '@angular/forms';

import { WHITE_SPACE } from '@shared/constants';

export const whiteSpaceValidator = (control: AbstractControl): ValidationErrors | null => {
  if (!!control.value && control.value.indexOf(' ') >= 0) {
    return { [WHITE_SPACE]: true };
  }

  return null;
};
