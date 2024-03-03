import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { SessionStorageService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class SessionQueryParamsService {
  constructor(private sessionStorageService: SessionStorageService) {}

  public setSessionQueryParams(key: string, queryParams: Params) {
    this.sessionStorageService.setItem(key, queryParams, true);
  }

  public getSessionQueryParams(key: string) {
    return this.sessionStorageService.getItem(key, true);
  }

  public clear(key: string): void {
    this.sessionStorageService.removeItem(key);
  }
}
