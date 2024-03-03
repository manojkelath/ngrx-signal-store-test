import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ErrorHandlerService } from '@features/error-handler';
import { NotificationTypeEnum } from '@features/notifications/enums';

@Component({
  selector: 'kv-warning-handler-container',
  templateUrl: './warning-handler-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarningHandlerContainerComponent {
  public warning$: Observable<string | null> = this.errorHandlerService.warningMessage$;

  public type = NotificationTypeEnum;

  constructor(private errorHandlerService: ErrorHandlerService) {}

  public onHide() {
    this.errorHandlerService.hide();
  }
}
