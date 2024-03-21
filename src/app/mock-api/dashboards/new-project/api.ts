import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { analytics as analyticsData } from 'app/mock-api/dashboards/new-project/data';
import { cloneDeep } from 'lodash-es';

@Injectable({providedIn: 'root'})
export class NewProjectMockApi
{
    private _analytics: any = analyticsData;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Sales - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/dashboards/new-project')
            .reply(() => [200, cloneDeep(this._analytics)]);
    }
}
