import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarStateService {
  private triggerListener: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  public toggle(): void {
    this.triggerListener.next(!this.triggerListener.value);
  }

  public trigger(state: boolean): void {
    this.triggerListener.next(state);
  }

  public getTriggerListener(): Observable<boolean> {
    return this.triggerListener.asObservable();
  }
}
