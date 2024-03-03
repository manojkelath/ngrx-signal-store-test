import { FormGroup } from '@angular/forms';

import { DOMAIN_ADMIN_EMAIL } from '@shared/constants';

export const domainEmailValidation = (group: FormGroup) => {
  const emailDomainControl = group.get('adminEmail');
  const emailDomain = emailDomainControl?.value?.split('@')[1];
  const domainName = group.get('domainName').value;

  if (!domainName || !emailDomain) {
    return null;
  }

  if (emailDomain !== domainName) {
    return emailDomainControl.setErrors({ [DOMAIN_ADMIN_EMAIL]: true });
  }

  return null;
};
