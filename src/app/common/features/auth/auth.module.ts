import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppGaEventDirective } from '@features/app-google-analytics/directives';
import { AuthEffects, AuthPageEffects, UserEffects } from '@features/auth/state/effects';
import { authFeatureReducers } from '@features/auth/state/reducers';
import { authFeatureName } from '@features/auth/state/selectors';
import { ErrorHandlerModule } from '@features/error-handler';
import { FilesFeatureModule } from '@features/files';
import { CheckboxModule } from '@features/forms/checkbox';
import { FormControlModule } from '@features/forms/form-control';
import { InputModule } from '@features/forms/input';
import { TermsModule } from '@features/terms';
import { IconComponent } from '@shared/components/icon';

import {
  AhSignUpComponent,
  AhSignUpContainerComponent,
  AuthLoginWrapperContainerComponent,
  AuthUiWrapperComponent,
  AuthUiWrapperContainerComponent,
  ChangePasswordComponent,
  ChangePasswordContainerComponent,
  ForgotPasswordComponent,
  ForgotPasswordContainerComponent,
  LoginComponent,
  LoginContainerComponent,
  SignUpComponent,
  SignUpConfirmationComponent,
  SignUpConfirmationContainerComponent,
  SignUpContainerComponent,
  ValidationCodeComponent,
  ValidationCodeContainerComponent,
} from './components';
import { AuthInterceptor } from './interceptors';

@NgModule({
  declarations: [
    AuthUiWrapperContainerComponent,
    AuthUiWrapperComponent,
    LoginContainerComponent,
    LoginComponent,
    SignUpContainerComponent,
    SignUpComponent,
    ChangePasswordComponent,
    ChangePasswordContainerComponent,
    ForgotPasswordContainerComponent,
    ForgotPasswordComponent,
    ValidationCodeContainerComponent,
    ValidationCodeComponent,
    SignUpConfirmationContainerComponent,
    SignUpConfirmationComponent,
    AhSignUpComponent,
    AhSignUpContainerComponent,
    AuthLoginWrapperContainerComponent,
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([AuthPageEffects, AuthEffects, UserEffects]),
    StoreModule.forFeature(authFeatureName, authFeatureReducers),
    ReactiveFormsModule,
    FormControlModule,
    FilesFeatureModule,
    InputModule,
    CheckboxModule,
    IconComponent,
    ErrorHandlerModule,
    TranslocoModule,
    TermsModule,
    AppGaEventDirective,
  ],
  exports: [AuthUiWrapperContainerComponent],
})
export class AuthModule {
  public static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    };
  }
}
