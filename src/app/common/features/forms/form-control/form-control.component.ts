import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { FormControlFieldAbstract } from './form-control-field.abstract';

@Component({
  selector: 'kv-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlComponent implements OnChanges, OnInit, OnDestroy {
  @ContentChild(FormControlFieldAbstract, { static: true })
  public field: FormControlFieldAbstract;

  @Input()
  public label = '';

  @Input()
  public error: string;

  @Input()
  public isLabelWithRequired = false;

  @Input()
  public isAutoHeight: boolean;

  @Input()
  public isInputWrap: boolean;

  @Input()
  public isPointer: boolean;

  @Input()
  public isInline: boolean;

  @Input()
  public isHiddenText: boolean;

  @Input()
  public readOnly: boolean;

  // @Input()
  // public isSmallType = false;

  // @Input()
  // public appendText: string;

  // @Input()
  // public autoFilled: boolean;

  public isError: boolean;

  private subscription: Subscription;

  constructor(private cd: ChangeDetectorRef) {}

  public ngOnInit() {
    if (!this.field) {
      throw new Error(`Form control ${this.label} failed to find content child FormControlFieldAbstract`);
    }

    this.subscription = this.field.stateChanges.subscribe(() => {
      this.cd.markForCheck();
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['error']) {
      this.isError = !!this.error;
    }
  }
}
