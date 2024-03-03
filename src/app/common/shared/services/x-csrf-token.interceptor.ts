import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DOMService } from './dom.service';

@Injectable()
export class XCsrfTokenInterceptor implements HttpInterceptor {
  constructor(private domService: DOMService) {}

  public intercept(originalRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const xCsrfToken = this.domService.getCookie('x-csrf-token');

    let request = originalRequest;
    if (xCsrfToken) {
      const headers = originalRequest.headers.set('x-csrf-token', xCsrfToken);
      request = originalRequest.clone({ headers });
    }

    return next.handle(request);
  }
}
