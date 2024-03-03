import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppConfigurationApiModel } from '@features/app-configuration/models/api';
import { GenericHttpService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class AppConfigurationService {
  constructor(private genericHttpService: GenericHttpService) {}

  public getConfiguration(): Observable<AppConfigurationApiModel> {
    return this.genericHttpService
      .post('service/omnichannel/configuration/getConfiguration', null)
      .pipe(map((response) => response?.configuration));
  }
}
