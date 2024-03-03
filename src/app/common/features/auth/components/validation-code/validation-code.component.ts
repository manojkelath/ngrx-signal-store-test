import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { ConfValidationCodeModel } from '@features/auth/models';
import { DEFAULT_INPUT_ERRORS } from '@shared/constants';
import { getControlErrors } from '@shared/utils';

@Component({
  selector: 'kv-validation-code',
  templateUrl: './validation-code.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationCodeComponent {
  @Input()
  public email: string;

  @Input()
  public confValidationCode: ConfValidationCodeModel;

  @Output()
  public checkValidationCode: EventEmitter<string> = new EventEmitter();

  @Output()
  public cancel: EventEmitter<void> = new EventEmitter();

  @Output()
  public back: EventEmitter<void> = new EventEmitter();

  @Output()
  public resetValidationCode: EventEmitter<void> = new EventEmitter();

  public form: FormGroup = this.formBuilder.group({
    code: ['', [Validators.required]],
  });

  public inputErr = DEFAULT_INPUT_ERRORS;
  public isSubmitted = false;
  public isSuccessfulSubmitted = false;

  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;

  constructor(
    private formBuilder: FormBuilder,
    private translocoService: TranslocoService,
    private appGoogleAnalyticsService: AppGoogleAnalyticsService
  ) {}

  public onCheckValidationCode(): void {
    this.appGoogleAnalyticsService.event({
      event: 'submit_check_validation_code_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.isSubmitted = true;

    if (this.form.valid) {
      this.checkValidationCode.emit(this.form.get('code').value);
    }
  }

  public onBack(): void {
    this.appGoogleAnalyticsService.event({
      event: 'back_validation_code_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.back.emit();
  }

  public onModalClose(): void {
    this.appGoogleAnalyticsService.event({
      event: 'close_validation_code_modal_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.cancel.emit();
  }

  public getControlErrors(control: AbstractControl, errors: {}): string {
    return this.isSubmitted ? this.translocoService.translate(getControlErrors(control, errors)) : null;
  }

  public onResetValidationCode(): void {
    this.appGoogleAnalyticsService.event({
      event: 'reset_validation_code_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.resetValidationCode.emit();
  }
}
