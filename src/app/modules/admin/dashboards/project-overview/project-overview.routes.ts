import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ProjectOverviewComponent } from './project-overview.component';
import { ProjectOverviewService } from './project-overview.service';

export default [
    {
        path     : '',
        component: ProjectOverviewComponent,
        resolve  : {
            data: () => inject(ProjectOverviewService).getData(),
        },
    },
] as Routes;
