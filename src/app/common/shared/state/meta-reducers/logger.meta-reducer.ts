import { ActionReducer } from '@ngrx/store';

import { IAppState } from '@shared/models';

// console.log all actions and state after
export function loggerMetaReducer(reducer: ActionReducer<IAppState>): ActionReducer<IAppState> {
  return (state: IAppState, action: any): IAppState => {
    console.log('action', action);

    const stateAfter = reducer(state, action);

    console.log('state after', stateAfter);

    return stateAfter;
  };
}
