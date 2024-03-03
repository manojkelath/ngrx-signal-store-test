import { AddressNameCodesViewModel } from '@features/addresses/models/view';

export interface AddressCreateEditViewModel {
  addressId: string;
  name: string;
  codes: AddressNameCodesViewModel;
  type: string;
  line1: string;
  line2: string;
  province: string;
  city: string;
  district: string;
  subdistrict: string;
  postalCode: string;
  isNewFormat: boolean;
}
