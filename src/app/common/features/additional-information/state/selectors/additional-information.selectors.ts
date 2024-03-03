import { createSelector } from '@ngrx/store';

import { getAdditionalInformationState } from '@features/additional-information/state/selectors';

export const getRegistrationStatus = createSelector(getAdditionalInformationState, (state) => state.registrationStatus);

export const getIfRegistrationStatusIsNotValid = createSelector(getRegistrationStatus, (data) =>
  data ? data?.statusExcludingAddress !== 'COMPLETE' : false
);

export const getIfRegistrationStatusIsValid = createSelector(getRegistrationStatus, (data) =>
  data ? data?.statusExcludingAddress !== 'INCOMPLETE' : false
);

export const getRequiredRegistrationItems = createSelector(getRegistrationStatus, (data) =>
  (data?.requirements || []).reduce((acc, curr) => {
    if (curr.status !== 'COMPLETE' && (curr['photoRequired'] || curr['valueRequired'])) {
      acc.push({
        name: curr.name,
        photoRequired: curr['photoRequired'],
        valueRequired: curr['valueRequired'],
      });
    }
    return acc;
  }, [])
);
