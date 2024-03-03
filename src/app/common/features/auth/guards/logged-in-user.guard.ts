import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { AuthPageActions } from '@features/auth//state/actions';
import { AuthUiWrapperContainerComponent } from '@features/auth/components';
import { LOGIN_POPUP_SUCCESS } from '@features/auth/constants';
import { AuthPageRequestedByEnum } from '@features/auth/enums';
import { getIsUserVerified } from '@features/auth/state/selectors';
import { waitUntilUserInitialized } from '@features/auth/utils';
import { ModalOverlayService } from '@features/overlay';
import { AppRoutesEnum } from '@shared/enums';
import { IAppState } from '@shared/models';
import { isSpecificPage } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class LoggedInUserGuard implements CanLoad, CanActivate {
  constructor(private store$: Store<IAppState>, private router: Router, private overlayService: ModalOverlayService) {}

  public canLoad(route: Route): Observable<boolean> {
    return this.getLoggedInUserGuardFn(route?.path);
  }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.getLoggedInUserGuardFn(route?.routeConfig?.path);
  }

  private getLoggedInUserGuardFn(routeUrl): Observable<boolean> {
    if (isSpecificPage(AppRoutesEnum.PRODUCT_PAYMENT, `/${routeUrl}`)) {
      this.store$.dispatch(AuthPageActions.storePageRequestedBy({ requestedBy: AuthPageRequestedByEnum.PAYMENT_PAGE }));
    }

    return this.store$.pipe(waitUntilUserInitialized(this.store$), select(getIsUserVerified)).pipe(
      switchMap((isUserVerified) => {
        if (isUserVerified) {
          return of(true);
        } else {
          return this.overlayService
            .openModal(AuthUiWrapperContainerComponent)
            .pipe(
              switchMap((response) =>
                response === LOGIN_POPUP_SUCCESS
                  ? this.store$.pipe(select(getIsUserVerified), filter(Boolean), take(1))
                  : of(false)
              )
            );
        }
      }),
      map((data) => {
        if (!data) {
          if (window.location.pathname.includes(AppRoutesEnum.PRODUCT_PAYMENT)) {
            this.router.navigate([AppRoutesEnum.PRODUCT, AppRoutesEnum.PRODUCT_CATALOG]);
          }
          return false;
        } else {
          return true;
        }
      }),
      take(1)
    );
  }
}
