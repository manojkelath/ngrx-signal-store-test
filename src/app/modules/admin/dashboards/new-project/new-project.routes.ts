import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { NewProjectComponent } from './new-project.component';
import { NewProjectService } from './new-project.service';

export default [
    {
        path     : '',
        component: NewProjectComponent,
        resolve  : {
            data: () => inject(NewProjectService).getData(),
        },
    },
] as Routes;