export const PAYMENT_STATUS_INTERVAL_SECONDS = 10;
export const PAYMENT_STATUS_INTERVAL_MILLISECONDS = PAYMENT_STATUS_INTERVAL_SECONDS * 1000;
export const PAYMENT_STATUS_DURATION_SECONDS = 3600;
export const PAYMENT_BERSAMA_STATUS_DURATION_SECONDS = 3600 * 3;

export const PAYMENT_STATUS_REQUEST_COUNT = PAYMENT_STATUS_DURATION_SECONDS / PAYMENT_STATUS_INTERVAL_SECONDS;

export const PAYMENT_BERSAMA_STATUS_REQUEST_COUNT =
  PAYMENT_BERSAMA_STATUS_DURATION_SECONDS / PAYMENT_STATUS_INTERVAL_SECONDS;
