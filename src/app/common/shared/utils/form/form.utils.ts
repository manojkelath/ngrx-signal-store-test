import { AbstractControl } from '@angular/forms';

export const getControlErrors = (control: AbstractControl, errors: {}): string => {
  if (control.errors && Object.keys(errors).length) {
    const errorType = Object.keys(control.errors)[0];
    return errors[errorType];
  }
  return null;
};
