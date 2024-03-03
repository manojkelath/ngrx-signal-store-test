import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AddressReferencesActions = createActionGroup({
  source: 'Address References',
  events: {
    'Load Provinces': emptyProps(),
    'Load Cities': props<{ provinceCode: string }>(),
    'Load Districts': props<{ cityCode: string }>(),
    'Load Subdistricts': props<{ districtCode: string }>(),
    'Load Postal Codes': props<{ subdistrictCode: string }>(),
  },
});
