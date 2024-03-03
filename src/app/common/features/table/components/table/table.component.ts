import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { DETAIL_EXPAND_ANIMATION } from '@features/table/animations';
import { EXPANDED_DATA_KEY } from '@features/table/constants';
import { SortDirectionEnum, TableFieldTypesEnum } from '@features/table/enums';
import { TableActionDropdownCellModel, TableHeaderListModel, TableSortModel } from '@features/table/models';
import { ToggleViewModel } from '@features/table/models/views';
import { TableDataSourceType } from '@features/table/types';
import { DATE_FORMAT } from '@shared/constants';
import { AppRoutesEnum } from '@shared/enums';

@Component({
  selector: 'kv-table[googleAnalyticsCategory]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [DETAIL_EXPAND_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnChanges {
  @Input() public googleAnalyticsCategory: GoogleAnalyticsCategoryEnum;

  @Input() public dataSource: TableDataSourceType[];

  @Input() public currentSort: TableSortModel | null;

  @Input() public tableColumns: TableHeaderListModel[] = [];

  @Input() public expandedTableContent: any;

  @Input() public clickedRowId: string | undefined;

  @Input() public isLoading = true;

  @Input() public isSmall = false;

  @Input() public isClickable = true;

  @Output() private toggledChanged = new EventEmitter<ToggleViewModel>();

  @Output() private sortChanged = new EventEmitter<TableSortModel | null>();

  @Output() public clickedRow = new EventEmitter<string>();

  @Output() public expandedRow = new EventEmitter<{ row: any; isExpanded: boolean }>();

  @Output() public actionDropdownItemClicked = new EventEmitter<TableActionDropdownCellModel>();

  @Output() public profileNameClicked = new EventEmitter<string>();

  public expandedDataKey = EXPANDED_DATA_KEY;

  public displayedColumns: string[] = [];
  public expandedDisplayedColumns: string[] = [];
  public filedType = TableFieldTypesEnum;
  public sortDirectionEnum = SortDirectionEnum;
  public routes = AppRoutesEnum;
  public dateFormat = DATE_FORMAT;
  public expandedRowId = 'expandedRow';
  public expandedRowContent = 'expandedRowContent';
  public expandedElement: any;
  public isCopyDesktop = true;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes?.['tableColumns']) {
      this.tableColumns = this.tableColumns?.filter((column) => !column?.isOnlyCardField);
      this.changeDetectorRef.markForCheck();
      this.formatColumns();
    }
  }

  public adjustSort(sortKey: string) {
    if (!sortKey) return;

    if (
      this.currentSort &&
      this.currentSort.column === sortKey &&
      this.currentSort.direction === SortDirectionEnum.DESC
    ) {
      this.sortChanged.emit({
        column: null,
        direction: null,
      });
    } else {
      this.sortChanged.emit({
        column: sortKey,
        direction:
          this.currentSort?.direction === SortDirectionEnum.ASC ? SortDirectionEnum.DESC : SortDirectionEnum.ASC,
      });
    }
  }

  public onToggledChanged(data: ToggleViewModel): void {
    this.toggledChanged.emit(data);
  }

  public onClickRow(row): void {
    if (this.isClickable && this.clickedRowId !== row?.id) {
      this.clickedRow.emit(row.id);
    }

    if (this.expandedTableContent) {
      this.expandedRow.emit({ row, isExpanded: this.expandedElement !== row });
      this.expandedElement = this.expandedElement === row ? null : row;
    }
  }

  public onActionDropdownItemClick(data: TableActionDropdownCellModel) {
    this.actionDropdownItemClicked.emit(data);
  }

  public onProfileNameClick(id: any): void {
    this.profileNameClicked.emit(id);
  }

  private formatColumns(): void {
    this.displayedColumns = this.tableColumns.map((item: TableHeaderListModel) => item.key as string);
  }
}
