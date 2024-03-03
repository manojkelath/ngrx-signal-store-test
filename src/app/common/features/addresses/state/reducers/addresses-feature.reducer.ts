import { Action, on } from '@ngrx/store';

import { ADDRESS_API_KEY } from '@features/addresses/constants';
import { AddressesFeatureStateModel } from '@features/addresses/models/state';
import { AddressesActions } from '@features/addresses/state/actions';
import { AuthActions, UserActions } from '@features/auth/state/actions';
import { DEFAULT_ENTITIES_STATE } from '@shared/entity-state/constants';
import { createEntityReducerWithProp } from '@shared/entity-state/utils';

export const initialAddressesState: AddressesFeatureStateModel = {
  ...DEFAULT_ENTITIES_STATE,
  isLoaded: false,
};

const reducer = createEntityReducerWithProp(
  initialAddressesState,
  ADDRESS_API_KEY,
  {
    resetActions: [UserActions.invalidTokenDetected, AuthActions.logoutSuccess],
    overrideActions: AddressesActions.retrieveSuccess,
    deleteActions: AddressesActions.deleteSuccess,
  },
  on(AddressesActions.retrieveSuccess, (state) => ({
    ...state,
    isLoaded: true,
  })),
  on(UserActions.invalidTokenDetected, AuthActions.loginSuccess, (state) => ({
    ...state,
    isLoaded: false,
  }))
);

export function addressesFeatureReducer(
  state: AddressesFeatureStateModel | undefined,
  action: Action
): AddressesFeatureStateModel {
  return reducer(state, action);
}
