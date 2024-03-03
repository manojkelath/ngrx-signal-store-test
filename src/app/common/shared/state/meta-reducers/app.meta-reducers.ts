import { environment } from '@environment';

import { loggerMetaReducer } from './logger.meta-reducer';

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const appMetaReducers = environment.production ? [] : [loggerMetaReducer];
