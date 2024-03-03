import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { mapUserInfoResponse } from '@features/auth/utils';
import { GenericHttpService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private genericHttpService: GenericHttpService) {}

  public getAllAccessService() {
    return this.genericHttpService.get(`service/idm/access/getAllServiceAccess`);
  }

  public getServiceAccess() {
    return this.genericHttpService.get(`service/idm/access/getServiceAccess?service=customer.accounting`);
  }

  public generateJWTToken() {
    return this.genericHttpService
      .post(`service/omnichannel/idm/generateJWTToken`, {})
      .pipe(map((response) => response?.token));
  }

  public getUserInfo() {
    return this.genericHttpService
      .get(`service/idm/user/getUserInfo`)
      .pipe(map((userInfo: any) => mapUserInfoResponse(userInfo)));
  }
}
