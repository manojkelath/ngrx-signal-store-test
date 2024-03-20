import { DecimalPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';



@Component({
    selector       : 'analytics',
    templateUrl    : './analytics.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [MatIconModule, FormsModule, ReactiveFormsModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatCheckboxModule, MatRadioModule],
})
export class AnalyticsComponent implements OnInit
{
    horizontalStepperForm: UntypedFormGroup;

    /**
     * Constructor
     */
    constructor(private _formBuilder: UntypedFormBuilder)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Horizontal stepper form
        this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                sponsorName: ['', Validators.required],
                ownerName: ['', Validators.required],
                sponsorEmail: ['', [Validators.required, Validators.email]],
                ownerEmail : ['', [Validators.required, Validators.email]],
            }),
            step2: this._formBuilder.group({
                name: ['', Validators.required],
                tags: ['', Validators.required],
                subType: ['', Validators.required],
                location: ['', Validators.required],
                description: [''],
            }),
            step3: this._formBuilder.group({
                productName: ['', Validators.required],
                productCategory : ['', Validators.required],
                productPortfolio: ['', Validators.required],
                targetMarketSegment:['', Validators.required],
                productOverview: ['', Validators.required],
                productFeatures: [''],
                targetEntity: ['', Validators.required],
                subsidiary: [''],
                byEmail          : this._formBuilder.group({
                    companyNews     : [true],
                    featuredProducts: [false],
                    messages        : [true],
                }),
                pushNotifications: ['everything', Validators.required],
            }),
        });
   
    }
}
