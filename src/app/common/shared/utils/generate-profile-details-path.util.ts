import { PartyRoleTypeEnum } from '@shared/enums';

export const generateProfileDetailsPath = (partyRoleType: PartyRoleTypeEnum) => {
  switch (partyRoleType) {
    case PartyRoleTypeEnum.CONTACT:
      return `portal/${partyRoleType.toLowerCase()}`;
    default:
      return `${partyRoleType.toLowerCase()}/portal`;
  }
};
