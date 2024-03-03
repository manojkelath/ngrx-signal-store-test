import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { StatusNotificationsApiModel } from '@features/status-notifications/models/api';
import { GenericHttpService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class StatusNotificationsService {
  constructor(private genericHttpService: GenericHttpService) {}

  public getNotifications(): Observable<StatusNotificationsApiModel> {
    return this.genericHttpService
      .get('service/omnichannel/notification/getNotifications')
      .pipe(map(({ notificationStatusResponse }) => notificationStatusResponse));
  }
}
