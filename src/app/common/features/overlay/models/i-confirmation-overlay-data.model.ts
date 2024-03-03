import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';

export interface IConfirmationOverlayDataModel {
  googleAnalyticsCategory: GoogleAnalyticsCategoryEnum;
  googleAnalyticsEventName: string;
  modalTitle?: string;
  title?: string;
  description?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
}
