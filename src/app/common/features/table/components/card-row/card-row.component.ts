import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { TableActionDropdownCellModel, TableHeaderListModel } from '@features/table';
import { ToggleViewModel } from '@features/table/models/views';

@Component({
  selector: 'kv-card-row[googleAnalyticsCategory]',
  templateUrl: './card-row.component.html',
  styleUrls: ['./card-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardRowComponent {
  @Input()
  public googleAnalyticsCategory: GoogleAnalyticsCategoryEnum;

  @Input()
  public element: any;

  @Input()
  public tableColumn: TableHeaderListModel;

  @Input()
  public isCopyMobile: boolean;

  @Output()
  public toggleChanged = new EventEmitter<ToggleViewModel>();

  @Output()
  public actionDropdownItemCLicked = new EventEmitter<TableActionDropdownCellModel>();

  @Output()
  public profileNameClicked = new EventEmitter<string>();

  public onToggledChanged(data: ToggleViewModel) {
    this.toggleChanged.emit(data);
  }

  public onActionDropdownItemClicked(data: TableActionDropdownCellModel) {
    this.actionDropdownItemCLicked.emit(data);
  }

  public onProfileNameClick(id: any): void {
    this.profileNameClicked.emit(id);
  }
}
