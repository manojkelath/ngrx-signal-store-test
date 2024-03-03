export interface AppNavItemModel {
  iconPath?: string;
  title: string;
  externalLink?: string;
  routerLink?: string;
  newTabOpening?: boolean;
  isActive?: boolean;
  isDisable?: boolean;
  // FIXME: remove when the waiting payment functionality should be implemented
  isHidden?: boolean;
}
