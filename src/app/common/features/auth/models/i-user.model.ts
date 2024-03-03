export interface IUserModel {
  firstName: string;
  lastName: string;
  userId: string;
  jwt: boolean;
  organization: string;
  organizationName: string;
  contactId: string;
  realm: string | null;
  terms: string | null;
  partyType?: string | null;
}
