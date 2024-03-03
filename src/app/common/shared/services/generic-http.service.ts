import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environment';

import { HttpQuerySerializer } from '@shared/serializers';

@Injectable({
  providedIn: 'root',
})
export class GenericHttpService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public get = <T>(relativeUrl: string, queryParams: {} = {}, params: {} = {}): Observable<T> => {
    // some characters are incorrectly encoded so using custom serializer
    // https://github.com/angular/angular/issues/11058
    const queryParamsObj = new HttpParams({ encoder: new HttpQuerySerializer(), fromObject: queryParams });
    return this.httpClient.get<T>(`${this.apiUrl}${relativeUrl}`, {
      params: queryParamsObj,
      withCredentials: true,
      ...params,
    });
  };

  public post = <T = any>(relativeUrl: string, payload: any, options?: Record<string, any>): Observable<T> =>
    this.httpClient.post<T>(`${this.apiUrl}${relativeUrl}`, payload, { withCredentials: true, ...options });

  public put = <T = any>(relativeUrl: string, payload: any): Observable<T> =>
    this.httpClient.put<T>(`${this.apiUrl}${relativeUrl}`, payload, { withCredentials: true });

  // HttpClient.delete() cannot handle a body in its request https://github.com/angular/angular/issues/19438
  public delete = <T = any>(relativeUrl: string, payload?: any): Observable<T> =>
    this.httpClient.request<T>('delete', `${this.apiUrl}${relativeUrl}`, {
      body: payload,
      withCredentials: true,
    });
}
