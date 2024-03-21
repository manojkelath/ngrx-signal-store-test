import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';


@Component({
    selector       : 'project-overview',
    templateUrl    : './project-overview.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [MatButtonModule,RouterModule],
})
export class ProjectOverviewComponent implements OnInit
{


    /**
     * Constructor
     */
    constructor(private _router: Router)
    {
        
    }
    createNewProject() {
        this._router.navigate(['/dashboard/new-project']); // specify the route you want to navigate to
  }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
  
    }

  
   
}
