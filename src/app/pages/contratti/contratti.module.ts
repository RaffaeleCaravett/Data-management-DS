import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContrattiRoutingModule } from './contratti-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'material-module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { ContrattiComponent } from './contratti.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import {  MatDialogModule } from '@angular/material/dialog';
import { InsertContrattiModule } from './nuovo/insert-contratti/insert-contratti.module';
import { ContrattiService } from './contratti.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'app/shared/shared.module';






@NgModule({
  declarations: [
    ContrattiComponent,
  ],
  imports: [
    CommonModule,
    ContrattiRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    MatNativeDateModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    InsertContrattiModule,
    MatProgressSpinnerModule,
    SharedModule

  ],
  providers:[ContrattiService],

})
export class ContrattiModule { }
