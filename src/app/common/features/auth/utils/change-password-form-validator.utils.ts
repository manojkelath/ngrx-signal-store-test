import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const changePasswordFormValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const oldPassword = group.get('oldPassword').value;
  const newPassword = group.get('newPassword').value;
  const retypePassword = group.get('newPassword2').value;

  let errors = {};

  if (oldPassword && newPassword) {
    errors = {
      ...errors,
      newPasswordNotSameToOld: oldPassword === newPassword ? true : false,
    };
  }

  if (newPassword && retypePassword) {
    errors = {
      ...errors,
      newPasswordNotSameToRetype: newPassword === retypePassword ? false : true,
    };
  }

  return Object.values(errors).some((value) => value) ? errors : null;
};
