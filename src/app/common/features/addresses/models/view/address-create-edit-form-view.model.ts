import { FormControl } from '@angular/forms';

import { AddressCreateEditFromControlNameEnum } from '@features/addresses/enums';

export interface AddressCreateEditFormViewModel {
  [AddressCreateEditFromControlNameEnum.NAME]: FormControl<string>;
  [AddressCreateEditFromControlNameEnum.TYPE]: FormControl<string>;
  [AddressCreateEditFromControlNameEnum.LINE_1]: FormControl<string>;
  [AddressCreateEditFromControlNameEnum.LINE_2]: FormControl<string>;
  [AddressCreateEditFromControlNameEnum.PROVINCE]: FormControl<string>;
  [AddressCreateEditFromControlNameEnum.CITY]: FormControl<string>;
  [AddressCreateEditFromControlNameEnum.DISTRICT]: FormControl<string>;
  [AddressCreateEditFromControlNameEnum.SUBDISTRICT]: FormControl<string>;
  [AddressCreateEditFromControlNameEnum.POSTAL_CODE]: FormControl<string>;
}
