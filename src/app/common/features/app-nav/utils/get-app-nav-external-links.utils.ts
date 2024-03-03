import { ShopConfigurationApiModel } from '@features/app-configuration/models/api';
import { AppNavItemModel } from '@features/app-nav/models';

export const getAppNavExternalLinks = (shopConfiguration: ShopConfigurationApiModel): AppNavItemModel[] => [
  {
    title: 'academy',
    iconPath: 'academy.svg',
    externalLink: shopConfiguration?.academyHomePage,
  },
  {
    title: 'advisory',
    iconPath: 'advisory.svg',
    externalLink: shopConfiguration?.advisoryHubHomePage,
  },
  {
    title: 'marketspace',
    iconPath: 'marketspace.svg',
    externalLink: shopConfiguration?.marketspaceHomePage,
  },
];
