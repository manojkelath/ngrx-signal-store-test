import { createSelector } from '@ngrx/store';

import { generateInstructionCode, mapPaymentInstructionsApiToView } from '@features/payment-instructions/utils';
import { getActiveLanguage } from '@features/translate/state/selectors';
import { PaymentMethodEnum } from '@shared/enums';

import { getPaymentInstructionsState } from './payment-instructions-base.selectors';

export const getPaymentInstructions = (paymentMethod: PaymentMethodEnum) =>
  createSelector(
    getPaymentInstructionsState,
    getActiveLanguage,
    (instructions, lang) => instructions?.[generateInstructionCode(paymentMethod, lang)] || null
  );

export const getInstructions = (paymentMethod: PaymentMethodEnum) =>
  createSelector(getPaymentInstructions(paymentMethod), (instructions) =>
    mapPaymentInstructionsApiToView(instructions)
  );
