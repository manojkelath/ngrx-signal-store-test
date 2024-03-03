import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LeadRegisterFormActions } from '@features/leads/state/actions';
import { selectLeadFormOpenState } from '@features/leads/state/selectors';
import { IAppState } from '@shared/models';

@Component({
  selector: 'kv-lead-register-container',
  templateUrl: './lead-register-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadRegisterContainerComponent {
  public isFormOpened$: Observable<boolean> = this.store$.pipe(select(selectLeadFormOpenState));

  constructor(private store$: Store<IAppState>) {}

  public showFormAction(): void {
    this.store$.dispatch(LeadRegisterFormActions.openRegisterForm());
  }
}
