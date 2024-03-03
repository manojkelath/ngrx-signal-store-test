import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { ISignUpInfoModel } from '@features/auth/models';
import { DEFAULT_INPUT_ERRORS, EMAIL_REGEX } from '@shared/constants';
import { getControlErrors, phoneValidator, whiteSpaceValidator } from '@shared/utils';

@Component({
  selector: 'kv-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnChanges {
  @Input()
  public signupInfo: ISignUpInfoModel;
  @Output()
  public cancel: EventEmitter<void> = new EventEmitter();

  @Output()
  public login: EventEmitter<void> = new EventEmitter();

  @Output()
  public signup: EventEmitter<ISignUpInfoModel> = new EventEmitter();

  public signUpForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX), whiteSpaceValidator]],
    phoneNr: ['', [phoneValidator, Validators.required]],
    companyName: ['', Validators.required],
    // KV-195
    // companyEmail: ['', [Validators.pattern(EMAIL_REGEX), whiteSpaceValidator, Validators.required]],
    // companyPhoneNr: ['', [phoneValidator, Validators.required]],
    //
    // KTP: ['', [Validators.required, Validators.pattern(KTP_NUMBER_REGEX)]],
    // KK: ['', Validators.pattern(KK_NUMBER_REGEX)],
    // IDCARD: [null, Validators.required],
    // IDCARD_KK: [null],
    // SELFIE: [null, Validators.required],
    termsAccepted: [false, Validators.requiredTrue],
    login: [true],
    portalAccess: [true],
  });

  public inputErr = {
    ...DEFAULT_INPUT_ERRORS,
    TERMS_ERROR: { required: 'form.terms-required' },
  };
  public documentFormat = '.jpeg, .jpg, .png';
  public isSubmitted = false;

  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;

  constructor(
    private formBuilder: FormBuilder,
    private translocoService: TranslocoService,
    private appGoogleAnalyticsService: AppGoogleAnalyticsService
  ) {}

  public onSignUp(): void {
    this.appGoogleAnalyticsService.event({
      event: 'submit_sign_up_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.isSubmitted = true;

    if (this.signUpForm.valid) {
      this.signup.emit(this.signUpForm.value);
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes?.['signupInfo'] && this.signUpForm && this.signupInfo) {
      this.signUpForm.patchValue({ ...this.signupInfo });
    }
  }

  public onCancel(): void {
    this.appGoogleAnalyticsService.event({
      event: 'cancel_sign_up_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.cancel.emit();
  }

  public onModalClose(): void {
    this.appGoogleAnalyticsService.event({
      event: 'close_sign_up_modal_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.cancel.emit();
  }

  public onLogin(): void {
    this.appGoogleAnalyticsService.event({
      event: 'navigate_to_login_sign_up_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.login.emit();
  }

  // public onUploadDocument(file: string) {
  //   this.signUpForm.get('IDCARD').setValue(file);
  // }

  // public onUploadKKDocument(file: string) {
  //   this.signUpForm.get('IDCARD_KK').setValue(file);
  // }

  // public onUploadSelfie(file: string) {
  //   this.signUpForm.get('SELFIE').setValue(file);
  // }

  public getControlErrors(control: AbstractControl, errors: {}): string {
    return this.isSubmitted ? this.translocoService.translate(getControlErrors(control, errors)) : null;
  }

  // private watchKKChanges() {
  //   this.signUpForm
  //     .get('KK')
  //     .valueChanges.pipe(takeUntil(this.destroyed$))
  //     .subscribe((value) => {
  //       if (value && !this.getControlErrors(this.signUpForm.get('KK'), this.inputErr.FORMAT)) {
  //         this.signUpForm.get('IDCARD_KK').setValidators(Validators.required);
  //       } else {
  //         this.signUpForm.get('IDCARD_KK').setValidators(null);
  //       }

  //       this.signUpForm.get('IDCARD_KK').updateValueAndValidity();
  //     });
  // }
}
