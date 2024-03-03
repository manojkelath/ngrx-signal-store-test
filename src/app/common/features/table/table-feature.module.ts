import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppGaEventDirective } from '@features/app-google-analytics/directives';
import { CustomSelectModule } from '@features/custom-select';
import { FormControlModule } from '@features/forms/form-control';
import { InputModule } from '@features/forms/input';
import { ToggleControlComponent } from '@features/forms/toggle-control';
import { OverlayFeatureModule } from '@features/overlay';
import { SearchComponent } from '@features/search/search.component';
import { SpinnerModule } from '@features/spinner';
import { ClipboardComponent } from '@shared/components/clipboard';
import { IconComponent } from '@shared/components/icon';
import { LabelTextComponent } from '@shared/components/label-text';
import { RadialProgressBarComponent } from '@shared/components/radial-progress-bar';
import { PricePipeModule } from '@shared/pipes';

import {
  ActionsDropdownCellComponent,
  CardListComponent,
  FieldTemplateComponent,
  PaginationComponent,
  PaginationContainerComponent,
  TableComponent,
  TableContainerComponent,
  TableSearchContainerComponent,
  ToggleCellComponent,
} from './components';
import { CardRowComponent } from './components/card-row/card-row.component';
import { PaginationEffects, TableEffects, TableSearchEffects } from './state/effects';
import { tableFeatureReducers } from './state/reducers';
import { tableFeatureName } from './state/selectors';

@NgModule({
  declarations: [
    TableContainerComponent,
    TableComponent,
    CardListComponent,
    ToggleCellComponent,
    FieldTemplateComponent,
    PaginationComponent,
    PaginationContainerComponent,
    TableSearchContainerComponent,
    ActionsDropdownCellComponent,
    CardRowComponent,
  ],
  imports: [
    CommonModule,
    CustomSelectModule,
    CdkTableModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature(tableFeatureName, tableFeatureReducers),
    EffectsModule.forFeature([TableEffects, PaginationEffects, TableSearchEffects]),
    SpinnerModule,
    IconComponent,
    RadialProgressBarComponent,
    ToggleControlComponent,
    SearchComponent,
    PricePipeModule,
    TranslocoModule,
    OverlayFeatureModule,
    FormControlModule,
    InputModule,
    LabelTextComponent,
    AppGaEventDirective,
    ClipboardComponent,
  ],
  exports: [
    TableContainerComponent,
    PaginationContainerComponent,
    TableSearchContainerComponent,
    FieldTemplateComponent,
  ],
})
export class TableFeatureModule {}
