import { Injectable } from '@angular/core';

import { RouteQueryParamsEnum } from '@shared/enums';
import { LocalStorageService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class ACPCodeService {
  constructor(private localStorageService: LocalStorageService) {}

  public setACPCode(acpCode: string): void {
    this.localStorageService.setItem(RouteQueryParamsEnum.ACP_CODE, acpCode);
  }

  public getACPCode(): string {
    return this.localStorageService.getItem(RouteQueryParamsEnum.ACP_CODE);
  }

  public clearACPCode(): void {
    this.localStorageService.removeItem(RouteQueryParamsEnum.ACP_CODE);
  }

  public setZealsCode(zealsCode: string): void {
    this.localStorageService.setItem(RouteQueryParamsEnum.ZEALS_CODE, zealsCode);
  }

  public getZealsCode(): string {
    return this.localStorageService.getItem(RouteQueryParamsEnum.ZEALS_CODE);
  }

  public clearZealsCode(): void {
    this.localStorageService.removeItem(RouteQueryParamsEnum.ZEALS_CODE);
  }
}
