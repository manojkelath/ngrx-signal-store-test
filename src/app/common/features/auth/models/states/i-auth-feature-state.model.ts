import { IAuthPageStateModel } from './i-auth-page-state.model';
import { IUserStateModel } from './i-user-state.model';

export interface IAuthFeatureStateModel {
  authPage: IAuthPageStateModel;
  user: IUserStateModel;
}
