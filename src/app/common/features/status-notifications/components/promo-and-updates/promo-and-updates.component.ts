import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { StatusNotificationsPromotionViewModel } from '@features/status-notifications/models/view';

@Component({
  selector: 'kv-status-notifications-promo-and-updates',
  templateUrl: './promo-and-updates.component.html',
  styleUrls: ['./promo-and-updates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoAndUpdatesComponent {
  @Input()
  public promotions: StatusNotificationsPromotionViewModel[];
}
