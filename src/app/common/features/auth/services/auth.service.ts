import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import {
  IChangePasswordModel,
  IForgotPasswordModel,
  IIdentificationRequestModel,
  ILoginInfoModel,
  ISignUpInfoModel,
} from '@features/auth/models';
import { AhChangePasswordPayloadModel } from '@features/auth/models/api';
import {
  mapContactMediumAddressPayload,
  mapContactMediumMobilePhonePayload,
  updateContact,
} from '@features/auth/utils';
import { GenericHttpService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private genericHttpService: GenericHttpService, private httpClient: HttpClient) {}

  public login(loginInfo: ILoginInfoModel): Observable<any> {
    return this.genericHttpService.post(`service/idm/authentication/login`, { userLogin: loginInfo });
  }

  public changePasswordVerifiedUser(changePassword: IChangePasswordModel): Observable<any> {
    return this.genericHttpService.post('service/idm/authentication/changePassword', {
      changePassword: {
        passwordRestriction: {
          minLength: 8,
          upper: true,
          digit: true,
          nonAlpha: true,
          __internalId: 'dynamicModel13',
        },
        ...changePassword,
        __metadata: { type: 'com.kloudville.idm.changePassword' },
      },
    });
  }

  public changePasswordNotVerifiedUser(changePassword: IChangePasswordModel): Observable<any> {
    return this.genericHttpService.post('service/idm/authentication/login', {
      changePassword: {
        passwordRestriction: {
          minLength: 8,
          upper: true,
          digit: true,
          nonAlpha: true,
          __internalId: 'dynamicModel13',
        },
        ...changePassword,
        __metadata: { type: 'com.kloudville.idm.changePassword' },
      },
    });
  }

  public ahChangePassword(
    changePasswordPayload: AhChangePasswordPayloadModel,
    url: string,
    apiKey: string
  ): Observable<any> {
    return this.httpClient.post(`${url}/api/v1/extusrmgmt/setPassword`, changePasswordPayload, {
      headers: { ['api-key']: apiKey, Accept: '*/*', ['Content-Type']: 'application/json' },
    });
  }

  public forgotPassword(forgotPassword: IForgotPasswordModel): Observable<any> {
    return this.genericHttpService.post(`service/idm/authentication/forgotPassword`, { forgotPassword });
  }

  public kvSignup(registerCustomer: ISignUpInfoModel): Observable<any> {
    return this.genericHttpService.post('service/omnichannel/customer/registerCustomer', { registerCustomer });
  }

  public grantPortalAccess(registerCustomer: ISignUpInfoModel): Observable<any> {
    return this.genericHttpService.post('service/omnichannel/customer/grantPortalAccess', { registerCustomer });
  }

  public sendValidationCode(validationCodeRequest: ISignUpInfoModel): Observable<any> {
    return this.genericHttpService.post(`service/customer/portal/sendValidationCode`, {
      validationCodeRequest: {
        name: validationCodeRequest.firstName + ' ' + validationCodeRequest.lastName,
        email: validationCodeRequest.email,
      },
    });
  }

  public checkValidationCode(validationRequest): Observable<any> {
    return this.genericHttpService.post(`service/customer/portal/checkValidationCode`, {
      validationRequest: {
        name: validationRequest.firstName + ' ' + validationRequest.lastName,
        contact: validationRequest.email,
        code: validationRequest.code,
      },
    });
  }

  public selfRegisterCustomer(registerCustomer: ISignUpInfoModel, validationCode: string): Observable<any> {
    return this.genericHttpService.post(`service/customer/portal/selfRegisterCustomer`, {
      registerCustomer: {
        ...registerCustomer,
        validationCode: [validationCode],
      },
    });
  }

  public registerCustomerIdentification(customerIdentificationRequest: IIdentificationRequestModel): Observable<any> {
    return this.genericHttpService.post(`service/omnichannel/customer/registerCustomerIdentification`, {
      customerIdentificationRequest,
    });
  }

  public addPartyIdentification(identificationChangeRequest: any) {
    return this.genericHttpService.post(`service/customer/portal/addPartyIdentification`, {
      identificationChangeRequest,
    });
  }

  public updateContact(partyRoleId: string, placeOfBirth: string, nationality: string, birthDate: string) {
    return this.genericHttpService
      .post(`service/portal/contact/getContact`, {
        partyRoleRequest: {
          partyRoleId,
        },
      })
      .pipe(
        switchMap((data) =>
          this.genericHttpService.post(
            `service/portal/contact/updateContact`,
            updateContact(data, placeOfBirth, nationality, birthDate)
          )
        )
      );
  }

  public addContactMediumAddress(partyRoleId: string, data: any) {
    return this.genericHttpService.post(
      `service/customer/portal/addContactMedium`,
      mapContactMediumAddressPayload(partyRoleId, data)
    );
  }

  public addContactMediumMobilePhone(partyRoleId: string, data: any) {
    return this.genericHttpService.post(
      `service/customer/portal/addContactMedium`,
      mapContactMediumMobilePhonePayload(partyRoleId, data)
    );
  }

  public addContactPartyIdentification(identificationChangeRequest: any) {
    return this.genericHttpService.post(`service/portal/contact/addPartyIdentification`, {
      identificationChangeRequest,
    });
  }

  public logout(): Observable<any> {
    return this.genericHttpService.get(`service/idm/authentication/logout`);
  }

  public ahSignUp(registerCustomer, url, apiKey) {
    return this.httpClient.post(`${url}/api/v1/usrmgmt/setSignUp`, registerCustomer, {
      headers: { ['api-key']: apiKey },
    });
  }

  public ahLogout(url: string, apiKey: string, email: string): Observable<any> {
    return this.httpClient.post(`${url}/api/v1/usrmgmt/setLogout`, { email }, { headers: { ['api-key']: apiKey } });
  }
}
