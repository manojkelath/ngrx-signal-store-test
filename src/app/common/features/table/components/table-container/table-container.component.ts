import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { TableActionDropdownCellModel, TableHeaderListModel, TableSortModel } from '@features/table/models';
import { ToggleViewModel } from '@features/table/models/views';
import { TableSpinnerService } from '@features/table/services';
import { TableActions } from '@features/table/state/actions';
import { getTableClickedRowId, getTableSort } from '@features/table/state/selectors';
import { TableDataSourceType } from '@features/table/types';
import { IAppState } from '@shared/models';

@Component({
  selector: 'kv-table-container[googleAnalyticsCategory]',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableContainerComponent {
  @Input() public googleAnalyticsCategory: GoogleAnalyticsCategoryEnum;

  @Input() public dataSource: TableDataSourceType[];

  @Input() public tableColumns: TableHeaderListModel[];

  @Input() public mobileTableColumns: TableHeaderListModel[];

  @Input() public expandedTableContent: any;

  @Input() public expandedCardColumns: TableHeaderListModel[];

  @Input() public mobileCardHeader: TableHeaderListModel[];

  @Input() public expandHeaderTitle: string;

  @Input() public isSmall = false;

  @Input() public isClickable = true;

  @Output() public actionDropdownItemClicked = new EventEmitter<TableActionDropdownCellModel>();

  @Output() public profileNameClicked = new EventEmitter<string>();

  public currentSort$ = this.store$.pipe(select(getTableSort));
  public clickedRowId$ = this.store$.pipe(select(getTableClickedRowId));
  public isLoading$ = this.tableSpinnerService.isLoading$;

  public isCardView = false;

  constructor(
    private store$: Store<IAppState>,
    private tableSpinnerService: TableSpinnerService,
    private appGoogleAnalyticsService: AppGoogleAnalyticsService
  ) {}

  public onSortChange(sortChanged: TableSortModel | null) {
    this.store$.dispatch(TableActions.sortChanged({ sortChanged }));
  }

  public onToggledChanged(data: ToggleViewModel): void {
    this.store$.dispatch(TableActions.toggledChanged({ data }));
  }

  public onClickedRow(rowId: string): void {
    if (rowId) {
      this.store$.dispatch(TableActions.clickedRow({ rowId }));
    }
  }

  public onActionDropdownItemClick(data: TableActionDropdownCellModel) {
    this.actionDropdownItemClicked.emit(data);
  }

  public onProfileNameClick(id: string): void {
    this.profileNameClicked.emit(id);
  }

  public onExpandableRow(data: { row: any; isExpanded: boolean }): void {
    this.appGoogleAnalyticsService.event({
      event: `${data.isExpanded ? 'expanded' : 'shrunk'}_row_table_${this.googleAnalyticsCategory}`,
      category: this.googleAnalyticsCategory,
    });
  }
}
