import { select } from '@ngrx/store';
import { filter, map, switchMap, take } from 'rxjs';

import {
  getIsUserStateInitialized,
  getIsUserTermsInitialized,
  getIsUserVerified,
} from '@features/auth/state/selectors';

export const waitUntilUserInitialized = (store$) =>
  switchMap((value) =>
    store$.pipe(
      select(getIsUserStateInitialized),
      filter(Boolean),
      take(1),
      map(() => value)
    )
  );

export const waitUntilUserVerified = (store$) =>
  switchMap((value) =>
    store$.pipe(
      select(getIsUserVerified),
      filter(Boolean),
      take(1),
      map(() => value)
    )
  );

export const waitUntilUserTermsInitialized = (store$) =>
  switchMap((value) =>
    store$.pipe(
      select(getIsUserTermsInitialized),
      filter(Boolean),
      take(1),
      map(() => value)
    )
  );
