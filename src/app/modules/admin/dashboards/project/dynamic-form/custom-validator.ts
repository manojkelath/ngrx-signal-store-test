import { AbstractControl, ValidatorFn } from '@angular/forms';

export function customValidator(validatorName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // Implement custom validation based on validatorName
    if (validatorName === 'customValidator1') {
      if (control.value && control.value.includes('example')) {
        return { 'invalidValue': { value: control.value } };
      }
    }
    // Add more custom validations as needed
    return null;
  };
}