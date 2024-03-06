
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
import { pipe, debounceTime, distinctUntilChanged, tap, switchMap } from "rxjs";
import { tapResponse } from '@ngrx/operators';

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
        loadByQuery: rxMethod<string>(
            pipe(
              debounceTime(300),
              distinctUntilChanged(),
              tap(() => patchState(store, { isLoading: true })),
              switchMap((query) =>
              formService.validateForm({}).pipe(
                  tapResponse({
                    next: () => patchState(store, { isLoading: false }),
                    error: console.error,
                    finalize: () => patchState(store, { isLoading: false }),
                  }),
                ),
              ),
            ),
          ),

    })
 ));
function rxMethod<T>(arg0: any): any {
    throw new Error("Function not implemented.");
}

