import { FormGroup } from '@angular/forms';

import { ADMIN_ALTERNATIVE_EMAIL } from '@shared/constants';

export const alternativeEmailValidation = (group: FormGroup) => {
  const emailDomain = group.get('adminEmail')?.value?.split('@')[1];
  const emailAltControl = group.get('adminAlternateEmail');
  const emailAltDomain = emailAltControl?.value?.split('@')[1];
  const domainName = group.get('domainName').value;

  if (!emailAltDomain || (!domainName && !emailDomain)) {
    return null;
  }

  if (emailDomain === emailAltDomain || emailAltDomain === domainName) {
    return emailAltControl.setErrors({ [ADMIN_ALTERNATIVE_EMAIL]: true });
  } else {
    const errors = { ...emailAltControl.errors };

    // eslint-disable-next-line no-prototype-builtins
    if (errors?.hasOwnProperty(ADMIN_ALTERNATIVE_EMAIL)) {
      delete errors[ADMIN_ALTERNATIVE_EMAIL];
    }

    emailAltControl.setErrors(Object.keys(errors)?.length ? errors : null);
  }
};
