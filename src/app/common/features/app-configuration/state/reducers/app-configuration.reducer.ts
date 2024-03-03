import { Action, createReducer, on } from '@ngrx/store';

import { AppConfigurationApiModel } from '@features/app-configuration/models/api';
import { AppConfigurationApiActions } from '@features/app-configuration/state/actions';

export const initialFiltersState: AppConfigurationApiModel = {
  advisoryHub: undefined,
  registration: undefined,
  shop: undefined,
  zeals: undefined,
  googleAnalytics: undefined,
};

const reducer = createReducer(
  initialFiltersState,
  on(AppConfigurationApiActions.loadSuccess, (_, { configuration }) => configuration)
);

export function appConfigurationFeatureReducer(state: AppConfigurationApiModel | undefined, action: Action): any {
  return reducer(state, action);
}
