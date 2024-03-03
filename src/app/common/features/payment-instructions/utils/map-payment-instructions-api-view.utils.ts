import { PaymentInstructionsApiModel } from '@features/payment-instructions/models/api';
import { PaymentInstructionsViewModel } from '@features/payment-instructions/models/view';

export const mapPaymentInstructionsApiToView = (
  instructions: PaymentInstructionsApiModel[]
): PaymentInstructionsViewModel[] =>
  (instructions || []).map((instruction, index) => ({
    id: index,
    title: instruction.title,
    description: instruction.introductoryText,
    instructions: (instruction?.instructions || []).map((instructionText) => instructionText?.instruction),
  }));
