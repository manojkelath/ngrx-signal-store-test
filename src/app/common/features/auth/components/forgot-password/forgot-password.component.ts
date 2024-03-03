import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { IForgotPasswordModel } from '@features/auth/models';
import { DEFAULT_INPUT_ERRORS } from '@shared/constants';
import { getControlErrors } from '@shared/utils';

@Component({
  selector: 'kv-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {
  @Input()
  public isSuccessfullyPasswordReset: boolean;

  @Output()
  public forgotPassword: EventEmitter<IForgotPasswordModel> = new EventEmitter();

  @Output()
  public cancel: EventEmitter<void> = new EventEmitter();

  public forgotPasswordForm: FormGroup = this.formBuilder.group({
    user: ['', [Validators.required]],
  });

  public inputErr = DEFAULT_INPUT_ERRORS;
  public isSubmitted = false;

  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;

  constructor(
    private formBuilder: FormBuilder,
    private translocoService: TranslocoService,
    private appGoogleAnalyticsService: AppGoogleAnalyticsService
  ) {}

  public onResetPassword(): void {
    this.appGoogleAnalyticsService.event({
      event: 'submit_reset_password_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.isSubmitted = true;

    if (this.forgotPasswordForm.valid) {
      this.forgotPassword.emit({
        ...this.forgotPasswordForm.value,
        email: this.forgotPasswordForm.get('user').value,
      });
    }
  }

  public onCancel(): void {
    this.appGoogleAnalyticsService.event({
      event: 'cancel_forgot_password_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.cancel.emit();
  }

  public onModalClose(): void {
    this.appGoogleAnalyticsService.event({
      event: 'close_forgot_password_modal_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.cancel.emit();
  }

  public getControlErrors(control: AbstractControl, errors: {}): string {
    return this.isSubmitted ? this.translocoService.translate(getControlErrors(control, errors)) : null;
  }
}
