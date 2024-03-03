import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { filter, map, Observable, tap, withLatestFrom } from 'rxjs';

import { AVAILABLE_LANGS, COOKIE_LANG_KEY, DEFAULT_LANG } from '@features/translate/constants';
import { TranslateActions } from '@features/translate/state/actions';
import { getActiveLanguage } from '@features/translate/state/selectors';
import { RouteQueryParamsEnum } from '@shared/enums';
import { IAppState } from '@shared/models';
import { DOMService } from '@shared/services';
import { InitActions } from '@shared/state/actions';
import { getQueryParamsFromWindow } from '@shared/utils';

@Injectable()
export class TranslateEffects {
  public defaultLanguageInitiated$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(InitActions.pageInitialized),
      tap(() => {
        const languageToken = this.domService.getCookie(COOKIE_LANG_KEY);
        if (!languageToken) {
          this.domService.setCookie(COOKIE_LANG_KEY, DEFAULT_LANG);
        }
      }),
      map(() => TranslateActions.switchLanguage({ lang: this.domService.getCookie(COOKIE_LANG_KEY) || DEFAULT_LANG }))
    )
  );

  public switchLanguageInitiated$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TranslateActions.switchLanguage),
      withLatestFrom(this.store$.pipe(select(getActiveLanguage))),
      filter(([{ lang }, activeLang]) => lang && lang !== activeLang),
      tap(([{ lang }]) => {
        this.domService.setCookie(COOKIE_LANG_KEY, lang);
        this.translocoService.setActiveLang(lang);
      }),
      map(([{ lang }]) => TranslateActions.switchLanguageSuccess({ lang }))
    )
  );

  public acpCodeInitiated$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(InitActions.shopPageInitialized),
      filter(() => window.location.search.includes(RouteQueryParamsEnum.LANG)),
      filter(() => {
        const lang = getQueryParamsFromWindow(RouteQueryParamsEnum.LANG);
        return (AVAILABLE_LANGS as string[]).includes(lang);
      }),
      map(() => TranslateActions.switchLanguage({ lang: getQueryParamsFromWindow(RouteQueryParamsEnum.LANG) }))
    )
  );

  constructor(
    private actions$: Actions,
    private translocoService: TranslocoService,
    private domService: DOMService,
    private store$: Store<IAppState>
  ) {}
}
