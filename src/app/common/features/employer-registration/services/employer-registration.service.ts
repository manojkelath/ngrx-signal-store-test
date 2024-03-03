import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

import { EmployerRegistrationPayloadModel } from '@features/employer-registration/models/api';
import { GenericHttpService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class EmployerRegistrationService {
  constructor(private http: GenericHttpService) {}

  public registerEmployer(payload: EmployerRegistrationPayloadModel): Observable<any> {
    return this.http.post('service/omnichannel/epp/registerEmployer', { registerEmployer: payload }).pipe(
      map(({ registerEmployerResponse }) => registerEmployerResponse),
      catchError((error) => of(error))
    );
  }

  public validateRegistrationStatus(organization: string): Observable<any> {
    return this.http
      .post('service/omnichannel/epp/validateRegistrationStatus', { validateRegistrationStatus: { organization } })
      .pipe(
        // eslint-disable-next-line @typescript-eslint/naming-convention
        map(({ ValidateRegistrationResult }) => ValidateRegistrationResult)
      );
  }
}
