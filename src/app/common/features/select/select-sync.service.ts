import { Injectable } from '@angular/core';

import { SelectComponent } from './select.component';

@Injectable()
export class SelectSyncService {
  private select: SelectComponent;

  public register(select: SelectComponent) {
    this.select = select;
  }

  public getSelect(): SelectComponent {
    return this.select;
  }
}
