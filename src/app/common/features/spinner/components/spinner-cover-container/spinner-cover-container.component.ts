import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { SpinnerCoverService } from '@features/spinner/services';

@Component({
  selector: 'kv-spinner-cover-container',
  templateUrl: './spinner-cover-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerCoverContainerComponent {
  public isLoading$: Observable<boolean> = this.spinnerCoverService.isLoadingDebounce$;

  constructor(private spinnerCoverService: SpinnerCoverService) {}
}
