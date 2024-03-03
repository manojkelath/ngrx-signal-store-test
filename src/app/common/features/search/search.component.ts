import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { Subject, takeUntil } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { AppGaEventDirective } from '@features/app-google-analytics/directives';
import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { IconComponent } from '@shared/components/icon';

@Component({
  standalone: true,
  selector: 'kv-search[googleAnalyticsCategory]',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, ReactiveFormsModule, CommonModule, TranslocoModule, AppGaEventDirective],
})
export class SearchComponent implements OnDestroy, OnInit {
  @Input()
  public googleAnalyticsCategory: GoogleAnalyticsCategoryEnum;

  @Input()
  public currentSearch: string;

  @Output()
  public searchChange: EventEmitter<string> = new EventEmitter();

  public search = new FormControl(null);

  private destroyed$ = new Subject<void>();

  constructor() {}

  public ngOnInit() {
    this.valueChangeListener();

    if (this.currentSearch) {
      this.search.setValue(this.currentSearch);
    }
  }

  public valueChangeListener(): void {
    this.search.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe(() => {
        this.searchChange.emit(this.search.value);
      });
  }

  public ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
