import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { mapUserIdentificationBirthDateUtils } from '@features/additional-information/utils';
import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { IIdentificationInfoModel } from '@features/auth/models';
import { ISelectOptionModel } from '@features/select';
import { DEFAULT_INPUT_ERRORS } from '@shared/constants';

@Component({
  selector: 'kv-add-user-identification',
  templateUrl: './add-user-identification.component.html',
  styleUrls: ['./add-user-identification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserIdentificationComponent {
  @Input()
  public requiredItems: any;

  @Input()
  public provinceOptions: ISelectOptionModel[];

  @Input()
  public cityOptions: ISelectOptionModel[];

  @Output()
  public cancel: EventEmitter<void> = new EventEmitter();

  @Output()
  public submitted: EventEmitter<IIdentificationInfoModel> = new EventEmitter();

  @Output()
  public provinceChanged: EventEmitter<string> = new EventEmitter();

  public form: FormGroup = this.formBuilder.group({});

  public inputErr = {
    ...DEFAULT_INPUT_ERRORS,
    TERMS_ERROR: { required: 'form.terms-required' },
  };
  public isSubmitted = false;
  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;

  constructor(private formBuilder: FormBuilder, private appGoogleAnalyticsService: AppGoogleAnalyticsService) {}

  public onSubmit(): void {
    this.appGoogleAnalyticsService.event({
      event: 'submit_user_identification_button_click',
      category: this.googleAnalyticsCategoryEnum.USER_DETAILS,
    });
    this.isSubmitted = true;

    if (this.form.valid) {
      this.submitted.emit(mapUserIdentificationBirthDateUtils(this.form.getRawValue()));
    }
  }

  public onCancel(): void {
    this.appGoogleAnalyticsService.event({
      event: 'cancel_add_user_identification_button_click',
      category: this.googleAnalyticsCategoryEnum.USER_DETAILS,
    });
    this.cancel.emit();
  }

  public onModalClose(): void {
    this.appGoogleAnalyticsService.event({
      event: 'close_user_identification_modal_button_click',
      category: this.googleAnalyticsCategoryEnum.USER_DETAILS,
    });
    this.cancel.emit();
  }

  public onProvinceChanged(province: string): void {
    this.provinceChanged.emit(province);
  }
}
