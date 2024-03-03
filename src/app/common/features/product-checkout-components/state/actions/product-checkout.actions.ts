import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProductCheckoutActions = createActionGroup({
  source: 'Checkout API',
  events: {
    'Location initiated': props<{ productCategoryId: string }>(),
    'Province initiated': emptyProps(),
    'Registration type initiated': emptyProps(),
    'City initiated': props<{ code: string }>(),
  },
});
