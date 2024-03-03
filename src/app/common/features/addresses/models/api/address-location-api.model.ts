import { StatusEnum } from '@features/addresses/enums';

import { AddressAPIModel } from './address-api.model';

export interface AddressLocationApiModel extends AddressAPIModel {
  $addressType: string;
  line2: string;
  status?: StatusEnum;
  isResidential: boolean;
}
