import { isPlatformBrowser } from '@angular/common';

import { IStorageModel, IStorageServiceModel } from '@shared/models';

export abstract class BaseStorageService implements IStorageServiceModel {
  private available: boolean;
  private storage: IStorageModel;

  constructor(platformId: string, private storageName: string) {
    this.init(platformId, this.storageName);
  }

  public setItem(key: string, value: any, isJson: boolean): boolean {
    if (this.available) {
      try {
        this.storage.setItem(key, isJson ? JSON.stringify(value) : value);
        return true;
      } catch (e) {
        // fallback handled below
        console.error(`Error setting ${key} in ${this.storageName}: `, e);
      }
    }

    return false;
  }

  public removeItem(key: string): boolean {
    if (this.available) {
      try {
        this.storage.removeItem(key);
        return true;
      } catch (e) {
        // fallback handled below
        console.error(`Error removing ${key} from ${this.storageName}: `, e);
      }
    }

    return false;
  }

  public getItem(key: string, isJson: boolean): any | undefined {
    if (this.available) {
      try {
        return this.getStorageItem(key, isJson);
      } catch (e) {
        // fallback handled below
        console.error(`Error getting ${key} from ${this.storageName}: `, e);
      }
    }

    return;
  }

  private getStorageItem(key: string, isJson: boolean): any | undefined {
    const item: string = this.storage.getItem(key);

    if (isJson && item) {
      return JSON.parse(item);
    }

    return item;
  }

  private init(platformId: string, storageName: string): void {
    if (isPlatformBrowser(platformId)) {
      try {
        this.storage = window[storageName];
        const x = '__storage_test__';
        this.storage.setItem(x, x);
        this.storage.removeItem(x);
        this.available = true;
        return;
      } catch (e) {
        // handled below
      }
    }

    this.available = false;
  }
}
