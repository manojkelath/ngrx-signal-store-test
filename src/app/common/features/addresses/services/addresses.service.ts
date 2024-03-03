import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AddressCreateApiModel,
  AddressLocationResponseApiModel,
  AddressUpdateApiModel,
} from '@features/addresses/models/api';
import { GenericHttpService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class AddressesService {
  constructor(private genericHttpService: GenericHttpService) {}

  public getAddresses(partyRoleId: string): Observable<AddressLocationResponseApiModel[]> {
    return this.genericHttpService
      .get('service/customer/portal/getLocations', { partyRoleId })
      .pipe(map(({ locationList }) => locationList?.location));
  }

  public getAssociations(ownerId: string) {
    return this.genericHttpService
      .get('service/customer/portal/getAssociations', { ownerId })
      .pipe(map(({ associationList }) => associationList?.association));
  }

  public deleteAddress(locationId: string, partyRoleId: string) {
    return this.genericHttpService.get('service/customer/portal/deleteLocation', {
      locationId,
      partyRoleId,
    });
  }

  public createAddress(body: AddressCreateApiModel) {
    return this.genericHttpService.post('service/customer/portal/createLocation', body);
  }

  public updateAddress(body: AddressUpdateApiModel) {
    return this.genericHttpService.post('service/customer/portal/updateLocation', body);
  }
}
