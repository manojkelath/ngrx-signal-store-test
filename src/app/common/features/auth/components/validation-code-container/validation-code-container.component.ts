import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ConfValidationCodeModel } from '@features/auth/models';
import { AuthActions, AuthPageActions } from '@features/auth/state/actions';
import { getConfValidationCode, getEmailSignupInfo } from '@features/auth/state/selectors';
import { IAppState } from '@shared/models';

@Component({
  selector: 'kv-validation-code-container',
  templateUrl: './validation-code-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationCodeContainerComponent {
  public email$: Observable<string> = this.store$.pipe(select(getEmailSignupInfo));
  public confValidationCode$: Observable<ConfValidationCodeModel> = this.store$.pipe(select(getConfValidationCode));
  constructor(private store$: Store<IAppState>) {}

  public onCancel(): void {
    this.store$.dispatch(AuthPageActions.authOverlayClosed());
  }

  public onBack(): void {
    this.store$.dispatch(AuthPageActions.openSignUpPage());
  }

  public onCheckValidationCode(code: string) {
    this.store$.dispatch(AuthActions.checkValidationCodeInitiated({ code }));
  }

  public onResetValidationCode() {
    this.store$.dispatch(AuthActions.sendValidationCodeInitiated());
  }
}
