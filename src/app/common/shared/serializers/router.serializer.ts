import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { IRouterStateUrlModel } from '../models';


export class RouterSerializer implements RouterStateSerializer<IRouterStateUrlModel> {
  public serialize(routerState: RouterStateSnapshot): IRouterStateUrlModel {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params, data } = route;

    // Only return an object including the data, URL, params and query params
    // instead of the entire snapshot
    return { data, url, params, queryParams };
  }
}
