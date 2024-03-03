import { createSelector } from '@ngrx/store';

import { OrderWithConfigurableInformationStateModel } from '@features/order/models/state';

import { getOrderState } from './order-base.selectors';

export const getOrderDetails = createSelector(getOrderState, (state) => state?.order);

export const getOrderWithConfigurableInformation = createSelector(getOrderState, (state) =>
  state?.order
    ? ({
        order: state.order,
        orderConfigurableInformation: state?.orderConfigurableInformation,
      } as OrderWithConfigurableInformationStateModel)
    : null
);
