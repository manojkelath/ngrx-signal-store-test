import { ConnectedPosition } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { BASIC_DROPDOWN_ACTIONS } from '@features/overlay/constants';
import { ActionDropdownTypeEnum } from '@features/overlay/enums';
import { ActionDropdownItemModel } from '@features/overlay/models';

@Component({
  selector: 'kv-actions-dropdown[googleAnalyticsCategory]',
  templateUrl: './actions-dropdown.component.html',
  styleUrls: ['./actions-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsDropdownComponent {
  @Input()
  public googleAnalyticsCategory: GoogleAnalyticsCategoryEnum;

  @Input()
  public items: ActionDropdownItemModel[] = BASIC_DROPDOWN_ACTIONS;

  @Output()
  public itemClicked: EventEmitter<ActionDropdownTypeEnum> = new EventEmitter();

  public isMenuOpened = false;
  public connectedPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
  ];

  constructor(private appGoogleAnalyticsService: AppGoogleAnalyticsService) {}

  public onClosedMenu() {
    this.closeMenu();
  }

  public toggleMenu(event: Event) {
    event.stopPropagation();

    this.appGoogleAnalyticsService.event({
      event: `toggle_action_dropdown_${this.googleAnalyticsCategory}_button_click`,
      category: this.googleAnalyticsCategory,
    });

    this.isMenuOpened = !this.isMenuOpened;
  }

  public onItemClick(type: ActionDropdownTypeEnum): void {
    this.appGoogleAnalyticsService.event({
      event: `item_action_dropdown_${this.googleAnalyticsCategory}_button_click`,
      category: this.googleAnalyticsCategory,
    });

    this.closeMenu();

    this.itemClicked.emit(type);
  }

  private closeMenu() {
    this.isMenuOpened = false;
  }
}
