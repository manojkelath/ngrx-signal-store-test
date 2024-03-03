import { Data, Params } from '@angular/router';

export interface IRouterStateUrlModel {
  url: string;
  params: Params;
  queryParams: Params;
  data: Data;
}
