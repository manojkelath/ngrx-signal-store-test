import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { take, zip } from 'rxjs';

import { AppGoogleAnalyticsEventPayloadModel } from '@features/app-google-analytics/models';
import { RouteQueryParamsEnum } from '@shared/enums';
import { selectQueryParam, selectRouterUrl } from '@shared/state/selectors';

// eslint-disable-next-line @typescript-eslint/ban-types
declare const gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class AppGoogleAnalyticsService {
  constructor(private store$: Store<unknown>) {}

  public pageView(path: string, title?: string, location?: string): void {
    gtag('config', '', {
      send_page_view: false,
    });

    gtag('event', 'page_view', {
      page_title: title,
      page_path: path,
      page_location: location,
    });
  }

  public event(eventPayload: AppGoogleAnalyticsEventPayloadModel): void {
    zip(
      this.store$.pipe(select(selectQueryParam(RouteQueryParamsEnum.PRODUCT_CODE))),
      this.store$.pipe(select(selectRouterUrl))
    )
      .pipe(take(1))
      .subscribe(([routeProductCode, routeUrl]) => {
        gtag('event', eventPayload.event, {
          event_category: eventPayload.category,
          ...(eventPayload.productCode || routeProductCode
            ? { product_code: eventPayload.productCode || routeProductCode }
            : {}),
          page_location: routeUrl,
        });
      });
  }
}
