import { IUserModel } from '@features/auth/models';

export interface IUserStateModel {
  currentUser: IUserModel;
  isUserStateInitialized: boolean;
}
