import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { concat, forkJoin, Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, toArray, withLatestFrom } from 'rxjs/operators';

import {
  getAdvisoryHubConfiguration,
  getIsAdvisoryHubRegistrationEnabled,
} from '@features/app-configuration/state/selectors';
import { COOKIE_JSESSIONID, COOKIE_TOKEN_BUSINESS, COOKIE_TOKEN_PORTAL } from '@features/auth/constants';
import { AhSignUpResponseModel } from '@features/auth/models/api';
import { AuthService } from '@features/auth/services';
import { AuthActions } from '@features/auth/state/actions';
import {
  getCurrentUserContactId,
  getCurrentUserId,
  getCurrentUserOrganization,
  getIsRegistrationWithValidationCode,
  getIsUserVerified,
  getSignupInfo,
} from '@features/auth/state/selectors';
import { mapAhChangePasswordPayload, mapSignUpRequest, mapUserLoginInfoToPortal } from '@features/auth/utils';
import { DocumentsApiService } from '@features/documents/services';
import { ErrorHandlerActions } from '@features/error-handler';
import { mapAuthErrorAction } from '@features/error-handler/utils';
import { SpinnerCoverService } from '@features/spinner';
import { COOKIE_LANG_KEY } from '@features/translate/constants';
import { LanguagesEnum } from '@features/translate/enums';
import { TranslateActions } from '@features/translate/state/actions';
import { getActiveLanguage } from '@features/translate/state/selectors';
import { PartyRoleTypeEnum } from '@shared/enums';
import { IAppState } from '@shared/models';
import { DOMService } from '@shared/services';
import { customErrorMapper } from '@shared/utils';

