import { inject } from '@angular/core';
import { UserInfo } from './login.component';
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { LoginService } from './login.service';
import { delay } from 'rxjs';


type LoginState = {
    loading: boolean;
};
  
const initialState: LoginState = {
    loading: false
};

// root has to be mentioned in case this is a central store
 export const LogInStore = signalStore({ providedIn: 'root' },
    withState(initialState),
    withMethods(
        (store, logInService = inject(LoginService)) => ({
          async logIntoServer(userInfo: UserInfo) {
            patchState(store, {loading: true});
            // const logedIn = await logInService.loginIntoServer(userInfo);
            const logedIn = await logInService.logIn(userInfo, 5000);
            console.log('ewesdf')

              patchState(store, {loading: false});
          }
        })
        
 ))
