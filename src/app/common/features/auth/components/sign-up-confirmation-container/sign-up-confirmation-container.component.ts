import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RegistrationModelEnum } from '@features/app-configuration/enums';
import { AuthPagesEnum } from '@features/auth/enums';
import { AuthPageActions } from '@features/auth/state/actions';
import { getRegistrationModel } from '@features/auth/state/selectors';
import { IAppState } from '@shared/models';

@Component({
  selector: 'kv-sign-up-confirmation-container',
  templateUrl: './sign-up-confirmation-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpConfirmationContainerComponent {
  public registrationModel$: Observable<RegistrationModelEnum> = this.store$.pipe(select(getRegistrationModel));

  constructor(private store$: Store<IAppState>) {}

  public onCloseModal() {
    this.store$.dispatch(AuthPageActions.authOverlayPageChanged({ page: AuthPagesEnum.LOGIN }));
  }
}
