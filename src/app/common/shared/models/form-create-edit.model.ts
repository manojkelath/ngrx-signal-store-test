import { FormModeEnum } from "../enums";

export interface FormCreateEditModel<T> {
  formMode: FormModeEnum;
  id: string;
  entity: T;
}
