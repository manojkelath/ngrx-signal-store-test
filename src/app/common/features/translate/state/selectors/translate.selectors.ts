import { createSelector } from '@ngrx/store';

import { getTranslateState } from './translate-base.selectors';

export const getActiveLanguage = createSelector(getTranslateState, (state) => state.activeLang);
