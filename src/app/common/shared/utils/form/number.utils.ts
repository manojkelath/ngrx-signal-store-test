import { formatNumber } from '@angular/common';
import RisNil from 'ramda/es/isNil';

import {
  DEFAULT_LOCALE,
  DEFAULT_NUMBER_REPRESENTATION,
  FRACTION_NUMBER_REPRESENTATION,
  NUMBER_LIMITS,
  ROUNDED_NUMBER_REPRESENTATION,
} from '@shared/constants';

export const formattedStringToNumber = (value: string | number): number => {
  let parsedValue: number;
  let trimmedValue: string;

  if (typeof value === 'string') {
    trimmedValue = value.replace(/,| /g, '');
  }

  // Angular do not provide a way to convert string back into number, so below code introduced
  // Works only for standard English locales
  if (typeof value === 'string' && trimmedValue !== '') {
    parsedValue = +trimmedValue;
  } else if (typeof value === 'number') {
    parsedValue = value;
  } else if (RisNil(value) || value === '') {
    parsedValue = null;
  } else {
    parsedValue = NaN;
  }

  return parsedValue;
};

/**
 * @description Checks if provided value is in limits
 * @param {number} value
 * @returns {number} Provided value if it fits limits. Else return max or min supported value. (9999999999999.99)
 * @example checkNumberLimits(2393616)
 */
export const checkNumberLimits = (value: number): number => {
  if (value > NUMBER_LIMITS.max) {
    return NUMBER_LIMITS.max;
  }
  if (value < NUMBER_LIMITS.min) {
    return NUMBER_LIMITS.min;
  }

  return value;
};

/**
 * @description Formats a number as text, with group sizing, separator, and other parameters
 * @param {string} value
 * @returns {number}
 * @example numberFormatter('')
 */
export const numberFormatter = (value: string | number): string | number => {
  let parsedValue = formattedStringToNumber(value);

  if (!RisNil(parsedValue) && !isNaN(parsedValue)) {
    parsedValue = checkNumberLimits(parsedValue);

    const defaultNumberRepresentation = formatNumber(parsedValue, DEFAULT_LOCALE, DEFAULT_NUMBER_REPRESENTATION);
    const roundedNumberRepresentation = formatNumber(parsedValue, DEFAULT_LOCALE, ROUNDED_NUMBER_REPRESENTATION);

    if (defaultNumberRepresentation !== roundedNumberRepresentation) {
      return formatNumber(parsedValue, DEFAULT_LOCALE, FRACTION_NUMBER_REPRESENTATION);
    }

    return defaultNumberRepresentation;
  }

  return value || '';
};

export const roundToFixedDigits = (number: number, precision: number): number => {
  const precisionMultiplier = Math.pow(10, precision);

  return Math.round(number * precisionMultiplier) / precisionMultiplier;
};
