import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {

  constructor(private http: HttpClient, private translateService: TranslateService) { }

  getFormConfig(language: string): Observable<any[]> {
    // Assuming form configuration files are named based on language, like form-config-en.json, form-config-es.json, etc.
    let lang = this.translateService.currentLang;
    const configFileName = `assets/form-config-${lang}.json`;
    return this.http.get<any[]>(configFileName);
  }
}
