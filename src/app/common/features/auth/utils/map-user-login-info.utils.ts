import { ILoginInfoModel } from '@features/auth/models';

export const mapUserLoginInfoToPortal = (loginInfo: ILoginInfoModel): ILoginInfoModel => ({
  ...loginInfo,
  user: `Portal:${loginInfo.user}`,
});
