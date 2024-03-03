import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, Observable, tap } from 'rxjs';

import { ACPCodeService } from '@features/acp-code/services';
import { AcpCodeActions } from '@features/acp-code/state/actions';
import { RouteQueryParamsEnum } from '@shared/enums';
import { InitActions } from '@shared/state/actions';
import {
  getHashQueryParamsFromWindow,
  getQueryParamsFromWindow,
  removeQueryAndHashQueryParamsFromWindow,
  removeQueryParamsFromWindow,
} from '@shared/utils';

@Injectable()
export class ACPCodeEffects {
  public acpCodeInitiated$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(InitActions.shopPageInitialized),
        filter(() => window.location.search.includes(RouteQueryParamsEnum.ACP_CODE)),
        tap(() => {
          this.acpCodeService.setACPCode(getQueryParamsFromWindow(RouteQueryParamsEnum.ACP_CODE));
          window.history.replaceState(
            {},
            null,
            removeQueryParamsFromWindow(window.location.href, RouteQueryParamsEnum.ACP_CODE)
          );
        })
      ),
    { dispatch: false }
  );

  public zealsCodeInitiated$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(InitActions.shopPageInitialized),
        map(
          () =>
            getQueryParamsFromWindow(RouteQueryParamsEnum.ZEALS_CODE) ||
            getHashQueryParamsFromWindow(RouteQueryParamsEnum.ZEALS_CODE)
        ),
        filter((zealsCode) => !!zealsCode),
        tap((zealsCode) => {
          this.acpCodeService.setZealsCode(zealsCode);
          window.history.replaceState(
            {},
            null,
            removeQueryAndHashQueryParamsFromWindow(window.location.href, RouteQueryParamsEnum.ZEALS_CODE)
          );
        })
      ),
    { dispatch: false }
  );

  public clearAcpCode: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AcpCodeActions.clear),
        tap(() => {
          this.acpCodeService.clearACPCode();
          this.acpCodeService.clearZealsCode();
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private acpCodeService: ACPCodeService) {}
}
