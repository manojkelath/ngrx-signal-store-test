import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { NewProjectService } from '../new-project/new-project.service';


@Component({
    selector: 'project',
    templateUrl: './project.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatButtonModule, RouterModule, NgIf, ProjectListComponent],
})
export class ProjectComponent implements OnInit {

    formData: any;
    /**
     * Constructor
     */
    constructor(private _router: Router, private _newProjectService: NewProjectService) {

    }
    createNewProject() {
        this._router.navigate(['new-project']); // specify the route you want to navigate to
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.formData = this._newProjectService.getFormData();

    }



}
