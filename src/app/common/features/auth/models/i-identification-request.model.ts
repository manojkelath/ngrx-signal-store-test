export interface IIdentificationRequestModel {
  partyRoleId: string;
  identification: { type: string; number: string }[];
  photograph: { type: string; photograph: string }[];
}
