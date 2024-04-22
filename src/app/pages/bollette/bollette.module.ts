import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from '../home/home-routing.module';
import { HomeComponent } from '../home/home.component';
import { BolletteComponent } from './bollette.component';
import { BolletteRoutingModule } from './bollette-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { VisualizzaBolletteComponent } from './components/visualizza-bollette/visualizza-bollette.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedModule } from 'app/shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule, NbDatepickerModule } from '@nebular/theme';
import { CustomRendererComponent } from './data-custom-component/data-custom-component.component';
import { CustomDaPagareComponent } from './da-pagare/da-pagare.component';
import { CustomFilterComponent } from './custom-filter/custom-filter.component';
import { CustomFilter1Component } from './custom-filter1/custom-filter1.component';



@NgModule({
  declarations: [BolletteComponent, VisualizzaBolletteComponent, CustomRendererComponent,CustomDaPagareComponent, CustomFilterComponent, CustomFilter1Component
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatTableModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    SharedModule,
    BolletteRoutingModule,
    NgxEchartsModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbDatepickerModule
    
    
  ],
  providers: [ ]
})

export class BolletteModule { }
