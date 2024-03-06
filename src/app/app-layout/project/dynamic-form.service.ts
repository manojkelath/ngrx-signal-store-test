import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({providedIn : 'root'})
export class DynamicFormService {

    constructor(private httpClient: HttpClient){

    }

    // TODO: model it later
    validateForm(formObj : any): Observable<any>{
        return this.httpClient.get('assets/form-configs/form-config-en.json');
    }

}