@Injectable()
export class AuthEffects {
  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginInitiated),
      this.spinnerCoverService.startInSequence(),
      tap(() => {
        this.domService.setCookie(COOKIE_TOKEN_BUSINESS, '');
        this.domService.setCookie(COOKIE_TOKEN_PORTAL, '');
        this.domService.setCookie(COOKIE_JSESSIONID, '');
      }),
      exhaustMap(({ loginInfo }) =>
        this.authService.login(mapUserLoginInfoToPortal(loginInfo)).pipe(
          tap(() => {
            const kvsLanguage = this.domService.getCookie(COOKIE_LANG_KEY);
            if (kvsLanguage) {
              this.store$.dispatch(TranslateActions.switchLanguage({ lang: kvsLanguage }));
            }
          }),
          map((response) => {
            if (response?.changePassword) {
              return AuthActions.changePasswordRequest();
            }

            if (response?.message?.text === 'IOH error: null') {
              return AuthActions.loginFailed(
                customErrorMapper(this.translocoService.translate('auth.sign-in.unknown-data-error'))
              );
            }

            return response?.message?.text
              ? AuthActions.loginFailed(customErrorMapper(response?.message?.text))
              : AuthActions.loginSuccess();
          }),
          catchError(() =>
            of(
              AuthActions.loginFailed(
                customErrorMapper(this.translocoService.translate('auth.sign-in.invalid-data-error'))
              )
            )
          )
        )
      ),
      this.spinnerCoverService.endInSequence()
    )
  );

  public changePasswordInitiated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.changePasswordInitiated),
      this.spinnerCoverService.startInSequence(),
      withLatestFrom(this.store$.pipe(select(getIsAdvisoryHubRegistrationEnabled))),
      map(([{ changePassword }, isAdvisoryHubRegistrationEnabled]) =>
        isAdvisoryHubRegistrationEnabled
          ? AuthActions.changePasswordAh({ changePassword })
          : AuthActions.changePasswordKv({ changePassword })
      )
    )
  );

  public changePasswordKV$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.changePasswordKv),
      this.spinnerCoverService.startInSequence(),
      withLatestFrom(this.store$.pipe(select(getIsUserVerified))),
      exhaustMap(([{ changePassword }, isUserVerified]) =>
        (isUserVerified
          ? this.authService.changePasswordVerifiedUser(changePassword)
          : this.authService.changePasswordNotVerifiedUser(changePassword)
        ).pipe(
          map(() => AuthActions.changePasswordSuccess()),
          catchError((error) => of(AuthActions.changePasswordFailed({ error })))
        )
      ),
      this.spinnerCoverService.endInSequence()
    )
  );

  public changePasswordAH$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.changePasswordAh),
      this.spinnerCoverService.startInSequence(),
      withLatestFrom(this.store$.pipe(select(getAdvisoryHubConfiguration)), this.store$.pipe(select(getCurrentUserId))),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      exhaustMap(([{ changePassword }, { url, APIKey }, userId]) =>
        this.authService.ahChangePassword(mapAhChangePasswordPayload(changePassword, userId), url, APIKey).pipe(
          map(() => AuthActions.changePasswordSuccess()),
          catchError((error) => of(AuthActions.changePasswordFailed({ error })))
        )
      ),
      this.spinnerCoverService.endInSequence()
    )
  );

  public signupSubmittedDataInitiated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupSubmittedDataInitiated),
      withLatestFrom(this.store$.pipe(select(getIsRegistrationWithValidationCode))),
      map(([{ signupInfo }, isRegistrationWithValidationCode]) =>
        isRegistrationWithValidationCode
          ? AuthActions.sendValidationCodeInitiated()
          : AuthActions.signupInitiated({ signupInfo })
      )
    )
  );

  public signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupInitiated),
      this.spinnerCoverService.startInSequence(),
      switchMap(({ signupInfo }) => {
        const requestBody = mapSignUpRequest(signupInfo);

        return forkJoin([this.authService.kvSignup(requestBody), this.authService.grantPortalAccess(requestBody)]).pipe(
          map((data) =>
            data.some((item) => item === '')
              ? AuthActions.ahSignupFailed(
                  customErrorMapper(this.translocoService.translate('auth.sign-up.default-error-message'))
                )
              : AuthActions.signupSuccess()
          ),
          catchError((error: HttpErrorResponse) => {
            const apiErrorMessage = (error?.error?.messageList?.message || []).find(
              (message) => message?.code === 'REG_ERR_0001'
            )?.text;
            if (apiErrorMessage) {
              return of(AuthActions.signupFailed(customErrorMapper(apiErrorMessage)));
            }

            return of(
              AuthActions.signupFailed(
                customErrorMapper(
                  +error.status !== 201
                    ? this.translocoService.translate('auth.sign-in.already-registered-user-error')
                    : ''
                )
              )
            );
          })
        );
      }),

      this.spinnerCoverService.endInSequence()
    )
  );

  public ahSignup$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.ahSignup),
      this.spinnerCoverService.startInSequence(),
      withLatestFrom(
        this.store$.pipe(select(getAdvisoryHubConfiguration)),
        this.store$.pipe(select(getActiveLanguage))
      ),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      exhaustMap(([{ user }, { url, APIKey }, language]) =>
        this.authService.ahSignUp(user, url, APIKey).pipe(
          map((response: AhSignUpResponseModel) =>
            response.result
              ? AuthActions.ahSignupSuccess()
              : AuthActions.ahSignupFailed(
                  customErrorMapper(language === LanguagesEnum.EN ? response.sMessage.en : response.sMessage.id)
                )
          ),
          catchError(() =>
            of(
              AuthActions.ahSignupFailed(
                customErrorMapper(this.translocoService.translate('auth.sign-up.default-error-message'))
              )
            )
          )
        )
      ),
      this.spinnerCoverService.endInSequence()
    )
  );

  public sendValidationCodeInitiated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.sendValidationCodeInitiated),
      withLatestFrom(this.store$.pipe(select(getSignupInfo))),
      this.spinnerCoverService.startInSequence(),
      switchMap(([, signupInfo]) =>
        this.authService.sendValidationCode(signupInfo).pipe(
          map(({ validationCodeResponse }) =>
            AuthActions.sendValidationCodeSuccess({ confValidationCode: validationCodeResponse })
          ),
          catchError((error) => of(AuthActions.sendValidationCodeFailed({ error })))
        )
      ),
      this.spinnerCoverService.endInSequence()
    )
  );

  public checkValidationCodeInitiated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkValidationCodeInitiated),
      withLatestFrom(this.store$.pipe(select(getSignupInfo))),
      this.spinnerCoverService.startInSequence(),
      switchMap(([{ code }, signupInfo]) =>
        this.authService.checkValidationCode({ ...signupInfo, code }).pipe(
          map(({ validationResponse }) =>
            validationResponse.valid
              ? AuthActions.checkValidationCodeSuccess({ code })
              : AuthActions.checkValidationCodeFailed(
                  customErrorMapper(this.translocoService.translate('auth.validation-code.check-code-fail-message'))
                )
          ),
          catchError(() => of(AuthActions.checkValidationCodeFailed(customErrorMapper(''))))
        )
      ),
      this.spinnerCoverService.endInSequence()
    )
  );

  public checkValidationCodeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkValidationCodeSuccess),
      withLatestFrom(this.store$.pipe(select(getSignupInfo))),
      this.spinnerCoverService.startInSequence(),
      switchMap(([{ code }, signupInfo]) =>
        this.authService.selfRegisterCustomer(mapSignUpRequest(signupInfo), code).pipe(
          map(() => AuthActions.signupSuccess()),
          catchError((error) =>
            of(
              AuthActions.signupFailed(
                customErrorMapper(
                  +error.status !== 201
                    ? this.translocoService.translate('auth.sign-in.already-registered-user-error')
                    : ''
                )
              )
            )
          )
        )
      ),
      this.spinnerCoverService.endInSequence()
    )
  );

  public userIdentification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.userIdentificationInitiated),
      this.spinnerCoverService.startInSequence(),
      withLatestFrom(
        this.store$.pipe(select(getCurrentUserOrganization)),
        this.store$.pipe(select(getCurrentUserContactId))
      ),
      exhaustMap(([{ data }, partyRoleId, contactId]) =>
        concat(
          ...[
            ...(data.KTP
              ? [
                  this.authService
                    .addPartyIdentification({
                      parentId: partyRoleId,
                      identification: {
                        identificationNr: data.KTP,
                        issuingCountry: 'ID',
                        identificationType: 'KTP',
                      },
                    })
                    .pipe(
                      switchMap(() =>
                        data.IDCARD
                          ? this.documentsApiService
                              .uploadDocument({
                                contextCategory: 'CUSTOMER',
                                contextId: partyRoleId,
                                // eslint-disable-next-line @typescript-eslint/naming-convention
                                'x-csrf-token': this.domService.getCookie('x-csrf-token'),
                                file: data.IDCARD,
                                description: 'KTP Card',
                                documentType: 'KTP',
                                language: this.domService.getCookie(COOKIE_LANG_KEY),
                              })
                              .pipe(
                                switchMap((documentData: any) =>
                                  this.documentsApiService.addPartyDocument(
                                    {
                                      parentId: partyRoleId,
                                      document: {
                                        ...documentData,
                                        description: 'KTP Card',
                                        documentType: 'KTP',
                                      },
                                    },
                                    PartyRoleTypeEnum.CUSTOMER
                                  )
                                )
                              )
                          : of(true)
                      )
                    ),
                ]
              : []),
            ...(data.KK
              ? [
                  this.authService
                    .addPartyIdentification({
                      parentId: partyRoleId,
                      identification: {
                        identificationNr: data.KK,
                        issuingCountry: 'ID',
                        identificationType: 'KK',
                      },
                    })
                    .pipe(
                      switchMap(() =>
                        data.IDCARD_KK
                          ? this.documentsApiService
                              .uploadDocument({
                                contextCategory: 'CUSTOMER',
                                contextId: partyRoleId,
                                // eslint-disable-next-line @typescript-eslint/naming-convention
                                'x-csrf-token': this.domService.getCookie('x-csrf-token'),
                                file: data.IDCARD_KK,
                                description: 'KK Card',
                                documentType: 'KK',
                                language: this.domService.getCookie(COOKIE_LANG_KEY),
                              })
                              .pipe(
                                switchMap((documentData: any) =>
                                  this.documentsApiService.addPartyDocument(
                                    {
                                      parentId: partyRoleId,
                                      document: {
                                        ...documentData,
                                        description: 'KK Card',
                                        documentType: 'KK',
                                      },
                                    },
                                    PartyRoleTypeEnum.CUSTOMER
                                  )
                                )
                              )
                          : of(true)
                      )
                    ),
                ]
              : []),
            ...(data.SELFIE
              ? [
                  this.documentsApiService
                    .uploadDocument({
                      contextCategory: 'CUSTOMER',
                      contextId: partyRoleId,
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      'x-csrf-token': this.domService.getCookie('x-csrf-token'),
                      file: data.SELFIE,
                      description: 'Selfie',
                      documentType: 'SELFIE',
                      language: this.domService.getCookie(COOKIE_LANG_KEY),
                    })
                    .pipe(
                      switchMap((documentData: any) =>
                        this.documentsApiService.addPartyDocument(
                          {
                            parentId: partyRoleId,
                            document: {
                              ...documentData,
                              description: 'Selfie',
                              documentType: 'SELFIE',
                            },
                          },
                          PartyRoleTypeEnum.CUSTOMER
                        )
                      )
                    ),
                ]
              : []),
            ...(data.maidenName
              ? [
                  this.authService.addContactPartyIdentification({
                    parentId: contactId,
                    identification: {
                      identificationNr: data.maidenName,
                      identificationType: 'MAIDENNAME',
                    },
                  }),
                ]
              : []),
            ...(data.placeOfBirth || data.nationality || data.birthDate
              ? [this.authService.updateContact(contactId, data.placeOfBirth, data.nationality, data.birthDate)]
              : []),
            ...(data.streetAddress ? [this.authService.addContactMediumAddress(partyRoleId, data)] : []),
            ...(data.mobilePhone ? [this.authService.addContactMediumMobilePhone(partyRoleId, data)] : []),
          ]
        ).pipe(
          toArray(),
          map(() => AuthActions.userIdentificationSuccess()),
          catchError((error) => of(AuthActions.userIdentificationFailed({ error })))
        )
      ),
      this.spinnerCoverService.endInSequence()
    )
  );

  public forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgotPasswordInitiated),
      this.spinnerCoverService.startInSequence(),
      exhaustMap(({ forgotPassword }) =>
        this.authService.forgotPassword(forgotPassword).pipe(
          map(() => AuthActions.forgotPasswordSuccess()),
          catchError((error) => of(AuthActions.forgotPasswordFailed({ error })))
        )
      ),
      this.spinnerCoverService.endInSequence()
    )
  );

  public logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutInitiated),
      withLatestFrom(this.store$.pipe(select(getAdvisoryHubConfiguration)), this.store$.pipe(select(getCurrentUserId))),
      this.spinnerCoverService.startInSequence(),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      exhaustMap(([, { APIKey, url }, email]) =>
        forkJoin([this.authService.logout(), this.authService.ahLogout(url, APIKey, email)]).pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((error) => of(AuthActions.logoutFailed({ error })))
        )
      ),
      this.spinnerCoverService.endInSequence()
    )
  );

  public clearErrors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthActions.ahSignupSuccess,
        AuthActions.loginSuccess,
        AuthActions.signupSuccess,
        AuthActions.forgotPasswordSuccess
      ),
      map(() => ErrorHandlerActions.clearErrors())
    )
  );

  public authError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthActions.ahSignupFailed,
        AuthActions.loginFailed,
        AuthActions.signupFailed,
        AuthActions.checkValidationCodeFailed,
        AuthActions.forgotPasswordFailed
      ),
      mapAuthErrorAction()
    )
  );

  constructor(
    private store$: Store<IAppState>,
    private actions$: Actions,
    private authService: AuthService,
    private spinnerCoverService: SpinnerCoverService,
    private domService: DOMService,
    private translocoService: TranslocoService,
    private documentsApiService: DocumentsApiService
  ) {}
}
