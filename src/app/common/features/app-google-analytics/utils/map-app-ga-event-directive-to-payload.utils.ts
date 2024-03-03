import {
  AppGoogleAnalyticsEventDirectiveModel,
  AppGoogleAnalyticsEventPayloadModel,
} from '@features/app-google-analytics/models';

export const mapAppGaEventDirectiveToPayload = (
  directiveEvent: AppGoogleAnalyticsEventDirectiveModel
): AppGoogleAnalyticsEventPayloadModel => ({
  event: directiveEvent.event,
  category: directiveEvent.category,
  productCode: directiveEvent.productCode || '',
});
