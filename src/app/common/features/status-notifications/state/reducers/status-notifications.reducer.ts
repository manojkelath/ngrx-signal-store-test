import { Action, createReducer, on } from '@ngrx/store';

import { StatusNotificationsStateModel } from '@features/status-notifications/models/state';
import { StatusNotificationsActions } from '@features/status-notifications/state/actions';

export const initialStatusNotificationsState: StatusNotificationsStateModel = {
  notifications: null,
};

const reducer = createReducer(
  initialStatusNotificationsState,
  on(StatusNotificationsActions.reset, (_state) => initialStatusNotificationsState),
  on(StatusNotificationsActions.loadSuccess, (state, { notifications, lang }) => ({
    ...state,
    notifications: { ...state.notifications, [lang]: notifications },
  }))
);

export function statusNotificationsFeatureReducer(
  state: StatusNotificationsStateModel | undefined,
  action: Action
): StatusNotificationsStateModel {
  return reducer(state, action);
}
