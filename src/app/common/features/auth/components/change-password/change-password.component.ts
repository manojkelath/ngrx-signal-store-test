import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { IChangePasswordModel } from '@features/auth/models';
import { changePasswordFormValidator } from '@features/auth/utils';
import { DEFAULT_INPUT_ERRORS, MIN_PASSWORD_LENGTH } from '@shared/constants';
import { getControlErrors } from '@shared/utils';

@Component({
  selector: 'kv-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent {
  @Output()
  public changePassword: EventEmitter<IChangePasswordModel> = new EventEmitter();

  @Output()
  public cancel: EventEmitter<void> = new EventEmitter();

  public changePasswordForm: FormGroup = this.formBuilder.group(
    {
      oldPassword: ['', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]],
      newPassword: ['', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]],
      newPassword2: ['', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]],
    },
    { validators: changePasswordFormValidator }
  );

  public inputErr = DEFAULT_INPUT_ERRORS;
  public isSubmitted = false;

  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;

  constructor(
    private formBuilder: FormBuilder,
    private translocoService: TranslocoService,
    private appGoogleAnalyticsService: AppGoogleAnalyticsService
  ) {}

  public onLogin(): void {
    this.appGoogleAnalyticsService.event({
      event: 'submit_change_password_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.isSubmitted = true;

    if (this.changePasswordForm.valid) {
      this.changePassword.emit(this.changePasswordForm.value);
    }
  }

  public onCancel(): void {
    this.appGoogleAnalyticsService.event({
      event: 'cancel_change_password_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.cancel.emit();
  }

  public onModalClose(): void {
    this.appGoogleAnalyticsService.event({
      event: 'close_change_password_modal_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.cancel.emit();
  }

  public getControlErrors(control: AbstractControl, errors: {}): string {
    return this.isSubmitted ? this.translocoService.translate(getControlErrors(control, errors)) : null;
  }

  public getNewPasswordError() {
    const baseError = this.getControlErrors(this.changePasswordForm.get('newPassword'), this.inputErr.PASSWORD);
    const greaterError = this.changePasswordForm.hasError('newPasswordNotSameToOld')
      ? this.translocoService.translate('form.new-password-validation')
      : null;

    return baseError || greaterError;
  }

  public getRetypePasswordError() {
    const baseError = this.getControlErrors(this.changePasswordForm.get('newPassword2'), this.inputErr.PASSWORD);
    const greaterError = this.changePasswordForm.hasError('newPasswordNotSameToRetype')
      ? this.translocoService.translate('form.new-2-password-validation')
      : null;

    return baseError || greaterError;
  }
}
