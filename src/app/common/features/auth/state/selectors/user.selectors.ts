import { createSelector } from '@ngrx/store';

import { generateUserFullName } from '@shared/utils';

import { getUserState } from './auth-base.selectors';

export const getCurrentUser = createSelector(getUserState, (userState) => userState?.currentUser);

export const getCurrentUserInitials = createSelector(getCurrentUser, (user) =>
  `${user?.firstName?.charAt(0) || ''}${user?.lastName?.charAt(0) || ''}`.toUpperCase()
);

export const getCurrentUserFullName = createSelector(getCurrentUser, (user) => {
  if (!user) {
    return null;
  }

  return generateUserFullName(user.firstName, user.lastName);
});

export const getCurrentUserId = createSelector(getCurrentUser, (user) => user?.userId);

export const getIsUserVerified = createSelector(getCurrentUser, (user) => !!user?.userId);

export const getIsUserStateInitialized = createSelector(getUserState, (user) => user?.isUserStateInitialized);

export const getCurrentUserOrganization = createSelector(getCurrentUser, (user) => user?.organization);

export const getCurrentUserOrganizationName = createSelector(getCurrentUser, (user) => user?.organizationName);

export const getCurrentUserContactId = createSelector(getCurrentUser, (user) => user?.contactId);

export const getCurrentUserTermsId = createSelector(getCurrentUser, (user) => user?.terms);

export const getIsUserTermsInitialized = createSelector(
  getCurrentUserTermsId,
  getIsUserVerified,
  (isTermsInitialized, isUserVerified) => isUserVerified && !isTermsInitialized
);

export const getUserPartyType = createSelector(getCurrentUser, (user) => user.partyType);
