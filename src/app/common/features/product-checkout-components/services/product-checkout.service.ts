import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';

import { OrderConfigurableProductApiModel } from '@features/order/models/api';
import { OrderWithConfigurableInformationStateModel } from '@features/order/models/state';
import { ProductCategoryEnum } from '@features/product-checkout-components/enums';
import { ProductConfigurationListModel, ProductConfigurationModel } from '@features/product-checkout-components/models';
import { getProductCategoryById, mapProductConfigurationValue } from '@features/product-checkout-components/utils';
import { ProductAttributeTypeEnum } from '@features/product-details/enums';
import { isProductAttributeInCart } from '@features/product-details/utils';
import {
  createDynamicReferenceDataListSelector,
  createStaticReferenceDataListSelector,
  ReferenceDataLoadingActions,
} from '@features/reference-data';
import { getCityPayload, getQualifierPayload, validateReferenceEnumeration } from '@features/reference-data/utils';
import { LanguagesEnum } from '@features/translate/enums';
import { getActiveLanguage } from '@features/translate/state/selectors';
import { IAppState, KeyValueModel } from '@shared/models';
import { ProductApiModel } from '@shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductCheckoutService {
  constructor(private store$: Store<IAppState>) {}

  public getProductConfiguration$(
    orderDetailsWithConfigurableInformation$: Observable<OrderWithConfigurableInformationStateModel>
  ): Observable<{
    [key: string]: ProductConfigurationModel[];
  }> {
    return combineLatest([orderDetailsWithConfigurableInformation$, this.store$.pipe(select(getActiveLanguage))]).pipe(
      map(([orderDetailsWithConfigurableInformation, activeLang]) => [
        {
          order:
            orderDetailsWithConfigurableInformation?.order ||
            orderDetailsWithConfigurableInformation?.subscriptionOrder,
          orderConfigurableInformation: orderDetailsWithConfigurableInformation?.orderConfigurableInformation,
        },
        activeLang,
      ]),
      map(
        ([orderDetailsWithConfigurableInformation, activeLang]: [
          OrderWithConfigurableInformationStateModel,
          LanguagesEnum
        ]) =>
          orderDetailsWithConfigurableInformation?.order?.product.reduce((acc, curr) => {
            const currentProducts = [curr, ...(curr?.bundleItem || [])];

            for (const product of currentProducts) {
              if (!product?.configuration?.categoryId) {
                continue;
              }
              const productConfiguration = product?.configuration;
              const productConfigurationAccessRules = product?.configuration?.__metadata?.access || {};
              const configOptionsMap: Map<string, any> =
                orderDetailsWithConfigurableInformation?.orderConfigurableInformation
                  ? this.getProductConfigurableInformationConfigOptionsMap(
                      orderDetailsWithConfigurableInformation.orderConfigurableInformation,
                      curr,
                      product
                    )
                  : null;
              const productConfigurableInformationCategoryDetails: any =
                orderDetailsWithConfigurableInformation?.orderConfigurableInformation
                  ? this.getProductConfigurableInformationCategoryDetails(
                      orderDetailsWithConfigurableInformation.orderConfigurableInformation,
                      curr,
                      product
                    )
                  : null;

              const loadEnums: Set<Action> = new Set();

              const configurationList: ProductConfigurationListModel[] = [
                ...(productConfigurableInformationCategoryDetails?.categoryAttribute || []),
                ...(productConfigurableInformationCategoryDetails?.inheritedAttribute || []),
              ].reduce((configurationListAcc, attribute) => {
                if (isProductAttributeInCart(attribute, productConfigurationAccessRules)) {
                  let referenceEnumeration =
                    (attribute?.type === ProductAttributeTypeEnum.SPECIAL && attribute?.specialTypeName) ||
                    (attribute?.type === ProductAttributeTypeEnum.DBENUM && attribute?.typeEnumName);

                  referenceEnumeration =
                    getProductCategoryById(product?.productCategory) === ProductCategoryEnum.UNKNOWN
                      ? referenceEnumeration
                      : validateReferenceEnumeration(referenceEnumeration);

                  const configurations: ProductConfigurationListModel = {
                    name: attribute.name,
                    text: (configOptionsMap.get(attribute.name)?.localizedText || []).find(
                      (title) => title.language === activeLang
                    )?.text,
                    attributeType:
                      [ProductAttributeTypeEnum.SPECIAL, ProductAttributeTypeEnum.DBENUM].includes(attribute?.type) &&
                      !referenceEnumeration
                        ? ProductAttributeTypeEnum.STRING
                        : attribute?.type,
                    value: mapProductConfigurationValue(productConfiguration, attribute.name),
                    ...(referenceEnumeration ? { referenceEnumeration } : {}),
                  };

                  const trigger = (productConfigurableInformationCategoryDetails?.dataaccess || []).find(
                    (data) => data?.name === attribute.name
                  )?.triggers;

                  if (attribute?.type === ProductAttributeTypeEnum.SPECIAL && referenceEnumeration && trigger) {
                    if (trigger && productConfiguration[trigger]) {
                      configurations.options$ = this.getDynamicOptions$(
                        referenceEnumeration,
                        productConfiguration[trigger]
                      );

                      loadEnums.add(
                        ReferenceDataLoadingActions.dynamicDataRequest({
                          dataKey: referenceEnumeration,
                          params: getQualifierPayload(productConfiguration[trigger]),
                        })
                      );
                    }
                  }

                  if (
                    (attribute?.type === ProductAttributeTypeEnum.DBENUM && referenceEnumeration) ||
                    (attribute?.type === ProductAttributeTypeEnum.SPECIAL && referenceEnumeration && !trigger)
                  ) {
                    configurations.options$ = this.getStaticOptions$(referenceEnumeration);

                    loadEnums.add(
                      ReferenceDataLoadingActions.simpleDataRequest({
                        dataKey: referenceEnumeration,
                      })
                    );
                  }

                  configurationListAcc = [...configurationListAcc, configurations];
                }

                return configurationListAcc;
              }, []);

              if (!configurationList?.length) {
                continue;
              }

              if (loadEnums.size) {
                for (const loadEnum of loadEnums) {
                  this.store$.dispatch(loadEnum);
                }
              }

              acc[curr.productId] = [
                ...(acc?.[curr.productId] || []),
                {
                  productName: product.title || product.description,
                  productCode: product.productCode,
                  configurationList,
                },
              ];
            }

            return acc;
          }, {})
      )
    );
  }

  private getStaticOptions$(referenceName: string): Observable<KeyValueModel[]> {
    return this.store$.pipe(
      select(createStaticReferenceDataListSelector(referenceName)),
      map((items) =>
        (items ?? []).map((item) => ({
          key: item.code,
          value: item.description,
        }))
      )
    );
  }

  private getDynamicOptions$(referenceName: string, triggerValue: string): Observable<KeyValueModel[]> {
    return this.store$.pipe(
      select(createDynamicReferenceDataListSelector(referenceName, getCityPayload(triggerValue))),
      map((options) =>
        options.map((item) => ({
          key: item.code,
          value: item.description,
        }))
      )
    );
  }

  private getProductConfigurableInformationCategoryDetails(
    orderConfigurableInformation: OrderConfigurableProductApiModel[],
    currentProduct: ProductApiModel,
    product: OrderConfigurableProductApiModel
  ): any {
    for (const configurableInformation of orderConfigurableInformation) {
      if (configurableInformation?.productId === currentProduct?.productId) {
        if (configurableInformation?.productId === product?.productId) {
          return configurableInformation?.categoryDetails;
        }

        return (
          (configurableInformation?.bundleItemDetails || []).find(
            (bundleItemDetails) => bundleItemDetails?.productId === product?.productId
          )?.categoryDetails || null
        );
      }
    }

    return null;
  }

  private getProductConfigurableInformationConfigOptionsMap(
    orderConfigurableInformation: OrderConfigurableProductApiModel[],
    currentProduct: ProductApiModel,
    product: OrderConfigurableProductApiModel
  ): Map<string, any> {
    for (const configurableInformation of orderConfigurableInformation) {
      if (configurableInformation?.productId === currentProduct?.productId) {
        if (configurableInformation?.productId === product?.productId) {
          return (configurableInformation?.configOption || []).reduce((acc, option) => {
            acc.set(option.name, option);
            return acc;
          }, new Map());
        }

        return (
          (configurableInformation?.bundleItemDetails || []).find(
            (bundleItemDetails) => bundleItemDetails?.productId === product?.productId
          )?.configOption || []
        ).reduce((acc, option) => {
          acc.set(option.name, option);
          return acc;
        }, new Map());
      }
    }

    return null;
  }
}
