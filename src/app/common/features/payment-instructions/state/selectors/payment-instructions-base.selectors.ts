import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PaymentInstructionsFeatureStateModel } from '@features/payment-instructions/models/state';

export const paymentInstructionsFeatureName = 'paymentInstructionsFeature';

export const getPaymentInstructionsFeatureState =
  createFeatureSelector<PaymentInstructionsFeatureStateModel>(paymentInstructionsFeatureName);

export const getPaymentInstructionsState = createSelector(
  getPaymentInstructionsFeatureState,
  (state) => state?.instructions
);
