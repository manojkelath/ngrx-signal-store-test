import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { DETAIL_EXPAND_ANIMATION } from '@features/table/animations';
import { EMPTY_VALUE, EXPANDED_DATA_KEY } from '@features/table/constants';
import { TableFieldTypesEnum } from '@features/table/enums';
import { TableActionDropdownCellModel, TableHeaderListModel } from '@features/table/models';
import { ToggleViewModel } from '@features/table/models/views';
import { TableDataSourceType } from '@features/table/types';
import { DATE_FORMAT } from '@shared/constants';
import { AppRoutesEnum } from '@shared/enums';

@Component({
  selector: 'kv-card-list[googleAnalyticsCategory]',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  animations: [DETAIL_EXPAND_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent {
  @Input() public googleAnalyticsCategory: GoogleAnalyticsCategoryEnum;

  @Input() public dataSource: TableDataSourceType[];

  @Input() public tableColumns: TableHeaderListModel[] = [];

  @Input() public expandedTableContent: any;

  @Input() public headerColumns: TableHeaderListModel[] = [];

  @Input() public clickedRowId: string | undefined;

  @Input() public expandHeaderTitle: string;

  @Input() public isLoading = true;

  @Input() public isClickable = true;

  @Input() public isSmall = true;

  @Output() private toggledChanged = new EventEmitter<ToggleViewModel>();

  @Output() public clickedRow = new EventEmitter<string>();

  @Output() public expandedRow = new EventEmitter<{ row: any; isExpanded: boolean }>();

  @Output() public actionDropdownItemClicked = new EventEmitter<TableActionDropdownCellModel>();

  @Output() public profileNameClicked = new EventEmitter<string>();

  public filedType = TableFieldTypesEnum;
  public routes = AppRoutesEnum;
  public dateFormat = DATE_FORMAT;
  public emptyValue = EMPTY_VALUE;
  public expandListKey = EXPANDED_DATA_KEY;
  public isCopyMobile = true;

  public expandedElementId: string;

  public onToggledChanged(data: ToggleViewModel) {
    this.toggledChanged.emit(data);
  }

  public onClickRow(row): void {
    if (this.isClickable) {
      if (this.clickedRowId !== row?.id) {
        this.clickedRow.emit(row.id);
      }
      if (row.isExpandable && this.expandedTableContent) {
        this.onExpand(row);
      }
    }
  }

  public onActionDropdownItemClicked(data: TableActionDropdownCellModel) {
    this.actionDropdownItemClicked.emit(data);
  }

  public onProfileNameClick(id: any): void {
    this.profileNameClicked.emit(id);
  }

  public onExpand(row: any): void {
    this.expandedRow.emit({ row, isExpanded: row?.id === this.expandedElementId });
    this.expandedElementId = row?.id === this.expandedElementId ? null : row?.id;
  }
}
