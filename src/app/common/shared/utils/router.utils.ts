import { select } from '@ngrx/store';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { AppRoutesEnum } from '@shared/enums';
import { getIsRouterReady } from '@shared/state/selectors';

export const waitUntilRouterReady = (store$) =>
  switchMap((value) =>
    store$.pipe(
      select(getIsRouterReady),
      filter(Boolean),
      take(1),
      map(() => value)
    )
  );

export const isSpecificPage = (route: AppRoutesEnum | string, url) => url && url.indexOf(`/${route}`) > -1;
export const isExactRoute = (route: AppRoutesEnum | string, url) => url && url.split('?')[0] === `/${route}`;
