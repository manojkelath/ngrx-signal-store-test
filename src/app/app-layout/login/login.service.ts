import { Injectable } from "@angular/core";
import { Observable, delay, of } from "rxjs";
import { UserInfo } from "./login.component";
import { GenericHttpService } from "../../services/generic-http.service";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn : 'root'})
export class LoginService {
    constructor(private genericHttpService: GenericHttpService) {}


    logIn = (userInfo: UserInfo, ms: number) => {
        // return new Promise(
        //     resolve => setTimeout(resolve, ms));
        return this.genericHttpService.post(`service/idm/authentication/login`, { userLogin: userInfo }).toPromise();

            
    }
        
}