import { LanguagesEnum } from '@features/translate/enums';

/* eslint-disable @typescript-eslint/naming-convention */
export const DEFAULT_LANG = LanguagesEnum.IN;

export const LANG_LABEL = {
  [LanguagesEnum.EN]: 'en',
  [LanguagesEnum.IN]: 'id',
};

export const AVAILABLE_LANGS = [LanguagesEnum.IN, LanguagesEnum.EN];
