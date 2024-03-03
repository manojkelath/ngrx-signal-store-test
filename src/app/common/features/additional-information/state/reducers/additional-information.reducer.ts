import { Action, createReducer, on } from '@ngrx/store';

import { IAdditionalInformationStateModel } from '@features/additional-information/models';
import {
  EmployerRegistrationFormAPIActions,
  EmployerRegistrationModalActions,
} from '@features/employer-registration/state/actions';

export const initialAdditionalInformationState: IAdditionalInformationStateModel = {
  registrationStatus: null,
};

const reducer = createReducer(
  initialAdditionalInformationState,
  on(EmployerRegistrationFormAPIActions.validateRegistrationStatusSuccess, (state, { data }) => ({
    ...state,
    registrationStatus: data,
  })),
  on(EmployerRegistrationModalActions.openEmployerRegistrationModal, (state) => ({
    ...state,
    registrationStatus: null,
  }))
);

export function additionalInformationReducer(
  state: IAdditionalInformationStateModel | undefined,
  action: Action
): IAdditionalInformationStateModel {
  return reducer(state, action);
}
