import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TermsToSubscribeService } from '@features/terms/services';
import { TermsToSubscribeApiActions, TermsToSubscribePageActions } from '@features/terms/state/actions';
import { IAppState } from '@shared/models';

@Component({
  selector: 'kv-terms-to-subscribe-container',
  templateUrl: './terms-to-subscribe-container.component.html',
  styleUrls: ['./terms-to-subscribe-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsToSubscribeContainerComponent implements OnInit {
  public terms$: Observable<any> = this.termsToSubscribeService.terms$;

  constructor(private termsToSubscribeService: TermsToSubscribeService, private store$: Store<IAppState>) {}

  public ngOnInit(): void {
    this.store$.dispatch(TermsToSubscribePageActions.overlayInitiated());
  }

  public onAcceptEvent(terms): void {
    this.store$.dispatch(TermsToSubscribeApiActions.acceptTerms({ terms }));
  }
}
