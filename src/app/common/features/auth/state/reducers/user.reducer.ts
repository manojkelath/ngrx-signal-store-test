import { Action, createReducer, on } from '@ngrx/store';

import { IUserStateModel } from '@features/auth/models';
import { UserActions } from '@features/auth/state/actions';

export const initialUserState: IUserStateModel = {
  currentUser: null,
  isUserStateInitialized: false,
};

const reducer = createReducer(
  initialUserState,
  on(UserActions.invalidTokenDetected, (state) => ({ ...state, currentUser: initialUserState.currentUser })),
  on(UserActions.apiUserChanged, (state, { userInfo }) => ({
    ...state,
    currentUser: userInfo,
    isUserStateInitialized: true,
  }))
);

export function userReducer(state: IUserStateModel | undefined, action: Action): IUserStateModel {
  return reducer(state, action);
}
