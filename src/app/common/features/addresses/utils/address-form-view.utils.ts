import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddressCreateEditFromControlNameEnum } from '@features/addresses/enums';
import { AddressCreateEditFormViewModel, AddressCreateEditViewModel } from '@features/addresses/models/view';

import { cityFormatValidator, postalCodePatternFormatValidator } from './address-form-validators.utils';

export const getAddressFormFormGroupView = (
  fb: FormBuilder,
  address: AddressCreateEditViewModel,
  isEditMode: boolean
): FormGroup<AddressCreateEditFormViewModel> =>
  fb.group({
    [AddressCreateEditFromControlNameEnum.NAME]: [address?.name || '', [Validators.required]],
    [AddressCreateEditFromControlNameEnum.TYPE]: [address?.type || '', [Validators.required]],
    [AddressCreateEditFromControlNameEnum.LINE_1]: [address?.line1 || '', [Validators.required]],
    [AddressCreateEditFromControlNameEnum.LINE_2]: [address?.line2 || ''],
    [AddressCreateEditFromControlNameEnum.PROVINCE]: [address?.province || '', [Validators.required]],
    [AddressCreateEditFromControlNameEnum.CITY]: [
      address?.city || '',
      [Validators.required, ...(isEditMode ? [cityFormatValidator] : [])],
    ],
    [AddressCreateEditFromControlNameEnum.DISTRICT]: [address?.district || '', [Validators.required]],
    [AddressCreateEditFromControlNameEnum.SUBDISTRICT]: [address?.subdistrict || '', [Validators.required]],
    [AddressCreateEditFromControlNameEnum.POSTAL_CODE]: [
      address?.postalCode || '',
      [Validators.required, postalCodePatternFormatValidator],
    ],
  });
