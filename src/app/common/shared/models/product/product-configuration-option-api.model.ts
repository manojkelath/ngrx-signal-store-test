export interface ProductConfigurationOptionApiModel {
  name: string;
  showInSpec: boolean;
  showInCart: boolean;
  priceAffecting: boolean;
  listDisplayType?: string | null;
  showInConfig: boolean;
}
