import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';

import { UserActions } from '@features/auth/state/actions';
import { ErrorHandlerActions } from '@features/error-handler/state/actions';
import { SpinnerCoverService } from '@features/spinner';
import { IAppState } from '@shared/models';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store$: Store<IAppState>, private spinnerService: SpinnerCoverService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes('/service')) {
      return next.handle(request);
    }

    this.store$.dispatch(ErrorHandlerActions.clearErrors());

    return next.handle(request).pipe(catchError(this.handleAuthError.bind(this)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      this.spinnerService.end();
      this.store$.dispatch(UserActions.invalidTokenDetected());
      this.store$.dispatch(ErrorHandlerActions.showGenericErrorMessage());
      // Error is already handled so we can just `complete`
      return EMPTY;
    }
    return throwError(() => err);
  }
}
