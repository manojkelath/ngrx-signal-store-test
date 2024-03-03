import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RegistrationModelEnum } from '@features/app-configuration/enums';
import { AppConfigurationApiModel } from '@features/app-configuration/models/api';

export const appConfigurationFeatureName = 'appConfigurationFeature';

export const getAppConfigurationState = createFeatureSelector<AppConfigurationApiModel>(appConfigurationFeatureName);

export const getRegistrationConfiguration = createSelector(
  getAppConfigurationState,
  (configuration) => configuration?.registration
);

export const getShopConfiguration = createSelector(getAppConfigurationState, (configuration) => configuration?.shop);

export const getAdvisoryHubConfiguration = createSelector(
  getAppConfigurationState,
  (configuration) => configuration?.advisoryHub
);

export const getIsAdvisoryHubRegistrationEnabled = createSelector(
  getAppConfigurationState,
  (configuration) => configuration?.registration?.model === RegistrationModelEnum.AH
);

export const getGoogleAnalyticsTrackId = createSelector(
  getAppConfigurationState,
  (configuration) => configuration?.googleAnalytics?.googleAnalyticsID
);

export const getZealsConfigurations = createSelector(getAppConfigurationState, (configuration) => configuration?.zeals);

export const getHomePageUrl = createSelector(
  getAppConfigurationState,
  (configuration) => configuration?.shop?.ideHomePage
);
