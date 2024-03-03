import { createSelector } from '@ngrx/store';

import { selectRegisterFormState } from './leads-base.selectors';

export const selectLeadFormOpenState = createSelector(selectRegisterFormState, (state) => state.isOpen);

export const selectSuccessMessageState = createSelector(selectRegisterFormState, (state) => state.isSuccessMessage);
