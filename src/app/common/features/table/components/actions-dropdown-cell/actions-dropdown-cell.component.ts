import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { ActionDropdownTypeEnum } from '@features/overlay/enums';
import { ActionDropdownItemModel } from '@features/overlay/models';
import { TableActionDropdownCellModel } from '@features/table/models';

@Component({
  selector: 'kv-actions-dropdown-cell[googleAnalyticsCategory]',
  templateUrl: './actions-dropdown-cell.component.html',
  styleUrls: ['./actions-dropdown-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsDropdownCellComponent {
  @Input()
  public googleAnalyticsCategory: GoogleAnalyticsCategoryEnum;

  @Input()
  public tableMenuItems: ActionDropdownItemModel[];

  @Input()
  public element: any;

  @Output()
  public itemClicked: EventEmitter<TableActionDropdownCellModel> = new EventEmitter<TableActionDropdownCellModel>();

  public onItemClick(type: ActionDropdownTypeEnum): void {
    this.itemClicked.emit({ id: this.element.toggleId, type });
  }
}
