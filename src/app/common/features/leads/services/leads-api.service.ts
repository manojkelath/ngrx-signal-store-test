import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LeadRegisterPayloadModel } from '@features/leads/models/api';
import { GenericHttpService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class LeadsApiService {
  constructor(private http: GenericHttpService) {}

  public register(payload: LeadRegisterPayloadModel): Observable<any> {
    return this.http.post('service/omnichannel/customer/registerCustomer', {
      registerCustomer: {
        customerStatus: 'LEAD',
        firstName: '-',
        lastName: payload.name,
        companyName: payload.name,
        portalAccess: false,
        login: false,
        termsAccepted: false,
        email: payload.email,
        phoneNr: payload.phone,
        companyEmail: payload.email,
        companyPhoneNr: payload.phone,
        address: {
          line1: '-',
          locality: payload.city,
          stateOrProvince: payload.province,
          postalcode: '-',
          country: 'ID',
        },
      },
    });
  }
}
