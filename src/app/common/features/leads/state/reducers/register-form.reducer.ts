import { Action, createReducer, on } from '@ngrx/store';

import { LeadRegisterFormStateModel } from '@features/leads/models/state';
import { LeadRegisterFormActions } from '@features/leads/state/actions';

export const initialLeadRegisterFormState: LeadRegisterFormStateModel = {
  isOpen: false,
  isSuccessMessage: false,
};

const reducer = createReducer(
  initialLeadRegisterFormState,
  on(LeadRegisterFormActions.openRegisterForm, (state) => ({
    ...state,
    isOpen: true,
    isSuccessMessage: false,
  })),
  on(LeadRegisterFormActions.closeRegisterForm, (state) => ({
    ...state,
    isOpen: false,
  })),
  on(LeadRegisterFormActions.showSuccessMessage, (state) => ({
    ...state,
    isSuccessMessage: true,
  }))
);

export function leadRegisterFormReducer(
  state: LeadRegisterFormStateModel | undefined,
  action: Action
): LeadRegisterFormStateModel {
  return reducer(state, action);
}
