import { select } from '@ngrx/store';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { getAppConfigurationState } from '@features/app-configuration/state/selectors';

export const waitUntilAppConfigurationReady = (store$) =>
  switchMap((value) =>
    store$.pipe(
      select(getAppConfigurationState),
      filter(Boolean),
      take(1),
      map(() => value)
    )
  );
