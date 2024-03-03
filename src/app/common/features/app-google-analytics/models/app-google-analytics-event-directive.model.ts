import { AppGoogleAnalyticsEventType } from '@features/app-google-analytics/types';

export interface AppGoogleAnalyticsEventDirectiveModel {
  event: string;
  category: string;
  productCode?: string;
  eventType: AppGoogleAnalyticsEventType;
}
