import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewProjectService {
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get data$(): Observable<any> {
        return this._data.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data
     */
    getData(): Observable<any> {
        return this._httpClient.get('api/dashboards/new-project').pipe(
            tap((response: any) => {
                this._data.next(response);
            }),
        );
    }

    /**
 * Get data
 */
    getOwners(): Observable<any> {
        return this._httpClient.get('api/dashboards/owners').pipe(
            tap((response: any) => {
                this._data.next(response);
            }),
        );
    }

    getSponsors(): Observable<any> {
        return this._httpClient.get('api/dashboards/sponsors').pipe(
            tap((response: any) => {
                this._data.next(response);
            }),
        );
    }
}
