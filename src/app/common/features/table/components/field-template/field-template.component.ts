import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { TableActionDropdownCellModel, TableHeaderListModel } from '@features/table';
import { ELEMENT_ID_KEY, EMPTY_VALUE, MAX_PRODUCTS_COUNT } from '@features/table/constants';
import { TableFieldTypesEnum } from '@features/table/enums';
import { ToggleViewModel } from '@features/table/models/views';
import { mapDropdownActionFieldNameUtils } from '@features/table/utils';
import { DATE_FORMAT } from '@shared/constants';

@Component({
  selector: 'kv-field-template[googleAnalyticsCategory]',
  templateUrl: './field-template.component.html',
  styleUrls: ['./field-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldTemplateComponent implements OnInit, AfterViewInit {
  @Input()
  public googleAnalyticsCategory: GoogleAnalyticsCategoryEnum;

  @Input()
  public element: any;

  @Input()
  public tableColumn: TableHeaderListModel;

  @Input()
  public isActionMenuShow = true;

  @Input()
  public isExpanded = false;

  @Input()
  public isExpandable = false;

  @Input()
  public isCopyDesktop = false;

  @Input()
  public isCopyMobile = false;

  @Output()
  public toggledChanged = new EventEmitter<ToggleViewModel>();

  @Output()
  public actionDropdownItemClicked = new EventEmitter<TableActionDropdownCellModel>();

  @Output()
  public profileNameClicked = new EventEmitter<void>();

  @ViewChild('text')
  public text: ElementRef;

  public filedType = TableFieldTypesEnum;
  public dateFormat = DATE_FORMAT;
  public emptyValue = EMPTY_VALUE;
  public maxProductsCount = MAX_PRODUCTS_COUNT;
  public cellText: string;
  public textWithActionListKey: string;

  constructor(private appGoogleAnalyticsService: AppGoogleAnalyticsService, private cdRef: ChangeDetectorRef) {}

  public ngOnInit() {
    this.textWithActionListKey = mapDropdownActionFieldNameUtils(this.tableColumn.key);
  }

  public ngAfterViewInit() {
    this.cellText = this.text?.nativeElement?.textContent.trim();
    // should be to update data in clipboard component, doesn't work with .markForCheck()
    this.cdRef.detectChanges();
  }

  public onToggledChanged(id: string, value: boolean) {
    this.toggledChanged.emit({ id, value: value });
  }

  public onActionDropdownItemClick(data: TableActionDropdownCellModel) {
    this.actionDropdownItemClicked.emit({
      id: this.element?.[ELEMENT_ID_KEY] ? this.element[ELEMENT_ID_KEY] : this.element.toggleId,
      type: data.type,
      expandedId: this.element?.[ELEMENT_ID_KEY] ? this.element.id : null,
    });
  }

  public onProfileNameClick(): void {
    this.appGoogleAnalyticsService.event({
      event: 'table_profile_name_cell_click',
      category: this.googleAnalyticsCategory,
    });
    this.profileNameClicked.emit();
  }

  public onLinkClick(event: Event): void {
    event.stopPropagation();
  }
}
