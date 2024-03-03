import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';

@Component({
  selector: 'kv-toggle-cell[googleAnalyticsCategory][label]',
  templateUrl: './toggle-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleCellComponent implements OnChanges, OnDestroy {
  @Input()
  public googleAnalyticsCategory: GoogleAnalyticsCategoryEnum;

  @Input()
  public label: string;

  @Input()
  public selectedValue: string;

  @Input()
  public handleOnClick = false;

  @Input()
  public disableToggle = false;

  @Output()
  public changed: EventEmitter<any> = new EventEmitter();

  public formToggle = new FormControl('');

  private unsubscribe$ = new Subject<void>();

  constructor() {
    this.formToggle.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.unsubscribe$)).subscribe((item) => {
      if (!this.handleOnClick) {
        this.changed.emit(item);
      }
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedValue'] && this.selectedValue) {
      this.formToggle.setValue(this.selectedValue, { emitEvent: false });
    }

    if (changes['disableToggle'] && this.disableToggle) {
      this.formToggle.disable();
    }
  }

  public onHandleClick() {
    if (this.formToggle.enabled) {
      this.changed.emit(this.formToggle.value);
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
