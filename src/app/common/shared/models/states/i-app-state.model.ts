import { RouterReducerState } from '@ngrx/router-store';
import { IRouterStateUrlModel } from './i-router-state-url.model';


export interface IAppState {
  router: RouterReducerState<IRouterStateUrlModel>;
}
