import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

import { environment } from '@environment';

import { PartyRoleTypeEnum } from '@shared/enums';
import { DOMService, GenericHttpService } from '@shared/services';
import { generateProfileDetailsPath } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class DocumentsApiService {
  constructor(
    private genericHttpService: GenericHttpService,
    private rootHttp: HttpClient,
    private domService: DOMService
  ) {}

  public addPartyDocument(documentChangeRequest: any, partyRoleType: PartyRoleTypeEnum) {
    return this.genericHttpService
      .post(`service/${generateProfileDetailsPath(partyRoleType)}/addPartyDocument `, {
        documentChangeRequest,
      })
      .pipe(map(({ document }) => document));
  }

  public updatePartyDocumentData(documentChangeRequest: any, partyRoleType: PartyRoleTypeEnum) {
    return this.genericHttpService
      .post(`service/${generateProfileDetailsPath(partyRoleType)}/updatePartyDocument`, { documentChangeRequest })
      .pipe(map(({ document }) => document));
  }

  public deletePartyDocument(parentId: string, partyDocumentId: string, partyRoleType: PartyRoleTypeEnum) {
    return this.genericHttpService.get(`service/${generateProfileDetailsPath(partyRoleType)}/deletePartyDocument`, {
      parentId,
      partyDocumentId,
    });
  }

  public uploadDocument(data: any) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]: any) => formData.append(key, value));

    return this.rootHttp.post(`${environment.apiUrl}upload?$service=system.import.createResourceUrl`, formData).pipe(
      map(({ resourceUrl }: any) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
        const { __metadata, ...resourceData } = resourceUrl;
        return resourceData;
      })
    );
  }

  public createUpdatePartyDocumentFile(
    documentCreateEditData: any,
    parentId: string,
    isUpdate: boolean,
    partyRoleType: PartyRoleTypeEnum
  ) {
    return this.uploadDocument({
      contextCategory: 'CUSTOMER',
      contextId: parentId,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'x-csrf-token': this.domService.getCookie('x-csrf-token'),
      ...documentCreateEditData,
    }).pipe(
      switchMap((documentData) => {
        const documentChangeRequest = {
          parentId: parentId,
          document: {
            ...documentCreateEditData,
            ...documentData,
          },
        };

        return isUpdate
          ? this.updatePartyDocumentData(documentChangeRequest, partyRoleType)
          : this.addPartyDocument(documentChangeRequest, partyRoleType);
      })
    );
  }

  public updateProfileDetailsFile(data: any, parentId: string) {
    return this.uploadDocument({
      contextCategory: 'CONTACT',
      contextId: parentId,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'x-csrf-token': this.domService.getCookie('x-csrf-token'),
      store: true,
      ...data,
    });
  }
}
