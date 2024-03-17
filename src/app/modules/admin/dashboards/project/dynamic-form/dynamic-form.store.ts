
/**
 * This store provides states for the form overall
 * Loading: boolean
 * 
 */

export type DynamicFormState = {
    isValid: boolean;
    isLoading: boolean;
}

let formInitState: DynamicFormState = {
    isValid : false,
    isLoading: false
}

import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { DynamicFormService } from "./dynamic-form.service";
import { Injector, inject } from "@angular/core";

 export const DynamicStore = signalStore(
    withState(formInitState),
    withMethods((store, formService = inject(DynamicFormService), injector = inject(Injector)) => ({
        loading() {
            patchState(store, { isLoading: true});
        },
        loaded(){
            patchState(store, { isLoading: false}); 
        },
        validateForm(formObj: any){
            formService.validateForm(formObj).subscribe();
        },
        // loadByFilter: rxMethod<DynamicFormState>(
        //     pipe(
        //       debounceTime(300),
        //       tap(() => (patchState(store, { isLoading: true}))),
        //       switchMap((filter) =>
        //         runInInjectionContext(injector, () => geyByFilter(filter))
        //       ),
        //       tap(()=> (patchState(store, { isLoading: false}))
        //     )
        //   ),

    })
 ));
