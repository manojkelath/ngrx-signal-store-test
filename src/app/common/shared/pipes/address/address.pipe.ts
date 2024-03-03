import { Pipe, PipeTransform } from '@angular/core';

import { AddressModel } from '@shared/models';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform {
  public transform(address: AddressModel) {
    if (!address) return '-';

    return `${address?.line1}, ${address?.stateOrProvince}, ${address?.postalcode} ${address?.country}`;
  }
}
