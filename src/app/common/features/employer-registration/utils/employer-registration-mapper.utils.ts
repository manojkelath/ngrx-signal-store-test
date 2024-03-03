import { EMPLOYER_REGISTRATION_RESPONSE } from '@features/employer-registration/constants';
import { EmployerRegistrationModalActions } from '@features/employer-registration/state/actions';

export const mapEmployerRegistrationResponds = (resp) => {
  let message = '';

  switch (true) {
    case +resp.status === 200:
      message = EMPLOYER_REGISTRATION_RESPONSE.POSITIVE_RESPONSE;
      break;
    case +resp.status === 208:
      message = EMPLOYER_REGISTRATION_RESPONSE.ALREADY_ENROLLED;
      break;
    case +resp.status === 429:
      message = EMPLOYER_REGISTRATION_RESPONSE.RECENTLY_APPLIED;
      break;
    case resp.status >= 400 && resp.status <= 499:
      message = EMPLOYER_REGISTRATION_RESPONSE.NOT_ELIGIBLE_PROGRAM;
      break;
    default:
      message = EMPLOYER_REGISTRATION_RESPONSE.SYSTEM_ERROR;
      break;
  }

  return EmployerRegistrationModalActions.showMessage({ message });
};
