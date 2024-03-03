import { ProductCategoryEnum } from '@features/product-checkout-components/enums';

export const productCategoryIdFn = (product: any) => product?.productDetails?.product?.categoryId;

export const productCategoryFn = (product: any) => getProductCategoryById(productCategoryIdFn(product));

export const getProductCategoryById = (categoryId): ProductCategoryEnum => {
  switch (categoryId) {
    case 'cb649f91-f9ce-447a-b2b6-5e861f276b4a':
      return ProductCategoryEnum.ADVISORY_HUB;
    case 'bbb6c878-efe2-4c2d-b0f5-c951c8ffd56a':
    case 'efe03f80-9963-4155-a053-cc0b98eb01f2':
      return ProductCategoryEnum.CLOUD_VOICE_LITE;
    case 'ee11b9a6-eeb1-4523-bac8-7d9ec0ce8cb6':
      return ProductCategoryEnum.MEET_TEAM_PRO;
    case '94cd39de-7b33-4bbc-8d41-c5d83a7df437':
      return ProductCategoryEnum.PROMOTIONAL_SMS_PACKAGE;
    case '57e6d0f6-d54d-4173-bbd3-7c3521451140':
      return ProductCategoryEnum.BUSINESS_PRODUCTIVITY_PACKAGE;
    case '193e7013-d93e-4d00-abbf-0c82b5d50a47':
      return ProductCategoryEnum.PRIME;
    case '57e6d0f6-d54d-4173-bbd2-7c3521451140':
      return ProductCategoryEnum.PRIME_BUNDLED;
    case '1232f852-68af-4ebe-9576-dd8a043616aa':
      return ProductCategoryEnum.PRO_FREEDOM_APPS;
    case '7281e41a-7eb5-474f-9ae7-53ff34485b15':
      return ProductCategoryEnum.EMPLOYEE_PURCHASE_PROGRAM;
    case '5d39f48c-098d-4858-a46b-2b22c7251c76':
      return ProductCategoryEnum.EMPLOYER_REGISTRATION;
    case '8059356a-2166-4f1e-a1e4-dc25478d7a5e':
    case '3d95d2b4-9be9-478d-b6f1-1a60aea46d9d':
    case '09d3c208-252e-44cb-8868-2ed6195bf940':
      return ProductCategoryEnum.I_MANAGE;
    case 'd0fc1a0b-6f54-456b-8264-3d98e862353b':
      return ProductCategoryEnum.PRIME_BULK;
    case 'ad7bc42e-765e-4c53-921d-83d75278f501':
      return ProductCategoryEnum.PRO_FREEDOM_APPS_BULK;
    case '216a1e26-ad4b-400f-ac25-711ee91be38a':
    case 'db69a0e9-06ba-4f5c-a526-09f9774d5de1':
    case 'e4950502-2d76-458a-a5c5-4d7cc05b5400':
      return ProductCategoryEnum.BULK_PURCHASE_PROGRAM;
    case '3ba4517b-ae90-438e-8ba3-42bed1ae4d7d':
      return ProductCategoryEnum.YOOV_BUNDLES;
    default:
      return ProductCategoryEnum.UNKNOWN;
  }
};

export const isConfigsToShow = (configOption) => configOption.some((conf) => conf.showInConfig === true);
