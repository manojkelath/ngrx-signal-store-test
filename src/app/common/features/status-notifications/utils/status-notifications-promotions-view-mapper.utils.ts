import { StatusNotificationsPromotionsApiModel } from '@features/status-notifications/models/api';
import { StatusNotificationsPromotionViewModel } from '@features/status-notifications/models/view';

export const statusNotificationsPromotionsViewMapper = (
  notifications: StatusNotificationsPromotionsApiModel
): StatusNotificationsPromotionViewModel[] =>
  (notifications?.item || []).map((promotion) =>
    promotion.top.reduce(
      (result, details) => {
        switch (details.name) {
          case 'websiteUrl':
            return { ...result, url: details?.displayValue?.[0] };
          case 'promotionOverview':
            return { ...result, description: details?.displayValue?.[0] };
          default:
            return result;
        }
      },
      { title: promotion.title }
    )
  );
