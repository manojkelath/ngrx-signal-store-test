import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {

  constructor(private http: HttpClient) { }

  getFormConfig(language: string): Observable<any[]> {
    // Assuming form configuration files are named based on language, like form-config-en.json, form-config-es.json, etc.
    return this.http.get<any[]>(`assets/form-config.json`);
  }
}
