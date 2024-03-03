import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { getTableSearch } from '@features/table';
import { TableSearchActions } from '@features/table/state/actions';
import { IAppState } from '@shared/models';

@Component({
  selector: 'kv-table-search-container[googleAnalyticsCategory]',
  templateUrl: './table-search-container.component.html',
  styleUrls: ['./table-search-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSearchContainerComponent {
  @Input() public googleAnalyticsCategory: GoogleAnalyticsCategoryEnum;

  public currentSearch$: Observable<string> = this.store$.pipe(select(getTableSearch));

  constructor(private store$: Store<IAppState>) {}

  public onSearchChange(search: string) {
    this.store$.dispatch(TableSearchActions.changed({ search }));
  }
}
