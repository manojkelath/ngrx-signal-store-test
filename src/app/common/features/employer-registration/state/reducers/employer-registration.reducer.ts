import { Action, createReducer, on } from '@ngrx/store';

import { EMPLOYER_REGISTRATION_RESPONSE } from '@features/employer-registration/constants';
import { EmployerRegistrationFormStateModel } from '@features/employer-registration/models/state';
import { EmployerRegistrationModalActions } from '@features/employer-registration/state/actions';

export const initialEmployerRegistrationFormState: EmployerRegistrationFormStateModel = {
  isOpen: false,
  massage: null,
  employerRegistrationData: null,
};

const reducer = createReducer(
  initialEmployerRegistrationFormState,
  on(EmployerRegistrationModalActions.openEmployerRegistrationModal, (state) => ({
    ...state,
    isOpen: true,
    massage: null,
  })),
  on(EmployerRegistrationModalActions.closeEmployerRegistrationModal, (state) => ({
    ...state,
    isOpen: false,
  })),
  on(EmployerRegistrationModalActions.showMessage, (state, { message }) => ({
    ...state,
    massage: message,
    employerRegistrationData: null,
  })),
  on(EmployerRegistrationModalActions.submitEmployerRegistrationModal, (state, { data }) => ({
    ...state,
    massage: EMPLOYER_REGISTRATION_RESPONSE.WAITING,
    employerRegistrationData: {
      corporateId: data.corporateId,
      typeOfRegistration: data.typeOfRegistration,
    },
  }))
);

export function employerRegistrationFormReducer(
  state: EmployerRegistrationFormStateModel | undefined,
  action: Action
): EmployerRegistrationFormStateModel {
  return reducer(state, action);
}
