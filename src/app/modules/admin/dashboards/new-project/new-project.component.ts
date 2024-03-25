import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';

export interface Owner {
    name: string;
    value: string;
    email: string
}

export interface Sponsor {
    name: string;
    value: string;
    email: string
}

@Component({
    selector: 'new-project',
    templateUrl: './new-project.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatIconModule, FormsModule, NgFor, ReactiveFormsModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatCheckboxModule, MatRadioModule],
})
export class NewProjectComponent implements OnInit {
    horizontalStepperForm: UntypedFormGroup;
    owners: Owner[];
    sponsors: Sponsor[];

    /**
     * Constructor
     */
    constructor(private _formBuilder: UntypedFormBuilder, private activatedRoute: ActivatedRoute) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({ data, owners, sponsors }) => {
            this.owners = owners;
            this.sponsors = sponsors;
        });
        // Horizontal stepper form
        this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                b2bCatalog: [''],
                sponsorName: ['', Validators.required],
                ownerName: ['', Validators.required],
                sponsorEmail: ['', [Validators.required, Validators.email]],
                ownerEmail: ['', [Validators.required, Validators.email]],
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
                productCategory: ['', Validators.required],
                productPortfolio: ['', Validators.required],
                targetMarketSegment: ['', Validators.required],
                productOverview: ['', Validators.required],
                productFeatures: [''],
                targetEntity: ['', Validators.required],
                subsidiary: [''],
                byEmail: this._formBuilder.group({
                    companyNews: [true],
                    featuredProducts: [false],
                    messages: [true],
                }),
                pushNotifications: ['everything', Validators.required],
            }),
        });
    }

    updateSponsorEmail() {

        const selectedSponsor = this.horizontalStepperForm.get('step1.sponsorName').value;
        const sponsor = this.sponsors.find(option => option.value === selectedSponsor);
        if (sponsor) {
            // Set sponsoremail value based on selected sponsor
            this.horizontalStepperForm.get('step1.sponsorEmail').setValue(sponsor.email);
        } else {
            // Reset sponsoremail if selected sponsor is not found
            this.horizontalStepperForm.get('sponsorEmail').setValue('');
        }

    }

    updateOwnerEmail() {
        const selectedOwner = this.horizontalStepperForm.get('step1.ownerName').value;
        const owner = this.sponsors.find(option => option.value === selectedOwner);
        if (owner) {
            // Set sponsoremail value based on selected owner
            this.horizontalStepperForm.get('step1.ownerEmail').setValue(owner.email);
        } else {
            // Reset sponsoremail if selected owner is not found
            this.horizontalStepperForm.get('ownerEmail').setValue('');
        }
    }
}
