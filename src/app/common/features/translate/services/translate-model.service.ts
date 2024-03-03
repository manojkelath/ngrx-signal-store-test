import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { LANG_LABEL } from '@features/translate/constants';

@Injectable({
  providedIn: 'root',
})
export class TranslateModelService {
  public langs = this.translocoService.getAvailableLangs().map((lang) => ({
    id: lang,
    label: LANG_LABEL[lang],
  }));

  constructor(private translocoService: TranslocoService) {}
}
