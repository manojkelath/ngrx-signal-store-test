import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { getCurrentPage, getCurrentSize } from '@features/table';
import { PaginationActions } from '@features/table/state/actions';
import { IAppState } from '@shared/models';

@Component({
  selector: 'kv-pagination-container[googleAnalyticsCategory]',
  templateUrl: './pagination-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationContainerComponent {
  @Input() public googleAnalyticsCategory: GoogleAnalyticsCategoryEnum;
  @Input() public amountElement = 0;

  public currentSize$ = this.store$.pipe(select(getCurrentSize));
  public currentPage$ = this.store$.pipe(select(getCurrentPage));

  constructor(private store$: Store<IAppState>, private appGoogleAnalyticsService: AppGoogleAnalyticsService) {}

  public onChangePage(page: number): void {
    this.appGoogleAnalyticsService.event({
      event: `table_page_${this.googleAnalyticsCategory}_change`,
      category: this.googleAnalyticsCategory,
    });

    this.store$.dispatch(PaginationActions.pageChanged({ page }));
  }

  public onChangeSize(size: number): void {
    this.appGoogleAnalyticsService.event({
      event: `table_size_${this.googleAnalyticsCategory}_change`,
      category: this.googleAnalyticsCategory,
    });

    this.store$.dispatch(PaginationActions.sizeChanged({ size }));
  }
}
