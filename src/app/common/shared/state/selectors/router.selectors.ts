import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IRouterStateUrlModel } from '@shared/models';
import { isSpecificPage } from '@shared/utils';

export const selectRouter = createFeatureSelector<RouterReducerState<IRouterStateUrlModel>>('router');

// NOTE: The getSelectors method works with the routerReducer provided by @ngrx/router-store. If you use a custom serializer, you'll need to provide your own selectors
export const { selectUrl } = getSelectors(selectRouter);

export const getIsRouterReady = createSelector(
  selectUrl,
  (currentUrl) =>
    // Router state is not initialized straight away, so sometimes need to wait for that
    !!currentUrl
);
export const selectRouterUrl = createSelector(selectRouter, (routerState) => routerState?.state?.url);

export const selectRouteParams = createSelector(selectRouter, (routerState) => routerState?.state.params || {});

export const selectRouteData = createSelector(selectRouter, (routerState) => routerState?.state.data || {});

export const selectQueryParams = createSelector(selectRouter, (routerState) => routerState?.state.queryParams || {});

export const selectRouteParamFactory = (paramName) => createSelector(selectRouteParams, (params) => params[paramName]);

export const selectRouteDataFactory = (dataName) => createSelector(selectRouteData, (data) => data[dataName]);

export const selectQueryParam = (paramName) => createSelector(selectQueryParams, (params) => params[paramName]);

export const genericRoutesPageChecker = (page: string) => createSelector(selectUrl, (url) => isSpecificPage(page, url));
