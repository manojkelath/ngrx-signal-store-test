import { IUserModel } from '@features/auth/models';

export const mapUserInfoResponse = (userInfoResponse: any): IUserModel => ({
  firstName: userInfoResponse.userInfo.firstName ?? null,
  lastName: userInfoResponse.userInfo.lastName ?? null,
  userId: userInfoResponse.userInfo.userId ?? null,
  jwt: userInfoResponse.userInfo.jwt ?? false,
  organization: userInfoResponse.userInfo.organization ?? null,
  organizationName: userInfoResponse.userInfo.organizationName ?? null,
  realm: userInfoResponse.userInfo.realm || null,
  contactId: userInfoResponse.userInfo.contactId ?? null,
  terms: userInfoResponse.userInfo.terms || null,
  partyType: userInfoResponse.userInfo.partyType || null,
});
