import { Params } from '@angular/router';

import { AppRoutesEnum } from '@shared/enums';

export interface StatusNotificationsTransactionsViewModel {
  title: string;
  iconPath: string;
  iconSize: { width?: number; height?: number };
  notificationsCount?: number;
  eventName: string;
  routerLink: AppRoutesEnum[];
  queryParams?: Params;
  isStretchedOnMobile?: boolean;
  isHidden?: boolean;
}
