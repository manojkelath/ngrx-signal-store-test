export interface IStorageModel {
  setItem: (key: string, value: any) => void;
  getItem: (key: string) => string;
  removeItem: (key: string) => void;
}
