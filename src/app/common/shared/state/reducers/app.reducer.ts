import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { IAppState } from '@shared/models';

export const appReducers: ActionReducerMap<IAppState> = {
  router: routerReducer,
};
