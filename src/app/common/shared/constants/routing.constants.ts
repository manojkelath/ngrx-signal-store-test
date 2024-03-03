import { RouteDataNamesEnum } from '@shared/enums';

export const PRELOAD_ROUTE_CONFIGURATION = {
  // Configured for preload with this flag in PreloadSelectedModulesList class
  [RouteDataNamesEnum.PRELOAD]: true,
};

export const NO_PRELOAD_ROUTE_CONFIGURATION = {
  // Configured for preload with this flag in PreloadSelectedModulesList class
  [RouteDataNamesEnum.PRELOAD]: false,
};
