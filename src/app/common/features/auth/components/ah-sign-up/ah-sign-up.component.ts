import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';

import { environment } from '@environment';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { AhSignUpModel } from '@features/auth/models';
import { DEFAULT_INPUT_ERRORS, EMAIL_REGEX, PASSWORD_REGEX } from '@shared/constants';
import { getControlErrors, whiteSpaceValidator } from '@shared/utils';

@Component({
  selector: 'kv-ah-sign-up',
  templateUrl: './ah-sign-up.component.html',
  styleUrls: ['./ah-sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AhSignUpComponent {
  @Output()
  public closeModal: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public signUp: EventEmitter<AhSignUpModel> = new EventEmitter<AhSignUpModel>();

  @Output()
  public logIn: EventEmitter<void> = new EventEmitter<void>();

  public signUpForm = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX), whiteSpaceValidator]],
    password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
    termsAccepted: [false, [Validators.requiredTrue]],
  });

  public logoUrl = `${environment.assetsFolder}icons/logo.svg`;
  public isSubmitted = false;
  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;
  public inputErr = {
    ...DEFAULT_INPUT_ERRORS,
    TERMS_ERROR: { required: 'form.terms-required' },
  };

  constructor(
    private fb: FormBuilder,
    private translocoService: TranslocoService,
    private appGoogleAnalyticsService: AppGoogleAnalyticsService
  ) {}

  public onModalClose() {
    this.closeModal.emit();
  }

  public getControlErrors(control: AbstractControl, errors: {}): string {
    return this.isSubmitted ? this.translocoService.translate(getControlErrors(control, errors)) : null;
  }

  public onSignUp() {
    this.appGoogleAnalyticsService.event({
      event: 'ah_sign_up_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });

    this.isSubmitted = true;

    if (this.signUpForm.valid) {
      const { value } = this.signUpForm;

      this.signUp.emit({
        fullName: value.fullName,
        email: value.email,
        password: value.password,
      });
    }
  }

  public onLogin() {
    this.appGoogleAnalyticsService.event({
      event: 'navigate_to_login_sign_up_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.logIn.emit();
  }
}
