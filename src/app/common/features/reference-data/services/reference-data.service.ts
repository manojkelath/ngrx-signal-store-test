import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GenericHttpService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class ReferenceDataService {
  constructor(private genericHttpService: GenericHttpService) {}

  public getReferenceData(resourceKey: string, params: any = {}): Observable<any> {
    return this.genericHttpService.post(`service/omnichannel/catalog/getEnumeration`, {
      dynamicEnumRequest: {
        enumeration: resourceKey,
        ...params,
      },
    });
  }
}
