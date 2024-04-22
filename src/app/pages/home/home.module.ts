import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { GraficiService } from './services/grafici.service';
import { DataTablePagerComponent } from './paginatore';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { MaterialModule } from 'material-module';

@NgModule({
  declarations: [
    HomeComponent,

  ],
  imports: [
    CommonModule, FormsModule,
    HomeRoutingModule,
    NgxEchartsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MaterialModule

  ],
  providers: [ GraficiService
  ]
})
export class HomeModule {
}
