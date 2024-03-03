import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthPagesEnum } from '@features/auth/enums';
import { getActiveAuthPage } from '@features/auth/state/selectors';
import { IAppState } from '@shared/models';

@Component({
  selector: 'kv-auth-ui-wrapper-container',
  templateUrl: './auth-ui-wrapper-container.component.html',
  styleUrls: ['./auth-ui-wrapper-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthUiWrapperContainerComponent {
  public activePage$: Observable<AuthPagesEnum> = this.store$.pipe(select(getActiveAuthPage));

  constructor(private store$: Store<IAppState>) {}
}
