export const mapTextToGaEvent = (text: string): string =>
  typeof text === 'string' ? text.split(' ').join('_').toLowerCase() : text;
