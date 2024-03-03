import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { Subject } from 'rxjs';

import { mapUserIdentificationBirthDateUtils } from '@features/additional-information/utils';
import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { CORPORATE_ID_FORMAT_ERRORS } from '@features/employer-registration/constants';
import { ISelectOptionModel } from '@features/select';
import { CORPORATE_ID_REGEX, DEFAULT_INPUT_ERRORS } from '@shared/constants';
import { getControlErrors } from '@shared/utils';

@Component({
  selector: 'kv-employer-registration',
  templateUrl: './employer-registration.component.html',
  styleUrls: ['./employer-registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployerRegistrationComponent implements OnDestroy {
  @Input()
  public typeRegistrationOptions: ISelectOptionModel[];

  @Input()
  public registrationStatusIsNotValid: boolean;

  @Input()
  public message: string;

  @Output() public submitted: EventEmitter<any> = new EventEmitter();

  @Output() public cancel: EventEmitter<void> = new EventEmitter();

  public filterBy: string;
  public isSubmitted = false;
  private destroyed$ = new Subject<void>();
  public inputErr = {
    ...DEFAULT_INPUT_ERRORS,
    CORPORATE_ID_FORMAT_ERRORS,
  };

  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;
  public employerRegistrationForm: FormGroup = this.formBuilder.group({
    corporateId: ['', [Validators.required, Validators.pattern(CORPORATE_ID_REGEX)]],
    typeOfRegistration: ['', Validators.required],
    additionalInformation: this.formBuilder.group({}),
  });

  constructor(
    private formBuilder: FormBuilder,
    private appGoogleAnalyticsService: AppGoogleAnalyticsService,
    private translocoService: TranslocoService
  ) {}

  public get additionalInformation() {
    return this.employerRegistrationForm.get('additionalInformation') as FormGroup;
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public getControlErrors(control: AbstractControl, errors: {}): string {
    return this.isSubmitted ? this.translocoService.translate(getControlErrors(control, errors)) : null;
  }

  public onSubmit(): void {
    this.appGoogleAnalyticsService.event({
      event: 'submit_employee-registration_button_click',
      category: this.googleAnalyticsCategoryEnum.EMPLOYEE_REGISTRATION,
    });
    this.isSubmitted = true;

    if (this.employerRegistrationForm.valid) {
      this.submitted.emit(mapUserIdentificationBirthDateUtils(this.employerRegistrationForm.value));
    }
  }

  public onModalClose(): void {
    this.appGoogleAnalyticsService.event({
      event: 'close_employee-registration_button_click',
      category: this.googleAnalyticsCategoryEnum.EMPLOYEE_REGISTRATION,
    });
    this.cancel.emit();
  }

  public onCancel(): void {
    this.appGoogleAnalyticsService.event({
      event: 'cancel_employee-registration_button_click',
      category: this.googleAnalyticsCategoryEnum.EMPLOYEE_REGISTRATION,
    });
    this.cancel.emit();
  }
}
