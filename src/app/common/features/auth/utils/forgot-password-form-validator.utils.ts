import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const forgotPasswordFormValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const email = group.get('email').value;
  const phone = group.get('mobilePhone').value;

  return email || phone ? null : { userDetails: true };
};
