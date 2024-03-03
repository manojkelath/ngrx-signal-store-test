import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { LABEL_DOTS, SIZES_OPTION } from '@features/table/constants';
import { calculateRankBounds, createPageRange } from '@features/table/utils';

@Component({
  selector: 'kv-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public currentPage: number;

  @Input() public currentSize: number;

  @Input() public amountElement: number;

  @Output()
  public changePage: EventEmitter<number> = new EventEmitter();

  @Output()
  public changeSize: EventEmitter<number> = new EventEmitter();

  private destroyed$ = new Subject<void>();
  public sizesOption = SIZES_OPTION;
  public labelDots = LABEL_DOTS;
  public selectorSize = new FormControl(null);

  public rangeStart: number;
  public rangeEnd: number;
  public lastPage: number;
  public paginationRange: any[] = [];
  public maxSymbols = 7;

  @HostListener('window:resize')
  public onWinResize() {
    this.syncWidth();
  }

  public ngOnInit(): void {
    this.watchSelectorSize();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['currentSize'] && this.currentSize) {
      this.selectorSize.setValue(`${this.currentSize}`);
    }

    this.lastPage = Math.ceil(this.amountElement / this.currentSize);
    [this.rangeStart, this.rangeEnd] = calculateRankBounds(this.currentPage, this.currentSize, this.amountElement);
    this.createPageRange();
  }

  public ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public createPageRange() {
    this.maxSymbols = window.innerWidth < 540 ? 3 : 7;
    this.paginationRange = createPageRange(this.currentPage, this.currentSize, this.amountElement, this.maxSymbols);
  }

  public onChangePage(page) {
    this.changePage.emit(+page);
  }

  private watchSelectorSize(): void {
    this.selectorSize.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.changeSize.emit(+this.selectorSize.value);
    });
  }

  private syncWidth() {
    this.createPageRange();
  }
}
