import { RouteQueryParamsEnum } from '@shared/enums';
import { selectQueryParam } from '@shared/state/selectors';

export const getCurrentProductCode = selectQueryParam(RouteQueryParamsEnum.PRODUCT_CODE);
