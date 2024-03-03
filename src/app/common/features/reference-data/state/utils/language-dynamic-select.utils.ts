import { select, Selector, Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';

import { getActiveLanguage } from '@features/translate/state/selectors';
import { IAppState } from '@shared/models';

export const createLanguageDynamicReferenceDataSelect = (
  store$: Store<IAppState>,
  selector: (...arg) => Selector<any, any>,
  params: any[]
): Observable<any> =>
  store$.pipe(
    select(getActiveLanguage),
    switchMap((lang) => store$.pipe(select(selector(...params, lang))))
  );
