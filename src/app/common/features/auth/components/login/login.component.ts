import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';

import { environment } from '@environment';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { ILoginInfoModel } from '@features/auth/models';
import { DEFAULT_INPUT_ERRORS, EMAIL_REGEX } from '@shared/constants';
import { getControlErrors, whiteSpaceValidator } from '@shared/utils';

@Component({
  selector: 'kv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  @Input()
  public isSuccessfullyRegistered: boolean;

  @Output()
  public login: EventEmitter<ILoginInfoModel> = new EventEmitter();

  @Output()
  public cancel: EventEmitter<void> = new EventEmitter();

  @Output()
  public forgotPassword: EventEmitter<void> = new EventEmitter();

  @Output()
  public signUp: EventEmitter<void> = new EventEmitter();

  public loginForm: FormGroup = this.formBuilder.group({
    user: ['', [Validators.required, Validators.pattern(EMAIL_REGEX), whiteSpaceValidator]],
    password: ['', [Validators.required]],
  });

  public inputErr = DEFAULT_INPUT_ERRORS;
  public isSubmitted = false;
  public logoUrl = `${environment.assetsFolder}icons/logo.svg`;

  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;

  constructor(
    private formBuilder: FormBuilder,
    private translocoService: TranslocoService,
    private appGoogleAnalyticsService: AppGoogleAnalyticsService
  ) {}

  public onLogin(): void {
    this.appGoogleAnalyticsService.event({
      event: 'submit_login_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.isSubmitted = true;

    if (this.loginForm.valid) {
      this.login.emit(this.loginForm.value);
    }
  }

  public onCancel(): void {
    this.appGoogleAnalyticsService.event({
      event: 'cancel_login_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.cancel.emit();
  }

  public onModalClose(): void {
    this.appGoogleAnalyticsService.event({
      event: 'close_login_modal_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.cancel.emit();
  }

  public onForgotPassword(): void {
    this.appGoogleAnalyticsService.event({
      event: 'forgot_password_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.forgotPassword.emit();
  }

  public onSignUp(): void {
    this.signUp.emit();
  }

  public getControlErrors(control: AbstractControl, errors: {}): string {
    return this.isSubmitted ? this.translocoService.translate(getControlErrors(control, errors)) : null;
  }
}
