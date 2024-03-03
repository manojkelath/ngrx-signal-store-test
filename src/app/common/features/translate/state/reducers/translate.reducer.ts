import { Action, createReducer, on } from '@ngrx/store';

import { TranslateActions } from '@features/translate/state/actions';

export const initialTranslateState = {
  activeLang: null,
};

const reducer = createReducer(
  initialTranslateState,
  on(TranslateActions.switchLanguageSuccess, (state, { lang }) => ({
    ...state,
    activeLang: lang,
  }))
);

export function translateReducer(state: any | undefined, action: Action): any {
  return reducer(state, action);
}
