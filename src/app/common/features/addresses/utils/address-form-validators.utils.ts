import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { ADDRESS_OPTION_KEY_DIVIDER } from '@features/addresses/constants';
import { POSTAL_CODE_REGEX } from '@shared/constants/form';

export const cityFormatValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  control.value.includes(ADDRESS_OPTION_KEY_DIVIDER) ? null : { oldFormat: true };

export const postalCodePatternFormatValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  new RegExp(POSTAL_CODE_REGEX).test(control.value) || control.value.includes(ADDRESS_OPTION_KEY_DIVIDER)
    ? null
    : {
        pattern: true,
      };
