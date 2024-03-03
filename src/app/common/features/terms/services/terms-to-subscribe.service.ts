import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TermsToSubscribeService {
  private termsSub = new Subject();

  public get terms$(): Observable<any> {
    return this.termsSub;
  }

  public set terms$(terms: any) {
    this.termsSub.next(terms);
  }
}
