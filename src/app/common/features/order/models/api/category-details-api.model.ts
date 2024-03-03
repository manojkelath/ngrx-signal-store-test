import { CategoryGroupApiModel } from './category-group-api.model';

export interface CategoryDetailsApiModel {
  catalog: string;
  categoryAttribute: any[];
  categoryGroup: CategoryGroupApiModel[];
  categoryId: string;
  createdBy: string;
  createdDate: string;
  hideWithSubtree: boolean;
  inheritedAttribute: any[];
  inheritedGroup: any[];
  label: string;
  lastUpdated: string;
  localizedLabel: any[];
  name: string;
  parentSpecification: any[];
  path: string;
  productCodeFormat: string;
  productTag: string[];
  sequenceNo: number;
  type: string;
  updatedBy: string;
  version: number;
  versionNo: number;
  dataaccess: any[];
}
