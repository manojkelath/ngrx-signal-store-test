import { ActionReducerMap } from '@ngrx/store';

import { IAuthFeatureStateModel } from '@features/auth/models';

import { authPageReducer } from './auth-page.reducer';
import { userReducer } from './user.reducer';

export const authFeatureReducers: ActionReducerMap<IAuthFeatureStateModel> = {
  authPage: authPageReducer,
  user: userReducer,
};
