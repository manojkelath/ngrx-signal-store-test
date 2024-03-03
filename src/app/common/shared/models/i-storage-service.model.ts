export interface IStorageServiceModel {
  setItem: (key: string, value: any, isJson?: boolean) => boolean;
  getItem: (key: string, isJson: boolean) => any | undefined;
  removeItem: (key: string) => boolean;
}
