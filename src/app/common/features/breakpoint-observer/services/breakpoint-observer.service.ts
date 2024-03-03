import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DeviceBreakpointNameEnum } from '@features/breakpoint-observer/enums';

@Injectable({
  providedIn: 'root',
})
export class BreakpointObserverService {
  public currentScreenSize: string;

  private displayNameMap = new Map([
    ['(max-width: 767px)', DeviceBreakpointNameEnum.MOBILE],
    ['(min-width: 768px) and (max-width: 1439px)', DeviceBreakpointNameEnum.TABLET],
    ['(min-width: 1440px)', DeviceBreakpointNameEnum.DESKTOP],
  ]);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.getCurrentDeviceBreakpointName$().subscribe((result) => {
      this.currentScreenSize = result;
    });
  }

  public getCurrentDeviceBreakpointName$(): Observable<DeviceBreakpointNameEnum> {
    return this.breakpointObserver.observe([...this.displayNameMap.keys()]).pipe(
      map((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            return this.displayNameMap.get(query);
          }
        }

        return undefined;
      })
    );
  }

  public isMobile$(): Observable<boolean> {
    return this.getCurrentDeviceBreakpointName$().pipe(
      map((breakpoint) => breakpoint === DeviceBreakpointNameEnum.MOBILE)
    );
  }
}
