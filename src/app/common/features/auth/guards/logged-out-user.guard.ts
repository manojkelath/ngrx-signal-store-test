import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { getIsUserVerified } from '@features/auth/state/selectors';
import { AppRoutesEnum } from '@shared/enums';
import { IAppState } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class LoggedOutUserGuard implements CanActivate {
  constructor(private store$: Store<IAppState>, private router: Router) {}

  public canActivate(): Observable<boolean> {
    return this.store$.pipe(select(getIsUserVerified)).pipe(
      take(1),
      map((isUserVerified) => {
        if (isUserVerified) {
          this.router.navigate([AppRoutesEnum.DEFAULT]);
          return false;
        }

        return true;
      })
    );
  }
}
