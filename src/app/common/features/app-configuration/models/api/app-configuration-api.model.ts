import { AdvisoryHubConfigurationApiModel } from './advisory-hub-configuration-api.model';
import { ZealsConfigurationApiModel } from './google-analytics-configuration-api.model';
import { RegistrationConfigurationApiModel } from './registration-configuration-api.model';
import { ShopConfigurationApiModel } from './shop-configuration-api.model';
import { GoogleAnalyticsConfigurationApiModel } from './zeals-configuration-api.model';

export interface AppConfigurationApiModel {
  advisoryHub: AdvisoryHubConfigurationApiModel;
  registration: RegistrationConfigurationApiModel;
  shop: ShopConfigurationApiModel;
  googleAnalytics: GoogleAnalyticsConfigurationApiModel;
  zeals: ZealsConfigurationApiModel;
}
