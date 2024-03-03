import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { IStorageServiceModel } from '@shared/models';

import { BaseStorageService } from './base-storage.abstract-service';

@Injectable({ providedIn: 'root' })
export class SessionStorageService extends BaseStorageService implements IStorageServiceModel {
  constructor(@Inject(PLATFORM_ID) platformId: string) {
    super(platformId, 'sessionStorage');
  }

  public override setItem(key: string, value: any, isJson?: boolean): boolean {
    return super.setItem(key, value, isJson);
  }

  public override removeItem(key: string): boolean {
    return super.removeItem(key);
  }

  public override getItem(key: string, isJson?: boolean): any | undefined {
    return super.getItem(key, isJson);
  }
}
