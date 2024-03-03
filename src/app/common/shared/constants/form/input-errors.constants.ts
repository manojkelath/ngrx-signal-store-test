import {
  ADMIN_ALTERNATIVE_EMAIL,
  DOMAIN_ADMIN_EMAIL,
  INTEGER_NUMBER_FORMAT,
  NUMBER_FORMAT,
  STRICT_MIN,
  WHITE_SPACE,
} from './form-errors.constants';

export const REQUIRED_ERRORS = {
  required: 'form.required-field',
};

export const FORMAT_ERRORS = {
  pattern: 'form.invalid-format',
  required: 'form.required-field',
};

export const EMAIL_ERRORS = {
  ...REQUIRED_ERRORS,
  [WHITE_SPACE]: 'form.email-invalid',
  pattern: 'form.email-invalid',
  email: 'form.email-invalid',
};

export const PERCENT_ERRORS = {
  [NUMBER_FORMAT]: 'form.number-invalid',
  min: `form.number-min`,
  max: `form.number-max`,
};

export const NUMBER_ERRORS = {
  required: 'form.required-field',
  [INTEGER_NUMBER_FORMAT]: 'form.integer-number-invalid',
  [NUMBER_FORMAT]: 'form.number-invalid',
  min: `form.number-min`,
  [STRICT_MIN]: `form.number-strict-min`,
};

export const PHONE_ERRORS = {
  ...REQUIRED_ERRORS,
  ...FORMAT_ERRORS,
};

export const DOMAIN_ERRORS = {
  required: 'form.required-field',
  minlength: `form.string-min`,
  pattern: 'form.invalid-format',
  [ADMIN_ALTERNATIVE_EMAIL]: 'form.email-alternative-invalid',
  [DOMAIN_ADMIN_EMAIL]: 'form.domain-email-invalid',
};

export const PASSWORD_ERRORS = {
  ...REQUIRED_ERRORS,
  minlength: `form.password-min-length`,
  pattern: 'form.invalid-password-format',
};

export const DEFAULT_INPUT_ERRORS = {
  REQUIRED: REQUIRED_ERRORS,
  FORMAT: FORMAT_ERRORS,
  EMAIL: EMAIL_ERRORS,
  NUMBER: NUMBER_ERRORS,
  PERCENT: PERCENT_ERRORS,
  PHONE: PHONE_ERRORS,
  PASSWORD: PASSWORD_ERRORS,
};

export const ADDRESS_ERRORS = {
  ...REQUIRED_ERRORS,
  ...FORMAT_ERRORS,
  oldFormat: 'form.reselect-value-needed',
};

export const PRODUCT_CUSTOMIZATION_ERRORS = {
  ...REQUIRED_ERRORS,
  ...NUMBER_ERRORS,
};
