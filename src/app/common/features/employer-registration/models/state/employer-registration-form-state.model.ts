import { EmployerRegistrationPayloadModel } from '@features/employer-registration/models/api';

export interface EmployerRegistrationFormStateModel {
  isOpen: boolean;
  massage: string;
  employerRegistrationData: EmployerRegistrationPayloadModel;
}
