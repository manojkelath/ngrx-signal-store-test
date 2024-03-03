import { Action, createReducer, on } from '@ngrx/store';

import { PaymentInstructionsFeatureStateModel } from '@features/payment-instructions/models/state';
import { PaymentInstructionsActions } from '@features/payment-instructions/state/actions';
import { generateInstructionCode } from '@features/payment-instructions/utils';

export const initialPaymentInstructionsState: PaymentInstructionsFeatureStateModel = {
  instructions: null,
};

const reducer = createReducer(
  initialPaymentInstructionsState,
  on(PaymentInstructionsActions.retrieveSuccess, (state, { response, lang }) => ({
    ...state,
    instructions: {
      ...state.instructions,
      [generateInstructionCode(response.paymentMethod, lang)]: response.paymentInstructions || [],
    },
  }))
);

export function paymentInstructionsFeatureReducer(
  state: PaymentInstructionsFeatureStateModel | undefined,
  action: Action
): PaymentInstructionsFeatureStateModel {
  return reducer(state, action);
}
