import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AcceptTermsParamsApiModel } from '@features/terms/models/api';
import { GenericHttpService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class TermsApiService {
  constructor(private genericHttpService: GenericHttpService) {}

  public getTerms(): Observable<any> {
    return this.genericHttpService.get('service/idm/user/getServiceTerms');
  }

  public acceptTerms(payload: AcceptTermsParamsApiModel): Observable<any> {
    return this.genericHttpService.post('service/idm/user/acceptServiceTerms', { serviceTerms: payload });
  }
}
