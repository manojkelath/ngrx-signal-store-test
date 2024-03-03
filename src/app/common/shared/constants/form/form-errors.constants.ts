export const MAX_LENGTH = {
  text: 255,
  smallText: 100,
  bigText: 600,
  textareaText: 450,
};

const MAX_INTEGER_DIGITS = 13;
const MAX_NUMBER = +('9'.repeat(MAX_INTEGER_DIGITS) + '.99');

export const NUMBER_LIMITS = {
  max: MAX_NUMBER,
  min: -MAX_NUMBER,
};

export const WHITE_SPACE = 'whiteSpace';
export const EMAIL_REGEX = '^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$';
export const STRICT_MIN = 'strictMin';
export const STRICT_MAX = 'strictMax';
export const INTEGER_NUMBER_FORMAT = 'integerNumberFormat';
export const NUMBER_FORMAT = 'numberFormat';
export const ADMIN_ALTERNATIVE_EMAIL = 'adminAlternativeEmailFormat';
export const DOMAIN_ADMIN_EMAIL = 'domainAdminEmailFormat';
export const EMAIL_ADMIN_REGEX = '^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$';
export const DOMAIN_NAME_REGEX = '^([a-z0-9-]+\\.)+([a-z]{2,4})$';
export const KTP_NUMBER_REGEX = '\\d{16}';
export const KK_NUMBER_REGEX = '\\d{16}';
export const POSTAL_CODE_REGEX = '^\\s*\\d{5}\\s*$';
export const CORPORATE_ID_REGEX = 'MTX\\d{1,28}';
export const PASSWORD_REGEX = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$#!%*?&])[A-Za-z\\d@$#!%*?&]{8,}$';
export const PHONE_REGEX = '\\d{8,13}';
