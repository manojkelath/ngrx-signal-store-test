import { DEFAULT_ERROR_MESSAGE } from '@features/error-handler/constants';

export const mapApiErrorToString = (error: any): string => {
  let errorMessage = DEFAULT_ERROR_MESSAGE;

  if ((error as any)?.error?.message?.text) {
    errorMessage = error.error.message.text;
  }

  return errorMessage;
};
